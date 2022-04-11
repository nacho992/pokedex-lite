import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  datos = this.fb.group({
    username: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { 
    
  }

  ngOnInit(): void {
    this.authService.isLogged.subscribe(res => {
      if (res) {
        this.router.navigateByUrl('home')
      }
    })
  }

  public signIn(){
    this.authService.login(this.datos.value).subscribe(
      res => {
        this.router.navigateByUrl('home')
      },
      error => {
        this.router.navigateByUrl('login')
      }
    )
  }

}
