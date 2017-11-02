export class Wedstrijd
{
    public _id: string;
    private readonly MAXPUNTEN: number = 3;
    //public puntenGewonnen: number;
    public puntenVerloren: number = this.MAXPUNTEN - this.puntenGewonnen;
    //public datumGespeeld: Date;
    //private tegenstander: string;

    public constructor(private _puntenGewonnen: number, private _tegenstander: string, private _datum?: Date){
       /*  this.puntenGewonnen = puntenGewonnen;
        this.datumGespeeld = datum;
        this.tegenstander = tegenstander; */
    }

    get puntenGewonnen(): number {
        return this._puntenGewonnen;
    }
    get datumGespeeld(): Date {
        return this._datum;
    }
    get tegenstander(): string {
        return this._tegenstander;
    }
}