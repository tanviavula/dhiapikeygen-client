import { AppService } from './../shared/service/app.service';
import { DhiApiKeyServiceDetailsDTO } from './../shared/model/DhiApiKeyServiceDetailsDTO';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-apiservice',
  templateUrl: './apiservice.component.html',
  styleUrls: ['./apiservice.component.css']
})
export class ApiserviceComponent implements OnInit {

  apiServices: DhiApiKeyServiceDetailsDTO[] = [];

  apiForm: FormGroup;

  canUpdate = false;

  constructor(private formBuilder: FormBuilder, private appService: AppService) {
    this.apiForm = this.formBuilder.group({
      name: [],
      description: []
    });
  }

  ngOnInit(): void {
    this.loadAllApiKeyServices();
  }

  loadAllApiKeyServices() {
    this.appService.getAllApiKeyServices().subscribe(resp => {
      this.apiServices = resp;
    });
  }

  regNewApiService() {
    if (this.canUpdate) {
      // update
    } else {
      this.appService.addServiceDetails(this.apiForm.value).subscribe(resp => {
        if (resp) {
          this.loadAllApiKeyServices();
        } else {
          alert('Failed to add');
        }
      });
    }
  }

  delete(id: string) {
    if (confirm(`Are you sure to delete this service?`)) {
      this.appService.deleteApiKeyServiceDetails(id).subscribe(resp => {
        if (resp) {
          this.loadAllApiKeyServices();
        }
      });
    }
  }

  close() {
    this.canUpdate = false;
    this.apiForm.reset();
  }

}
