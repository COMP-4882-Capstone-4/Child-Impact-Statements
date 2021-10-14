import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class HttpService {

  constructor(private http: HttpClient) { }

  getZipcode() {
    return this.http.get('https://data.memphistn.gov/resource/98jk-gvpk.json')
  }
}
