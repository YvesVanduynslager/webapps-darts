import { Injectable } from '@angular/core';
import { Speler } from './speler';
import { SPELERS } from './mock-spelers';

@Injectable()
export class SpelerService //get data from webservice, localstorage or mock data source
{
    getSpelers(): Promise<Speler[]> {
        return Promise.resolve(SPELERS); //haalt spelers async op, zo blokkeert de ui niet bij ophalen
    } //stub

    getSpeler(id: number): Promise<Speler> {
        return this.getSpelers()
            .then(spelers => spelers.find(speler => speler.id === id));
    }
    //test met trage connectie, vervang call naar getSpelers met dit
    getSpelersSlowly(): Promise<Speler[]> {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.getSpelers()), 2000);
        });
    }
}