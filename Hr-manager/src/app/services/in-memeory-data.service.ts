import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Company } from '../models/company.model';
import { Department } from '../models/department.model';
import { Salary } from '../models/salary.model';
import { Employee } from '../models/employee.model';
import { Candidate } from '../models/candidate.model';

@Injectable({
  providedIn: 'root'
})
export class InMemeoryDataService implements InMemoryDbService{

    createDb() {
    const companies: Company[] = [
      { id: 1, name: 'Belika Clothing', location: 'Addis Ababa' },
      { id: 2, name: 'Boom Mart', location: 'Adama' },
    ];

     const departments: Department[] = [
      { id: 1, name: 'Engineering', companyId: 1 },
      { id: 2, name: 'HR',           companyId: 1 },
      { id: 3, name: 'Sales',        companyId: 2 },
    ];

        const salaries: Salary[] = [
      { id: 1, amount: 25000, currency: 'ETB' },
      { id: 2, amount: 35000, currency: 'ETB' },
      { id: 3, amount: 45000, currency: 'ETB' },
    ];

        const employees: Employee[] = [
      { id: 1, firstName: 'Muna', lastName: 'Bekele', email: 'muna@belika.com', departmentId: 1, salaryId: 2 },
      { id: 2, firstName: 'Yosef', lastName: 'Abate', email: 'yosef@belika.com', departmentId: 2, salaryId: 1 },
      { id: 3, firstName: 'Samson', lastName: 'Hailu', email: 'samson@boom.com', departmentId: 3, salaryId: 3 },
    ];
     const candidates: Candidate[] = [
      { id: 1, fullName: 'Selam Fekadu', email: 'selam@mail.com', appliedDepartmentId: 1, status: 'applied' },
      { id: 2, fullName: 'Abdi Ali',     email: 'abdi@mail.com',  appliedDepartmentId: 3, status: 'screening' },
    ];

    return {companies, departments, salaries, employees, candidates};
  }

genId<T extends { id: number }>(collection: T[]): number {
  return collection && collection.length > 0
    ? Math.max(...collection.map(item => item.id)) + 1
    : 1;
}
  constructor() { }
}
