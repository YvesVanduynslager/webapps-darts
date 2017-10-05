import {Speler} from './speler'
export class Wedstrijd
{
    private readonly MAXPUNTEN: number = 3;
    public puntenGewonnen: number;
    public datumGespeeld: Date;
    public tegenstander: Speler;

    public constructor(pg:number, datum:Date, tegenstander:Speler){
        this.puntenGewonnen = pg;
        this.datumGespeeld = datum;
        this.tegenstander = tegenstander;
    }

    public puntenVerloren()
    {
        return this.MAXPUNTEN - this.puntenGewonnen;
    }
}