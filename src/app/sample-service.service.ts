import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SampleServiceService {
  constructor(private http: HttpClient) {}

  getGlobalData(): Observable<any> {
    const url = 'https://api.covid19api.com/summary';
    return this.http.get<any>(url);
  }

  getCountries(): Observable<any> {
    const url = 'https://api.covid19api.com/countries';
    return this.http.get<any>(url);
  }

  getCountryData(country): Observable<any> {
    const url = 'https://api.covid19api.com/live/country/' + country;
    return this.http.get<any>(url);
  }

  getDailyData(country): Observable<any> {
    const url = 'https://api.covid19api.com/total/dayone/country/' + country;
    return this.http.get<any>(url);
  }
}
