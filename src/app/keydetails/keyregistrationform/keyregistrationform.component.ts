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

  duplicate: boolean;

  ngOnInit(): void {

    this.newApiRegForm.reset();

    this.appService.serviceNames().subscribe(services => {
      this.serviceNames = services;
    });
  }

  addNewApi() {
    this.resetForm();
    this.appService.createNewApiKey(this.newApiRegForm.value).subscribe(res => {
      if (res) {
        this.accessToken = res.apiKey;
      } else {
        console.log('Error : ', res);
      }
    },
      err => {
        this.duplicate = true;
      }
    );
  }


  copy(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    alert('Copied access token to clip board');
  }

  resetForm() {
    this.duplicate = false;
    this.accessToken = null;
  }

  reset() {
    this.newApiRegForm.reset();
    this.resetForm();
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
