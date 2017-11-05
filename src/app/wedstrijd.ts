import { Speler } from './speler';
export class Wedstrijd
{
    _id: string;

    public constructor(private _puntenGewonnen: number, private _tegenstanderId: string, private _datumGespeeld: Date, id?: string){
        this._id = id;
    }

    get id(): string{
        return this._id;
    }
    get puntenGewonnen(): number {
        return this._puntenGewonnen;
    }
    get datumGespeeld(): Date {
        return this._datumGespeeld;
    }
    get tegenstanderId(): string {
        return this._tegenstanderId;
    }
    get puntenVerloren(): number {
        return 3 - this._puntenGewonnen;
    }
    get datum(): string {
        return this._datumGespeeld.getDay + "/" + this.datumGespeeld.getMonth + "/" + this.datumGespeeld.getFullYear;
    }
}