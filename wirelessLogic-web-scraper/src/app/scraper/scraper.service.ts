//External Imports
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Internal Imports
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ScraperService {
  constructor(private http: HttpClient) {}

  //get product options
  getProductDetails(URL: any) {
    return this.http.post(`${environment.apiURL}/scrape`, URL);
  }
}
