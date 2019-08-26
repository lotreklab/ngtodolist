import { Component, OnInit, Input } from '@angular/core';
import { Attivita } from '../Attivita';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-attivita-dettagli',
  templateUrl: './attivita-dettagli.component.html',
  styleUrls: ['./attivita-dettagli.component.css'],
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

export class AttivitaDettagliComponent implements OnInit {
  @Input() attivita: Attivita;
  constructor() { }
  verificaSpostamento = true;
  ngOnInit() {
  }
  toggle() {
    this.verificaSpostamento = !this.verificaSpostamento;
  }
}
