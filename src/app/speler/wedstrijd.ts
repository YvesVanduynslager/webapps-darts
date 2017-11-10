import { Speler } from './speler';
export class Wedstrijd
{
    _id:string;
    public constructor(_id: string, private _puntenGewonnen: number, private _datumGespeeld: string, private _tegenstander: string){
        this._id = _id;
    }
    public get id(): string{
        return this._id;
    }
    public get puntenGewonnen(): number {
        return this._puntenGewonnen;
    }
    public get tegenstander(): string {
        return this._tegenstander;
    }
    public get datumGespeeld(): string {
        return this._datumGespeeld;
    }
    public get puntenVerloren(): number {
        return 3 - this._puntenGewonnen;
    }
}