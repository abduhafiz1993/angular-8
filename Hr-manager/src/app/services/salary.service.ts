import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Salary } from '../models/salary.model'; // Assuming you have a Salary model defined

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  private apiUrl = 'api/salaries';

  constructor(private http: HttpClient) { }

  getSalaries(): Observable<Salary[]> {
    return this.http.get<Salary[]>(this.apiUrl);
  }

  getSalaryById(id: number): Observable<Salary> {
    return this.http.get<Salary>(`${this.apiUrl}/${id}`);
  }

  createSalary(salary: Salary): Observable<Salary> {
    return this.http.post<Salary>(this.apiUrl, salary);
  }

  updateSalary(salary: Salary): Observable<Salary> {
    return this.http.put<Salary>(`${this.apiUrl}/${salary.id}`, salary);
  }

  deleteSalary(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
