import { environment } from './../../../environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  base_url = environment.base_url;
  constructor(private http:HttpClient) {}

  apiServiceDetails(){
     return this.http.get(`${this.base_url}allactivekeys`)
  }
}
