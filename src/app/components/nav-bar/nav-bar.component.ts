import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  loged: boolean = false;

  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {
    let nav = document.querySelector('nav');
    window.onscroll = function () {
      if (document.documentElement.scrollTop > 20) {
        nav?.classList.add('sticky');
      } else {
        nav?.classList.remove('sticky');
      }
    };

    this.authService.isLogged.subscribe((res) => {
      this.loged = res;
    });
  }

  public logOut(): void {
    this.authService.logout();
    this.route.navigateByUrl('/login');
  }
}
