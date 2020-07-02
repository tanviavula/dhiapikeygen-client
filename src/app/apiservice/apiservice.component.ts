
import { AppService } from './../shared/service/app.service';
import { DhiApiKeyServiceDetailsDTO } from './../shared/model/DhiApiKeyServiceDetailsDTO';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-apiservice',
  templateUrl: './apiservice.component.html',
  styleUrls: ['./apiservice.component.css']
})
export class ApiserviceComponent implements OnInit, OnDestroy {

  @ViewChild('closebutton') closebutton;

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  apiServices: DhiApiKeyServiceDetailsDTO[] = [];

  apiForm: FormGroup;

  canUpdate = false;


  constructor(private formBuilder: FormBuilder, private appService: AppService) {
    this.apiForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAllApiKeyServices();
  }

  loadAllApiKeyServices() {
    this.dtTrigger = new Subject();
    this.appService.getAllApiKeyServices().subscribe(resp => {
      this.apiServices = resp;
      this.dtTrigger.next();
    });
  }

  regNewApiService() {
    if (this.canUpdate) {
      // update
    } else {
      this.appService.addServiceDetails(this.apiForm.value).subscribe(resp => {
        if (resp) {
          this.loadAllApiKeyServices();
          this.closebutton.nativeElement.click();
        } else {
          alert('Failed to add');
        }
      });
    }
  }

  delete(id: string) {
    if (confirm(`Are you sure to delete this service?`)) {
      this.appService.deleteApiKeyServiceDetails(id).subscribe(resp => {

        console.log(resp);

        if (resp) {
          this.loadAllApiKeyServices();
        } else {
          alert('Failed to delete service');
        }
      }, error => {
        alert('Something went wrong while deleting service');
      });
    }
  }

  close() {
    this.canUpdate = false;
    this.apiForm.reset();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  get name() {
    return this.apiForm.get('name');
  }

  get description() {
    return this.apiForm.get('description');
  }

}
