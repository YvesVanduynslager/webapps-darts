import { Wedstrijd } from './wedstrijd';
export class Speler {
    //_id: string;
    wedstrijden: Wedstrijd[];
    /*public totaalPunten: number = this.berekenTotaalPunten();
    public totaalVerlorenPunten: number = this.berekenTotaalVerlorenPunten();
    public aantalGespeeld: number = this.wedstrijden.length; */

    public constructor(private _id: string, private _naam: string, wedstrijden?: Wedstrijd[]) {
        this.wedstrijden = wedstrijden || new Array();
        //this._id = _id;

        //this.naam = naam;
        //this.voornaam = voornaam;
        //this.wedstrijden = wedstrijden;
    }

    public get naam(): string{
        return this._naam;
    }

    public get id(): string{
        return this._id;
    }

/*     public get wedstrijden(): Wedstrijd[] {
        console.log("get wedstrijden called");
        return this._wedstrijden;
    } */

/*     addWedstrijd(wedstr: Wedstrijd)
    {
        this._wedstrijden.push(wedstr);
    } */
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