import { Component, OnInit, HostBinding, ViewChild, ElementRef, Renderer2, NgZone, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Attivita } from '../Attivita';
import { trigger, state, style, animate, transition, group, query, stagger } from '@angular/animations';
import { getCurrencySymbol } from '@angular/common';
import { ApiConnectionService } from '../api-connection.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { CdkDragMove, CdkDragRelease } from '@angular/cdk/drag-drop';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  animations: [
    trigger('sposta', [
      transition('* => *', [
        query(':leave', [
          group([
            animate('0.5s 0.2s ease', style({ opacity: 0 }))
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
  @ViewChild('coso', {static: false}) containerBounding: ElementRef;

  @Output() clickEdit = new EventEmitter<Attivita>();

  arrayAttivita: Attivita[];

  constructor(
    private apiConnection: ApiConnectionService,
    private router: Router,
    private changeDetection: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.apiConnection.getList().subscribe((attivita: Attivita[]) => {
      this.arrayAttivita = attivita;
    }, 
    (error: any) => {
      this.router.navigate(['']);
    });
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
    this.apiConnection.removeAttivita(attivita).subscribe(() => {
      this.arrayAttivita = this.arrayAttivita.filter((val) => {
        return val != attivita;
      });
      this.changeDetection.detectChanges();
    }, (error: any) => {
      console.log('ERRORE nella CANCELLAZIONE')
    });
  }

  apriModificaAttivita(attivita: Attivita) {
    this.clickEdit.emit(attivita);
  }

  completaAttivita(attivita : Attivita): void{
    var indiceArray;
    indiceArray = this.arrayAttivita.indexOf(attivita);
    this.arrayAttivita.splice(indiceArray, 1);
  }


  rilascioAttivita(event, attivita){
    var limiteSx = this.containerBounding.nativeElement.getBoundingClientRect().left;
    var limiteDx = this.containerBounding.nativeElement.getBoundingClientRect().right;
    var attivitaSx = event.source.getRootElement().getBoundingClientRect().left;
    var attivitaDx = event.source.getRootElement().getBoundingClientRect().right;
    if(attivitaSx - 10 <= limiteSx)  this.completaAttivita(attivita);
    else if(attivitaDx + 10 >= limiteDx) this.rimuoviAttivita(attivita);
    else event.source._dragRef.reset();
  }

  coloraSfondo(event){
    
  }

}
