import { Speler } from './speler';
export class Wedstrijd
{
    public _id: string;
    private readonly MAXPUNTEN: number = 3;
    //public puntenVerloren: number = this.MAXPUNTEN - this.puntenGewonnen;

    public constructor(private _puntenGewonnen: number, private _tegenstanderId: string, private _datum?: Date){
    }

    get puntenGewonnen(): number {
        return this._puntenGewonnen;
    }
    get datumGespeeld(): Date {
        //return this._datum.getDay + "/" + this._datum.getMonth + "/" + this._datum.getFullYear;
        return this._datum;
    }
     get tegenstanderId(): string {
        return this._tegenstanderId;
    }
    get puntenVerloren(): number {
        return this.MAXPUNTEN - this._puntenGewonnen;
    }
    set puntenGewonnen(pg:number) {
        this._puntenGewonnen = pg;
    }
/*     set tegenstanderId(id:string) {
        this._tegenstanderId = id;
    } */
}