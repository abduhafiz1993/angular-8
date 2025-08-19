import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidate } from '../models/candidate.model';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  private apiUrl = 'api/candidates';
  constructor(private http: HttpClient) { }

  getCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(this.apiUrl);
  }

  getCandidateById(id: number): Observable<Candidate> {
    return this.http.get<Candidate>(`${this.apiUrl}/${id}`);
  }

  createCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http.post<Candidate>(this.apiUrl, candidate);
  }

  updateCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http.put<Candidate>(`${this.apiUrl}/${candidate.id}`, candidate);
  }

  deleteCandidate(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
