import { Component, OnInit, HostBinding } from '@angular/core';
import { Attivita } from '../Attivita';
import { trigger, state, style, animate, transition, group, query, stagger } from '@angular/animations';
import { getCurrencySymbol } from '@angular/common';
import { ApiConnectionService } from '../api-connection.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

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
  alert = new Subject<string>();

  arrayAttivita: Attivita[];
  verificaSpostamento = true;

  constructor(
    private apiConnection: ApiConnectionService,
    private router: Router
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
    this.apiConnection.removeAttivita(attivita).subscribe( () => {
      var indiceArray;
      indiceArray = this.arrayAttivita.indexOf(attivita);
      this.arrayAttivita.splice(indiceArray, 1);
    }, (error: any) => {
      this.alert.next("Si è verificato un errore nel rimuovere l'attività");
    });
  }

  toggle() {
    this.verificaSpostamento = !this.verificaSpostamento;
  }
}
