import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee.model';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/department.service';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';
import { Salary } from 'src/app/models/salary.model';
import { SalaryService } from 'src/app/services/salary.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employeesList: Employee[] = [];
  employees = [];
  departments: Department[] = [];
  companies: Company[] = [];
  salaries: Salary[] = [];
  newEmployeeFirstName = '';
  newEmployeeLastName = '';
  newEmployeeEmail = '';
  newEmployeeDepartmentId: number | null = null;
  newEmployeeSalaryId: number | null = null;

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private companyService: CompanyService,
    private salaryService: SalaryService
  ) { }

  ngOnInit() {
    this.loadDepartments();
    this.loadCompanies();
    this.loadSalaries();
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        this.employeesList = data;
        this.employees = this.employeesList.map(employee => {
          const department = this.departments.find(d => d.id === employee.departmentId);
          const companies = this.companies.find(c => c.id === department.companyId);
          const salaries = this.salaries.find(s => s.id === employee.salaryId);
          return {
            id: employee.id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            department: department ? department.name : 'Unknown Department',
            company: companies ? companies.name : 'Unknown Company',
            salary: salaries ? salaries.amount : 0
          };
        });
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  loadDepartments() {
    this.departmentService.getDepartments().subscribe(
      (data) => {
        this.departments = data;
      },
      (error) => {
        console.error('Error fetching departments:', error);
      }
    );
  }

  loadCompanies() {
    this.companyService.getCompanies().subscribe(
      (data) => {
        this.companies = data;
      },
      (error) => {
        console.error('Error fetching companies:', error);
      }
    );
  }

  loadSalaries() {
    this.salaryService.getSalaries().subscribe(
      (data) => {
        this.salaries = data;
      },
      (error) => {
        console.error('Error fetching salaries:', error);
      }
    );
  }

  add(){
    if(!this.newEmployeeFirstName.trim() || !this.newEmployeeLastName.trim() || !this.newEmployeeEmail.trim() || !this.newEmployeeDepartmentId || !this.newEmployeeSalaryId) {
      return;
    }

    const newEmployee: Employee = {
      id: 0,
      firstName: this.newEmployeeFirstName,
      lastName: this.newEmployeeLastName,
      email: this.newEmployeeEmail,
      departmentId: this.newEmployeeDepartmentId,
      salaryId: this.newEmployeeSalaryId
    };

    this.employeeService.createEmployee(newEmployee).subscribe(
      () => {
        this.loadEmployees();
        this.newEmployeeFirstName = '';
        this.newEmployeeLastName = '';
        this.newEmployeeEmail = '';
        this.newEmployeeDepartmentId = null;
        this.newEmployeeSalaryId = null;
      },
      (error) => {
        console.error('Error adding employee:', error);
      }
    );
  }

  delete(id: number){
    this.employeeService.deleteEmployee(id).subscribe(
      ()=>{
        this.employees = this.employees.filter(employee => employee.id !== id);
      });

  }

  getCompanyName(companyIds: number): string {
  const company = this.companies.find(c => c.id === companyIds);
  return company ? company.name : 'Unknown Company';
}
}
