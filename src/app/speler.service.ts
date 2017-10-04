/* import { Injectable } from '@angular/core';
import { Speler } from './speler';
//import { SPELERS } from './mock-spelers';

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
} */
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Speler } from './speler';

@Injectable()
export class SpelerService {
    private spelersUrl = 'api/spelers';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    getSpelers(): Promise<Speler[]> {
        return this.http.get(this.spelersUrl) //url naar servercommand die data ophaalt
            .toPromise() //Observable naar Promise omzetten, .toPromise op observable heeft [import 'rxjs/add/operator/toPromise';] nodig!!!
            .then(response => response.json().data as Speler[]) //omzetten van gekregen .json data naar Speler-object
            .catch(this.handleError); //catch server failures and pass to handler method
    }

    getSpeler(id: number): Promise<Speler> {
        //ONDERSTAANDE MET BACKTICKS!!! AltGr + µ
        const url = `${this.spelersUrl}/${id}`; //url naar servercommand met id parameter
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Speler)
            .catch(this.handleError);
    }

    update(speler: Speler): Promise<Speler> {
        const url = `${this.spelersUrl}/${speler.id}`;
        return this.http
            .put(url, JSON.stringify(speler), { headers: this.headers })
            .toPromise()
            .then(() => speler)
            .catch(this.handleError);
    }

    create(naam: string): Promise<Speler> {
        return this.http
            .post(this.spelersUrl, JSON.stringify({ naam: naam }), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data as Speler)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.spelersUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); //demo purposes only
        return Promise.reject(error.message || error);
    }
}