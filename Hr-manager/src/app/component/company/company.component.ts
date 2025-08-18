import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  companies: Company[]= [];
  newCompanyName = '';
  newCompanyLocation = '';
  editCompany: Company | null = null;

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.loadCompanies();
  }
loadCompanies(){
  this.companyService.getCompanies().subscribe(data => (this.companies = data));

}
  add() {
    if (!this.newCompanyName.trim() || !this.newCompanyLocation.trim()) return;
    const newCompany: Company = {
      id: 0, // In-memory-data-service will assign the id
      name: this.newCompanyName,
      location: this.newCompanyLocation
    };
    this.companyService.addCompany(newCompany)
      .subscribe(company => {
        this.companies.push(company);
        this.newCompanyName = '';
        this.newCompanyLocation = '';
      });
  }

  startEdit(company: Company) {
  this.editCompany =  company ;
}

update() {
  if (!this.editCompany) return;
  this.companyService.updateCompany(this.editCompany)
    .subscribe(updatedCompany => {
      // Update the properties directly
      this.editCompany!.name = updatedCompany.name;
      this.editCompany!.location = updatedCompany.location;
      this.editCompany = null;
    });
}

cancelEdit() {
  this.editCompany = null;
}

    delete(id: number) {
    this.companyService.deleteCompany(id).subscribe(() => {
      this.companies = this.companies.filter(h => h.id !== id);
    });
  }
}
