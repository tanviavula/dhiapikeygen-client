import { AppService } from './../../shared/service/app.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-keyregistrationform',
  templateUrl: './keyregistrationform.component.html',
  styleUrls: ['./keyregistrationform.component.css']
})
export class KeyregistrationformComponent implements OnInit {

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

  ngOnInit(): void {

    this.newApiRegForm.reset();

    this.appService.serviceNames().subscribe(services => {
      this.serviceNames = services;
    });
  }

  addNewApi() {
    this.appService.createNewApiKey(this.newApiRegForm.value).subscribe(res => {
      if (res) {
        this.newApiRegForm.reset();
        this.accessToken = res.apiKey;
      } else {
        console.log('Error : ', res);
      }
    },
      err => {
        this.accessToken = 'With this details already api is existing';
      }
    );
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
