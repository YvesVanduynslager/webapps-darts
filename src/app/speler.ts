import { Wedstrijd } from './wedstrijd';
export class Speler {
    id: number;
    naam: string;
    voornaam: string;
    volledigeNaam: string = this.voornaam + " " + this.naam;
    wedstrijden: Wedstrijd[];
    aantalGespeeld: number = this.wedstrijden.length;
    totaalPunten: number = this.berekenTotaal();
    totaalVerlorenPunten: number = this.berekenVerlorenPunten();

    constructor(id:number,naam:string,voornaam:string,wedstrijden:Wedstrijd[]) {
        this.id = id;
        this.naam = naam;
        this.voornaam = voornaam;
        this.wedstrijden = wedstrijden;

    }
    private berekenTotaal(): number {
        let totaal: number = 0;
        this.wedstrijden.forEach(w => totaal += w.puntenGewonnen);
        return totaal;
    }

    private berekenVerlorenPunten(): number {
        let totaal: number = 0;
        this.wedstrijden.forEach(w => totaal += w.puntenVerloren);
        return totaal;
    }
}