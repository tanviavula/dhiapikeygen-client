import { Keydetails } from './../shared/model/keydetails';
import { Subject } from 'rxjs';
import { AppService } from './../shared/service/app.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-keydetails',
  templateUrl: './keydetails.component.html',
  styleUrls: ['./keydetails.component.css']
})
export class KeydetailsComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {
    searching: false
  };

  dtTrigger = new Subject();

  constructor(private appService: AppService) { }

  keydetails: Keydetails[];

  tenantIds: string[] = [];

  serviceNames: string[] = [];

  accessToken: string;

  searchStr: string;


  ngOnInit(): void {

    this.loadApiServiceDetails();

    this.appService.serviceNames().subscribe(services => {
      this.serviceNames = services;
    });

    this.appService.allTenantIds().subscribe(resp => {
      this.tenantIds = resp;
    });

  }

  loadApiServiceDetails() {
    this.dtTrigger = new Subject();
    this.keydetails = [];
    this.appService.apiServiceDetails().subscribe(res => {
      this.keydetails = res;
      this.dtTrigger.next();
    });
  }


  onChangeTenant(tenantId: string) {
    if (tenantId) {
      this.appService.apiServiceDetailsByTenantId(tenantId).subscribe(resp => {
        if (resp) {
          this.keydetails = resp;
        }
      });
    } else {
      this.loadApiServiceDetails();
    }
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
    if (this.searchStr.length > 0) {
      this.keydetails = [];
      this.appService.search(this.searchStr).subscribe(resp => {
        this.keydetails = resp;
      });
    } else if (this.searchStr) {
      this.loadApiServiceDetails();
    }
  }


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
