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

  departments: Department[] = [];
  companies: Company[] = [];
  newDepartmentName = '';
  newDepartmentCompanyId: number | null = null;
  editDepartment: Department | null = null;


  constructor(private departmentService: DepartmentService, 
    private companyService: CompanyService) { }

  ngOnInit() {
    this.loadDepartments();
    this.loadCompanies();
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
  add(departmentName: string, companyId: number | null) {
    if (!departmentName.trim() || !companyId) return;
    const newDepartment: Department = {
      id: 0, // In-memory-data-service will assign the id
      name: departmentName,
      companyId: companyId
    };
    this.departmentService.addDepartment(newDepartment)
      .subscribe(department => {
        this.departments.push(department);
      });
  }

  startEdit(department: Department) {
    this.editDepartment = {...department};
  }

  saveEdit() {
    if (this.editDepartment) {
      this.departmentService.updateDepartment(this.editDepartment)
        .subscribe(() => {
          this.loadDepartments();
          this.editDepartment = null;
        });
    }
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
