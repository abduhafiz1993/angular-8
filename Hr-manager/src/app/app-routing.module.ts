import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './component/company/company.component';
import { DepartmentComponent } from './component/department/department.component';
import { CandidateComponent } from './component/candidate/candidate.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { EmployeeComponent } from './component/employee/employee.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'companies',
    component: CompanyComponent
  },
  {
    path: 'departments',
    component: DepartmentComponent
  },
  {
    path: 'employees',
    component: EmployeeComponent
  },
  {
    path: 'candidates',
    component: CandidateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
