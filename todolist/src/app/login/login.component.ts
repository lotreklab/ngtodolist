import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { ApiConnectionService } from '../api-connection.service';
import { Attivita } from '../Attivita';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  alert = new Subject<string>();

  loginForm;

  constructor(
    private formBuilder: FormBuilder,
    private apiConnection: ApiConnectionService,
    private router: Router
  ) { 
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  ngOnInit() {
  }

  login(loginData) {
    this.apiConnection.setLoginData(loginData.username, loginData.password);
    this.apiConnection.testLogin().subscribe( () => { 
      this.router.navigate(['attivita']);
    }, (error: any) => {
      this.alert.next("Username o password errati.")
    });
  }

}
