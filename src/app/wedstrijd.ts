import { Speler } from './speler';
export class Wedstrijd
{
    public constructor(private _puntenGewonnen: number, private _tegenstander: string, private _datumGespeeld: string/*, id?: string*/){
    }
    get puntenGewonnen(): number {
        return this._puntenGewonnen;
    }
    get tegenstander(): string {
        return this._tegenstander;
    }
    get datumGespeeld(): string {
        return this._datumGespeeld;
    }
    get puntenVerloren(): number {
        return 3 - this._puntenGewonnen;
    }
}