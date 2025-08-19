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

  employees: Employee[] = [];
  departments: Department[] = [];
  companies: Company[] = [];
  salaries: Salary[] = [];


  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private companyService: CompanyService,
    private salaryService: SalaryService
  ) { }

  ngOnInit() {
    this.loadEmployees();
    this.loadDepartments();
    this.loadCompanies();
    this.loadSalaries();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        this.employees = data;
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

}
