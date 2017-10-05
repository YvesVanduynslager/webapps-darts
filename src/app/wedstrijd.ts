import {Speler} from './speler'
export class Wedstrijd
{
    puntenGewonnen: number;
    puntenVerloren: number;
    datumGespeeld: Date;
    tegenstander: Speler;

    constructor(pg:number, pv:number, datum:Date, tegenstander:Speler){
        this.puntenGewonnen = pg;
        this.puntenVerloren = pv;
        this.datumGespeeld = datum;
        this.tegenstander = tegenstander;
    }
}