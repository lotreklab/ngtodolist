import { Component, OnInit, HostBinding } from '@angular/core';
import { Attivita } from '../Attivita';
import { trigger, state, style, animate, transition, group } from '@angular/animations';
import { getCurrencySymbol } from '@angular/common';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
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
})
export class ListaComponent implements OnInit {
  arrayAttivita: Attivita[] = [
    { id: 0, titolo: 'Fare la spesa', descrizione: 'Fai la spesa entro domani'},
    { id: 1, titolo: 'Lavare i panni', descrizione: 'Lava i panni con ammorbidente'}
  ];
  verificaSpostamento = true;
  constructor() { }

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
  toggle() {
    this.verificaSpostamento = !this.verificaSpostamento;
  }
}
