import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../constants/app.constants';
import { City } from '../models/interfaces/City';
import { Page } from '../models/interfaces/Page';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  constructor(private httpClient: HttpClient) {}

  getAll(page: number, size: number, searchQuery: any): Observable<Page> {
    let params = { page, size } as any;
    if (searchQuery) {
      params.name = searchQuery;
    }
    return this.httpClient.get<Page>(AppConstants.REST_CITIES, { params });
  }

  getById(id: number): Observable<City> {
    return this.httpClient.get<City>(`${AppConstants.REST_CITIES}/${id}`);
  }
  update(city: City): Observable<City> {
    return this.httpClient.put<City>(AppConstants.REST_CITIES, city);
  }
}
