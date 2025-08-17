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

   genId<T extends { id: number }>(collection: T[]): number {
    return collection?.length ? Math.max(...collection.map(i => i.id)) + 1 : 1;
  }

  constructor() { }
}
