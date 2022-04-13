import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggendIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(private http: HttpClient) { 
    this.checkUser()
  }

  public get isLogged(): Observable<boolean> {
    return this.loggendIn.asObservable();
  }

  public login(user: any): Observable<any> {
    localStorage.setItem('USER LOG', JSON.stringify(user));
    this.loggendIn.next(true)
    return this.isLogged
  }

  public logout(){
    this.loggendIn.next(false);
    localStorage.setItem('USER LOG', '');
  }

  private checkUser(){
    if (!localStorage.getItem('USER LOG')) {
      this.loggendIn.next(false)
    }else{
      this.loggendIn.next(true)
    }
  }
}
