import { Component, OnInit, Input } from '@angular/core';
import { Attivita } from '../Attivita';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ListaComponent } from '../lista/lista.component';


@Component({
  selector: 'app-attivita-dettagli',
  templateUrl: './attivita-dettagli.component.html',
  styleUrls: ['./attivita-dettagli.component.css'],
  animations: [
    trigger('sposta', [
      transition(':enter', [
        style({ opacity: '0', marginLeft: '500px' }),
        animate(500)
      ]),
      transition(':leave', [
        style({ opacity: '1', marginLeft: '500px' }),
        animate(500)
      ])
    ]),
  ]
})

export class AttivitaDettagliComponent implements OnInit {
  @Input() attivita : Attivita;
  @Input() arrayAttivita: Attivita[];
  constructor() { }
  verificaSpostamento = true;
  ngOnInit() {
  }
  inizio() {
    console.log("ciao");
  }
  rimuoviDaArray(){
    var indiceArray;
    indiceArray = this.arrayAttivita.indexOf(this.attivita);
    this.arrayAttivita.splice(indiceArray, 1);
  }
}
