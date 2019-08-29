import { Component, OnInit, HostBinding, ViewChild, ElementRef, Renderer2, NgZone, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Attivita } from '../Attivita';
import { trigger, state, style, animate, transition, group, query, stagger } from '@angular/animations';
import { getCurrencySymbol } from '@angular/common';
import { ApiConnectionService } from '../api-connection.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CdkDragMove, CdkDragRelease } from '@angular/cdk/drag-drop';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

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
  @ViewChild('coso', {static: false}) containerBounding:ElementRef;
  @ViewChild('at', {static: false}) at:ElementRef;

  arrayAttivita: Attivita[];
  verificaSpostamento = true;

  constructor(
    private apiConnection: ApiConnectionService,
    private router: Router,
    private zone: NgZone,
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

  aggiungiAttivita(){
    //this.arrayAttivita.push();
  }

  rimuoviAttivita(attivita : Attivita): void{
    this.apiConnection.removeAttivita(attivita).subscribe(() => {
      this.arrayAttivita = this.arrayAttivita.filter((val, index) => {
        return (val != attivita);
      });
      this.changeDetection.detectChanges();
    }, (error: any) => {
      console.log('ERRORE nella CANCELLAZIONE')
    });
  }

  completaAttivita(attivita : Attivita): void{
    var indiceArray;
    indiceArray = this.arrayAttivita.indexOf(attivita);
    this.arrayAttivita.splice(indiceArray, 1);
  }

  movimentoAttivita(event) {
    var limiteX = this.containerBounding.nativeElement.getBoundingClientRect().left;
    var attivitaX = this.at.nativeElement.getBoundingClientRect().left;
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
