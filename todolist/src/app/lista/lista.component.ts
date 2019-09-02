import { Component, OnInit, HostBinding, ViewChild, ElementRef, Renderer2, NgZone, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Attivita } from '../Attivita';
import { trigger, state, style, animate, transition, group, query, stagger } from '@angular/animations';
import { getCurrencySymbol } from '@angular/common';
import { ApiConnectionService } from '../api-connection.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CdkDragMove, CdkDragRelease } from '@angular/cdk/drag-drop';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { MatSelectModule } from '@angular/material';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  /*
  animations: [
    trigger('sposta', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s ease')
      ]),
      transition(':leave', [
        group([
          animate('0.2s ease', style({ transform: 'translate(100%)' })),
          animate('0.5s 0.2s ease', style({ opacity: 0 }))
        ])
      ])
    ])
  ]
  */
  animations: [
    trigger('animazioniLista', [
      transition('* => *', [
        query(':leave', [
          group([
            animate('0.4s', style({ opacity: 0 }))
          ])
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('0.3s', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class ListaComponent implements OnInit {
  @ViewChild('draglimit', {static: false}) containerBounding:ElementRef;
  @ViewChild('lista', {static: false}) finestraHtml: ElementRef;
  @ViewChild('counter', {static: false}) counter: ElementRef;
  @Output() clickEdit = new EventEmitter<Attivita>();

  public visualizzazioneSelezionata = "N";
  public stringaCounter;
  arrayAttivita: Attivita[];
  counters: number[];
  verificaSpostamento = true;

  constructor(
    private apiConnection: ApiConnectionService,
    private router: Router,
    private changeDetection: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.apiConnection.getFilteredList('N').subscribe((attivita: Attivita[]) => {
      this.arrayAttivita = attivita;
    }, (error: any) => {
      this.router.navigate(['']);
    });

    this.stringaCounter = new FormControl();
    this.counters = [0,0,0];
    this.aggiornaCounters();
  }

  aggiungiAttivita(attivita: Attivita){
    this.arrayAttivita.unshift(attivita);
  }

  modificaAttivita(attivita: Attivita) {
    this.arrayAttivita.forEach((value, index) => {
      if (value.id == attivita.id) {
         this.arrayAttivita[index] = attivita;
      }
    })
  }

  rimuoviAttivita(attivita : Attivita): void{
    this.apiConnection.editStatusAttivita(attivita.id, attivita.titolo, attivita.descrizione, "R").subscribe(() => {
      this.arrayAttivita = this.arrayAttivita.filter((val, index) => {
        return (val != attivita);
      });
      this.changeDetection.detectChanges();
    }, (error: any) => {
      console.log('ERRORE nel completamento')
    });
    this.aggiornaCounters();
    this.controllaArray();
  }

  completaAttivita(attivita : Attivita): void{
    this.apiConnection.editStatusAttivita(attivita.id, attivita.titolo, attivita.descrizione, "C").subscribe(() => {
      this.arrayAttivita = this.arrayAttivita.filter((val, index) => {
        return (val != attivita);
      });
      this.changeDetection.detectChanges();
    }, (error: any) => {
      console.log('ERRORE nel completamento')
    });
    this.aggiornaCounters();
    this.controllaArray();
  }

  rilascioAttivita(event : CdkDragMove, attivita){
    var limiteSx = this.containerBounding.nativeElement.getBoundingClientRect().left;
    var limiteDx = this.containerBounding.nativeElement.getBoundingClientRect().right;
    var attivitaSx = event.source.getRootElement().getBoundingClientRect().left;
    var attivitaDx = event.source.getRootElement().getBoundingClientRect().right;
    if(attivitaSx - 10 <= limiteSx)  this.completaAttivita(attivita);
    else if(attivitaDx + 10 >= limiteDx) this.rimuoviAttivita(attivita);
    else {
      event.source.getRootElement().style.backgroundImage = 'linear-gradient(-90deg, white, white)';
      event.source._dragRef.reset();
    }
  }

  coloraSfondo(event : CdkDragMove){
    if(event.delta.x == 1)  event.source.getRootElement().style.backgroundImage = 'linear-gradient(-90deg, ' + ('rgb(255, ' + (255 - event.distance.x) + ', ' + (255 - event.distance.x) + ')').toString() + ', white, white, white)';
    else if(event.delta.x == -1) event.source.getRootElement().style.backgroundImage = 'linear-gradient(-90deg, white, white, white, ' + ('rgb(' + (255 + event.distance.x ) + ', 255, ' + (255 + event.distance.x) + ')').toString() + ')';
  }

  controllaArray(){
    if(this.arrayAttivita.length == 0)  console.log("Nessuna attività da mostrare.");
  }

  cambiaVisualizzazione(event){
    this.apiConnection.getFilteredList(event.value).subscribe((attivita: Attivita[]) =>{ 
      this.arrayAttivita = attivita;
    }, 
    (error: any) => {
      this.arrayAttivita = null;
    });
  }

  aggiornaCounters(){
    this.apiConnection.getCounters().subscribe((counters: any) => {
      this.counters[0] = counters["Non completate"];
      this.counters[1] = counters["Completate"];
      this.counters[2] = counters["Rimosse"];
      this.stringaCounter.value = ("Non completate: " + this.counters[0] + "\nCompletate: " + this.counters[1] + "\nRimosse: " + this.counters[2]);
    }, (error: any) => {
      this.router.navigate(['']);
    });
  }

  apriModificaAttivita(attivita: Attivita) {
    this.clickEdit.emit(attivita);
  }
}
