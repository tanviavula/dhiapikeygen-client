import { AuthService } from './../auth/auth.service';

import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string='';
  constructor(private authService: AuthService, private router: Router) {
      this.username = authService.loggedInUsername();
   }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(['/logout']);
  }

}
