import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Keydetails } from './../shared/model/keydetails';
import { Subject } from 'rxjs';
import { AppService } from './../shared/service/app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-keydetails',
  templateUrl: './keydetails.component.html',
  styleUrls: ['./keydetails.component.css']
})
export class KeydetailsComponent implements OnInit {

  constructor(private appService: AppService, private formBuilder: FormBuilder) {
    this.newApiRegForm = this.formBuilder.group({
      tenantId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      serviceId: ['', Validators.required]
    });
  }


  keydetails: Keydetails[];

  tenantIds: string[] = ['NCET', 'BMSIT', 'NCET_ENG_BLR'];

  serviceNames: string[] = [];

  newApiRegForm: FormGroup;

  apiKey: string;

  searchStr: string;



  ngOnInit(): void {
    this.loadApiServiceDetails();
    this.appService.serviceNames().subscribe(services => {
      this.serviceNames = services;
    });
  }

  loadApiServiceDetails() {
    this.appService.apiServiceDetails().subscribe(res => {
      this.keydetails = res;
    });
  }

  addNewApi() {
    this.appService.createNewApiKey(this.newApiRegForm.value).subscribe(res => {
      if (res) {
        this.newApiRegForm.reset();
        this.apiKey = res.apiKey;
      } else {
        console.log('Error : ', res);
      }
    },
      err => {
        this.apiKey = 'With this details already api is existing';
      }
    );
  }


  onChangeTenant(tenantId: string) {
    this.appService.apiServiceDetailsByTenantId(tenantId).subscribe(resp => {
      if (resp) {
        this.keydetails = resp;
      }
    });
  }


  deactivate(id: string) {
    const status = 'INACTIVE';
    if (confirm('Are you sure to deactivate?')) {
      this.appService.updateStatus(id, status).subscribe(resp => {
        if (resp) {
          this.loadApiServiceDetails();
        }
      });
    }
  }

  search() {
    if (this.searchStr.length > 2) {
      this.appService.search(this.searchStr).subscribe(resp => {
        this.keydetails = resp;
      });
    } else {
      this.loadApiServiceDetails();
    }
  }


  get tenantId() {
    return this.newApiRegForm.get('tenantId');
  }


  get email() {
    return this.newApiRegForm.get('email');
  }


  get serviceId() {
    return this.newApiRegForm.get('serviceId');
  }

}
