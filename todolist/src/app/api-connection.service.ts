import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Attivita } from './Attivita';

const apiUrl = "http://192.168.1.134:8000/";

@Injectable({
  providedIn: 'root'
})
export class ApiConnectionService {
  httpHeaders: HttpHeaders;

  constructor(
    private http: HttpClient
  ) { 
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  setLoginData(username: String, password: String) {
    this.httpHeaders = this.httpHeaders.delete('Authorization').append('Authorization', 'Basic ' + btoa(username + ':' + password));
  }

  testLogin() {
    return this.http.options(apiUrl + "attivita/", {headers: this.httpHeaders});
  }

  getList() {
    return this.http.get<Attivita[]>(apiUrl + "attivita/", { headers: this.httpHeaders});
  }

  removeAttivita(attivita: Attivita) {
    return this.http.delete(apiUrl + "attivita/" + attivita.id + "/", { headers: this.httpHeaders});
  }

  addAttivita(titolo: string, descrizione: string) {
    return this.http.post<Attivita>(apiUrl + "attivita/", {
      titolo: titolo,
      descrizione: descrizione
    }, { headers: this.httpHeaders});
  }

  getAttivita(id: number) {
    return this.http.get<Attivita>(apiUrl + "attivita/" + id + "/", { headers: this.httpHeaders});
  }

  editAttivita(id: number, titolo: string, descrizione: string) {
    return this.http.put<Attivita>(apiUrl + "attivita/" + id + "/", {id: id, titolo: titolo, descrizione: descrizione}, { headers: this.httpHeaders});
  }

}
