import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private apiUrl = 'api/departments';

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl);
  }

  getDepartmentById(id: number): Observable<Department> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Department>(url);
  }

  addDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(this.apiUrl, department);
  }

  updateDepartment(department: Department): Observable<Department> {
    const url = `${this.apiUrl}/${department.id}`;
    return this.http.put<Department>(url, department);
  }

  deleteDepartment(id: number): Observable<{}> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
