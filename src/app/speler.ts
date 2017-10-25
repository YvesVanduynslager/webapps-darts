import { Wedstrijd } from './wedstrijd';
export class Speler {
    public _id: string;
    public naam: string;
    public voornaam: string;
    //ALLES WAT HIER IN COMMENTAAR STAAT: data ophalen werkt anders NOG niet
/*     public wedstrijden: Wedstrijd[];
    public totaalPunten: number = this.berekenTotaalPunten();
    public totaalVerlorenPunten: number = this.berekenTotaalVerlorenPunten();
    public aantalGespeeld: number = this.wedstrijden.length; */

    public constructor(id: string, naam: string, /*voornaam: string, wedstrijden: Wedstrijd[]*/) {
        this._id = id;
        this.naam = naam;
        //this.voornaam = voornaam;
        //this.wedstrijden = wedstrijden;
    }
    /* private berekenTotaalPunten() {
        let totaal: number = 0;
        this.wedstrijden.forEach(w => totaal += w.puntenGewonnen);
        return totaal;
    }

    private berekenTotaalVerlorenPunten() {
        let totaal: number = 0;
        this.wedstrijden.forEach(w => totaal += w.puntenVerloren);
        return totaal;
    } */
}