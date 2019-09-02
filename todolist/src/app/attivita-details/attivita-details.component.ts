import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiConnectionService } from '../api-connection.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Attivita } from '../Attivita';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-attivita-details',
  templateUrl: './attivita-details.component.html',
  styleUrls: ['./attivita-details.component.css']
})
export class AttivitaDetailsComponent implements OnInit{
  @Output() new = new EventEmitter<Attivita>();
  @Output() edit = new EventEmitter<Attivita>();

  dataForm;
  isEditing = false;

  constructor(
    private apiConnection: ApiConnectionService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.initNew();
  }

  initNew() {
    this.dataForm = this.formBuilder.group({
      titolo: '',
      descrizione: ''
    });
    this.isEditing = false;
  }

  initEdit(attivita: Attivita) {
    this.dataForm = this.formBuilder.group({
      id: attivita.id,
      titolo: attivita.titolo,
      descrizione: attivita.descrizione
    });
    this.isEditing = true;
  }

  newAttivita() {
    this.apiConnection.addAttivita(this.dataForm.value.titolo, this.dataForm.value.descrizione).subscribe((attivita: Attivita) => {
      this.new.next(attivita);
    }, (error: any) => {
      this.snackBar.open("Si è verificato un errore.", null, {
        duration: 5000
      });
    });
  }

  editAttivita() {
    this.apiConnection.editAttivita(
      this.dataForm.value.id, 
      this.dataForm.value.titolo, 
      this.dataForm.value.descrizione
      ).subscribe((attivita: Attivita) => {
        this.edit.next(attivita);
      }, (error: any) => {
        this.snackBar.open("Si è verificato un errore.", null, {
          duration: 5000
        });
      });
  }


}
