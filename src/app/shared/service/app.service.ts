import { DhiApiKeyBasicDTO } from './../model/dhi-api-key-basic-dto';
import { Keydetails } from './../model/keydetails';
import { environment } from './../../../environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  base_url = environment.base_url;
  constructor(private http: HttpClient) { }


  serviceNames() {
    return this.http.get<string[]>(`${this.base_url}servicenames`);
  }

  apiServiceDetails() {
    return this.http.get<Keydetails[]>(`${this.base_url}allactivekeys`);
  }

  createNewApiKey(dhiApiKeyBasicDTO: DhiApiKeyBasicDTO) {
    return this.http.post<Keydetails>(`${this.base_url}newapikey`, dhiApiKeyBasicDTO);
  }

  updateStatus(id: string, status: string) {
    return this.http.put<Keydetails>(`${this.base_url}update/${id}/${status}`, {});
  }

  search(str: string) {
    return this.http.get<Keydetails[]>(`${this.base_url}search/${str}`);
  }

  apiServiceDetailsByTenantId(tenantId: string) {
    return this.http.get<Keydetails[]>(`${this.base_url}tenantkeys/${tenantId}`);
  }

}
