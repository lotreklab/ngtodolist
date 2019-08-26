import { Component, OnInit, HostBinding } from '@angular/core';
import { Attivita } from '../Attivita';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  animations: [
    trigger('sposta', [
      state('inizio', style({
        marginLeft: '100px'
      })),
      state('fine', style({
        marginLeft: '200px'
      })),
      transition('inizio => fine', [
        animate('0.5s')
      ]),
      transition('fine => inizio', [
        animate('0.5s')
      ]),
    ]),
  ],
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
