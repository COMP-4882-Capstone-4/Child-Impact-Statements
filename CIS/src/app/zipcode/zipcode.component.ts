import { Component, OnInit } from '@angular/core';
import {HttpService } from '../http.service';

@Component({
  selector: 'app-zipcode',
  templateUrl: './zipcode.component.html',
  styleUrls: ['./zipcode.component.scss']
})

export class ZipcodeComponent implements OnInit {

  zipcodes: Array<any> = [];

  constructor(private _http: HttpService) { }

  getZipcode() {
    this._http.getZipcode().subscribe(data => {
      this.zipcodes = data as Array<Object>},
      err => console.error(err),
      () => console.log(this.zipcodes)
    );
  } 

  ngOnInit() {
    this.getZipcode();
    
  } 
}






