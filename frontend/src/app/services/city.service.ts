import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../constants/app.constants';
import { Observable } from 'rxjs';
import { PageParam } from '../models/interfaces/PageParam';
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
}
