import { Component, OnInit, HostBinding, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Attivita } from '../Attivita';
import { trigger, state, style, animate, transition, group, query, stagger } from '@angular/animations';
import { getCurrencySymbol } from '@angular/common';
import { CdkDragMove, CdkDragRelease } from '@angular/cdk/drag-drop';

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
          animate('0.2s ease', style({ transform: 'translate(100%)' })),
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
  @ViewChild('coso', {static: false}) el:ElementRef;
  @ViewChild('at', {static: false}) at:ElementRef;
  arrayAttivita: Attivita[] = [
    { id: 0, titolo: 'Fare la spesa', descrizione: 'Fai la spesa entro domani'},
    { id: 1, titolo: 'Lavare i panni', descrizione: 'Lava i panni con ammorbidente'}
  ];
  verificaSpostamento = true;
  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }

  aggiungiAttivita(){
    this.arrayAttivita.push(new Attivita(2, 'hey', 'ey2w'));
  }
  rimuoviAttivita(attivita : Attivita): void{
    var indiceArray;
    indiceArray = this.arrayAttivita.indexOf(attivita);
    this.arrayAttivita.splice(indiceArray, 1);
  }
  movimentoAttivita(event : CdkDragRelease<string[]>) {
    var limiteX = this.el.nativeElement.getBoundingClientRect().left;
    var attivitaX = this.at.nativeElement.getBoundingClientRect().left;
    var prova = event.source.element;
    console.log(event);
    //console.log(limiteX - (attivitaX + event.distance.x));
  }
}
