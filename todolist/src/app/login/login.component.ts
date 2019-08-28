import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { ApiConnectionService } from '../api-connection.service';
import { Attivita } from '../Attivita';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  loginForm;

  constructor(
    private formBuilder: FormBuilder,
    private apiConnection: ApiConnectionService,
    private router: Router,
    private snackBar: MatSnackBar
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
    }, (error: Response) => {
      if (error.status == 403) {
        this.snackBar.open("Username o password errati.", null, {
          duration: 5000
        });
      }
    });
  }

}
