import { Wedstrijd } from './wedstrijd';
export class Speler {
    public  id: number;
    public naam: string;
    public voornaam: string;
    public wedstrijden: Wedstrijd[];
    private _volledigeNaam: string;
    private _totaalPunten: number;
    private _totaalVerlorenPunten: number;

    public constructor(id:number,naam:string,voornaam:string,wedstrijden:Wedstrijd[]) {
        this.id = id;
        this.naam = naam;
        this.voornaam = voornaam;
        this.wedstrijden = wedstrijden;
    }

    public volledigeNaam()
    {
        return this.voornaam + " " + this.naam;
    }
    public aantalGespeeld()
    {
        return this.wedstrijden.length;
    }
    public totaalPunten() {
        this._totaalPunten = 0;
        this.wedstrijden.forEach(w =>this._totaalPunten += w.puntenGewonnen);
        return this._totaalPunten;
    }

    public totaalVerlorenPunten() {
        this._totaalVerlorenPunten = 0;
        this.wedstrijden.forEach(w => this._totaalVerlorenPunten += w.puntenVerloren);
        return this._totaalVerlorenPunten;
    }
}