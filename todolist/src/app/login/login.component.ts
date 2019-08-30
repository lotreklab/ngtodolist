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
  registerBoolean = false;
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
    if (this.registerBoolean) {
      this.register(loginData);
      return;
    }
    this.apiConnection.testLogin(loginData.username, loginData.password).subscribe((token: any) => { 
      this.apiConnection.setToken(token.token);
      this.router.navigate(['attivita']);
    }, (error: Response) => {
      if (error.status == 403) {
        this.snackBar.open("Username o password errati.", null, {
          duration: 5000
        });
      }
    });
  }

  register(loginData) {
    this.apiConnection.addUtente(loginData.username, loginData.password).subscribe({
      complete: () => {
        this.apiConnection.testLogin(loginData.username, loginData.password).subscribe((token: any) => { 
          this.apiConnection.setToken(token.token);
          this.router.navigate(['attivita']);
        })
      }, 
      error: (error: any) => {
        this.snackBar.open("Esiste già un utente con lo stesso username", null, {
          duration: 5000
        });
      }
    });
  }

}
