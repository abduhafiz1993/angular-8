import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/department.service';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  
  departments = [];
  companies: Company[] = [];
  departmentsList: Department[] = [];
  newDepartmentName = '';
  newDepartmentCompanyId: number | null = null;
  editDepartment: Department | null = null;


  constructor(private departmentService: DepartmentService, 
    private companyService: CompanyService) { }

  ngOnInit() {
    this.loadCompanies();
    this.loadDepartments();
  }

  loadDepartments() {
    this.departmentService.getDepartments().subscribe(
(departments) => {
      this.departmentsList = departments;
      // Populate departmentsList with department and company names
      this.departments = this.departmentsList.map(department => {
        const companies = this.companies.find(c => c.id === department.companyId);
        return {
          id: department.id,
          departmentName: department.name,
          companyName: companies ? companies.name : 'Unknown Company' // Fallback if no matching company
        };
      });
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
  


  add(){
    if(!this.newDepartmentName.trim() || !this.newDepartmentCompanyId) {
      return;
    }

    const newDepartment: Department = {
      id: 0,
      name: this.newDepartmentName,
      companyId: this.newDepartmentCompanyId
    };

    this.departmentService.addDepartment(newDepartment).subscribe(
      () => {
        this.loadDepartments();
        this.newDepartmentName = '';
        this.newDepartmentCompanyId = null;
      },
      (error) => {
        console.error('Error adding department:', error);
      }
    );
  }



  startEdit( department ) {
    this.editDepartment = department;
  }


  update(){
    if(!this.editDepartment) return;
    this.departmentService.updateDepartment(this.editDepartment).subscribe(
      updatedDepartment => {
        this.editDepartment.name = updatedDepartment.name;
        this.editDepartment.companyId = updatedDepartment.companyId;
  });
}

  cancelEdit() {
    this.editDepartment = null;
  }

  delete(id: number) {
    this.departmentService.deleteDepartment(id)
      .subscribe(() => {
        this.departments = this.departments.filter(department => department.id !== id);
      });
  }

}
