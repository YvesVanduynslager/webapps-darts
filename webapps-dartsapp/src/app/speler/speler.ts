import { Wedstrijd } from './wedstrijd';
export class Speler {
    _id: string;
    _naam: string;
    wedstrijden: Wedstrijd[];

    static fromJSON(json): Speler {
        const sp = new Speler(json._id, json.naam);
        return sp;
    }

    constructor(id: string, naam: string, wedstrijden?: Wedstrijd[]) {
        this._id = id;
        this.wedstrijden = wedstrijden || new Array<Wedstrijd>();
        this._naam = naam;
    }

    get naam(): string{
        return this._naam;
    }

    set naam(naam:string){
        this._naam = naam;
    }

    get id(): string{
        return this._id;
    }

    get totaalPunten() {
        let totaal: number = 0;
        this.wedstrijden.forEach(w => totaal += w.puntenGewonnen);
        return totaal;
    }

    get totaalVerlorenPunten() {
        let totaal: number = 0;
        this.wedstrijden.forEach(w => totaal += w.puntenVerloren);
        return totaal;
    }

    get aantalGespeeld():number{
        return this.wedstrijden.length;
    }

    toJSON() {
        return {
            _id: this._id,
            naam: this._naam
        };
    }

/*     addWedstrijd(w: Wedstrijd){
        this.wedstrijden.push(w);
    } */
}