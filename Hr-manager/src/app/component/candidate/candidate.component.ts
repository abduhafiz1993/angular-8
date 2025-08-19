import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/services/candidate.service';
import { Candidate } from 'src/app/models/candidate.model';


@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {

  candidates: Candidate[] = [];
  newCandidateName = '';
  newCandidateAppliedPosition = '';
  newCandidateEmail = '';
  newStatus = '';
    foods = [
    {value: 'applied', viewValue: 'Applied'},
    {value: 'screening', viewValue: 'Screening'},
    {value: 'hired', viewValue: 'Hired'},
    {value: 'rejected', viewValue: 'Rejected'}
  ];
  editCandidate: Candidate | null = null;

  constructor(private candidateService: CandidateService) { }

  ngOnInit() {
    this.loadCandidates();
  }

  loadCandidates() {
    this.candidateService.getCandidates().subscribe(
      (data) => {
        this.candidates = data;
      },
      (error) => {
        console.error('Error fetching candidates:', error);
      }
    );
  }
  add() {
    if (!this.newCandidateName.trim() || !this.newCandidateAppliedPosition.trim() || !this.newCandidateEmail.trim() || !this.newStatus.trim() ) return;
    const newCandidate: Candidate = {
      id: 0, // In-memory-data-service will assign the id
      fullName: this.newCandidateName,
      email: this.newCandidateEmail,
      appliedPosition: this.newCandidateAppliedPosition,
      status: this.newStatus as 'applied' | 'screening' | 'hired' | 'rejected'
    };
    this.candidateService.createCandidate(newCandidate)
      .subscribe(candidate => {
        this.candidates.push(candidate);
        this.newCandidateName = '';
        this.newCandidateAppliedPosition = '';
        this.newCandidateEmail = '';
        this.newStatus = '';
      });
  }
  startEdit(candidate: Candidate) {
    // Logic to start editing a candidate
    this.editCandidate = candidate;
  }
  update() {
    if (!this.editCandidate) return;
    this.candidateService.updateCandidate(this.editCandidate)
      .subscribe(updatedCandidate => {
        // Update the properties directly
        this.editCandidate.fullName = updatedCandidate.fullName;
        this.editCandidate.email = updatedCandidate.email;
        this.editCandidate.appliedPosition = updatedCandidate.appliedPosition;
        this.editCandidate.status = updatedCandidate.status;
        this.editCandidate = null;
      });
  }

  cancelEdit() {
    this.editCandidate = null;
  }
  
  delete(id: number) {
    this.candidateService.deleteCandidate(id).subscribe(
      () => {
        this.candidates = this.candidates.filter(c => c.id !== id);
      },
      (error) => {
        console.error('Error deleting candidate:', error);
      }
    );
  }

}
