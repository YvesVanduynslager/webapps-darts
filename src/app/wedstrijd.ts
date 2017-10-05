import {Speler} from './speler'
export class Wedstrijd
{
    public id: number;
    private readonly MAXPUNTEN: number = 3;
    public puntenGewonnen: number;
    public puntenVerloren: number = this.MAXPUNTEN - this.puntenGewonnen;
    public datumGespeeld: Date;
    public tegenstanderid: number;

    public constructor(id: number, pg:number, datum:Date, tegenstanderid:number){
        this.puntenGewonnen = pg;
        this.datumGespeeld = datum;
        this.tegenstanderid = tegenstanderid;
    }
}