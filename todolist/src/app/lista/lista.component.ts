import { Component, OnInit } from '@angular/core';
import { Attivita } from '../Attivita';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  arrayAttivita: Attivita[] = [
    { id: 0, titolo: 'Fare la spesa', descrizione: 'Fai la spesa entro domani'},
    { id: 1, titolo: 'Lavare i panni', descrizione: 'Lava i panni con ammorbidente'}
  ];
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

}
