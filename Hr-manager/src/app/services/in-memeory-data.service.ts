import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class InMemeoryDataService implements InMemoryDbService{

    createDb() {
    const companies: Company[] = [
      { id: 1, name: 'Belika Clothing', location: 'Addis Ababa' },
      { id: 2, name: 'Boom Mart', location: 'Adama' },
    ];
    return {companies};
  }

genId(companies: Company[]): number {
    return companies.length > 0 ? Math.max(...companies.map(h => h.id)) + 1 : 1;
  }
  constructor() { }
}
