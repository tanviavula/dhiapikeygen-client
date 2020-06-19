import { Subject } from 'rxjs';
import { AppService } from './../shared/service/app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-keydetails',
  templateUrl: './keydetails.component.html',
  styleUrls: ['./keydetails.component.css']
})
export class KeydetailsComponent implements OnInit {

  constructor(private appService:AppService) { }

  ngOnInit(): void {

      this.appService.apiServiceDetails().subscribe(res=>{
         console.log(res);
      })

  }

}
