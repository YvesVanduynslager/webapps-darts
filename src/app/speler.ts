import { Wedstrijd } from './wedstrijd';
export class Speler {
    _id: string;
    wedstrijden: Wedstrijd[];

    public constructor(_id: string, private _naam: string, wedstrijden?: Wedstrijd[]) {
        this._id = _id;
        this.wedstrijden = wedstrijden || new Array();
    }

    public get naam(): string{
        return this._naam;
    }

    public get id(): string{
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
}