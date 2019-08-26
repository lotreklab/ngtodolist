export class Attivita {
    id: number;
    titolo: string;
    descrizione: string;
    constructor(id: number, titolo: string, descrizione: string){
        this.id = id;
        this.titolo = titolo;
        this.descrizione = descrizione;
    }
}