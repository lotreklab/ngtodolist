import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaComponent } from './lista/lista.component';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AttivitaDettagliComponent } from './attivita-dettagli/attivita-dettagli.component';
import { DragDropModule } from '@angular/cdk/drag-drop'
@NgModule({
  declarations: [
    AppComponent,
    ListaComponent,
    AttivitaDettagliComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
