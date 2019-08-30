import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaComponent } from './lista/lista.component';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatIconModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { HomeComponent } from './home/home.component';
import { AttivitaDetailsComponent } from './attivita-details/attivita-details.component';
import { SidenavService } from './sidenav.service';



@NgModule({
  declarations: [
    AppComponent,
    ListaComponent,
    LoginComponent,
    HomeComponent,
    AttivitaDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent, },
      { path: 'attivita', component: HomeComponent, children: [
        { path: '', component: ListaComponent, outlet: 'main'},
        { path: 'new', component: AttivitaDetailsComponent, outlet: 'details'},
        { path: 'edit/:attivitaId', component: AttivitaDetailsComponent, outlet: 'details'}
      ]},
    ],{ 
      enableTracing: true 
    }),
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DragDropModule,
    MatSnackBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSelectModule
  ],
  providers: [SidenavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
