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
  

}
