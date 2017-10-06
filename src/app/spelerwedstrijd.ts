export class SpelerWedstrijd
{
    public id:number;
    public spelerId:number;
    public wedstrijdId:number;
    public gewonnenPunten:number;
    public verlorenPunten: number = 3 - this.gewonnenPunten;
    constructor(){}
}