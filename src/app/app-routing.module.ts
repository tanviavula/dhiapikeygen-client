import { KeyregistrationformComponent } from './keydetails/keyregistrationform/keyregistrationform.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';

import { ApiserviceComponent } from './apiservice/apiservice.component';
import { KeydetailsComponent } from './keydetails/keydetails.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';


const routes: Routes = [

  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],

    children: [
      {
        path: '',
        redirectTo: '/home/apikeylist',
        pathMatch: 'full'

      },
      {
        path: 'apikeylist',
        component: KeydetailsComponent,
      },
      {
        path: 'register',
        component: KeyregistrationformComponent
      },
      {
        path: 'services',
        component: ApiserviceComponent,
        canActivate: [AuthGuard]
      }
    ],

  },

  {
    path: 'logout',
    redirectTo: ''
  }, {
    path: '**',
    redirectTo: 'login'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
