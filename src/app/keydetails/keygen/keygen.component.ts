import { AppService } from './../../shared/service/app.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-keygen',
  templateUrl: './keygen.component.html',
  styleUrls: ['./keygen.component.css']
})
export class KeygenComponent implements OnInit {
  constructor(private appService: AppService, private formBuilder: FormBuilder) {

    this.newApiRegForm = this.formBuilder.group({
      tenantId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      serviceId: ['', Validators.required]
    });

  }

  newApiRegForm: FormGroup;

  accessToken: string;

  serviceNames: string[] = [];

  duplicate: boolean;
  message = "Copy API key"

  ngOnInit(): void {

    this.newApiRegForm.reset();
    this.appService.serviceNames().subscribe(services => {
      this.serviceNames = services;
    });
  }

  addNewApi() {
    this.message = "Copy API key"
    this.resetForm();
    this.appService.createNewApiKey(this.newApiRegForm.value).subscribe(res => {
      if (res) {
        this.accessToken = res.apiKey;
        this.newApiRegForm.reset();
      } else {
        console.log('Error : ', res);
      }
    },
      err => {
        this.duplicate = true;
      }
    );
  }


  copy() {
    this.message = "Copied...";
    navigator.clipboard.writeText(this.accessToken);
  }

  resetForm() {
    this.duplicate = false;
    this.accessToken = null;
  }

  reset() {
    this.newApiRegForm.reset();

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
