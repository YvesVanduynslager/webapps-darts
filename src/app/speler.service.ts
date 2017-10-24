import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/toPromise';

import { Speler } from './speler';
/* import { Wedstrijd } from './wedstrijd';
import { SpelerWedstrijd } from './spelerwedstrijd'; */

@Injectable()
export class SpelerService {
    private spelersUrl = 'http://localhost:4200/API/spelers/'; //zal redirecten naar port 3000 (enkel in dev)

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

/*     getSpelers(): Promise<Speler[]> {
        return this.http.get(this.spelersUrl) //url naar servercommand die data ophaalt
            .toPromise() //Observable naar Promise omzetten, .toPromise op observable heeft [import 'rxjs/add/operator/toPromise';] nodig!!!
            .then(response => response.json().data as Speler[]) //omzetten van gekregen .json data naar Speler-object
            .catch(this.handleError); //catch server failures and pass to handler method
    } */

    getSpelers(): Promise<Speler[]> {
        return this.http.get(this.spelersUrl) //url naar servercommand die data ophaalt
            .toPromise() //Observable naar Promise omzetten, .toPromise op observable heeft [import 'rxjs/add/operator/toPromise';] nodig!!!
            .then(response => response.json().map(item => new Speler(item._id, item.naam, item.voornaam))) //omzetten van gekregen .json data naar Speler-object
            .catch(this.handleError); //catch server failures and pass to handler method
    }

    /*     get spelers(): Observable<Speler[]> {
            return this.http.get(this.spelersUrl).map(response =>
                response.json().map(item =>
                    new Speler(item._id, item.naam, item.voornaam))); //item.wedstrijden mappen naar wedstrijden object
        } */

    getSpeler(id: number): Promise<Speler> {
        //ONDERSTAANDE MET BACKTICKS!!! AltGr + µ
        const url = `${this.spelersUrl}/${id}`; //url naar servercommand met id parameter
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Speler)
            .catch(this.handleError);
    }

    /*     getWedstrijden(): Promise<Wedstrijd[]> {
            return this.http.get(this.wedstrijdenUrl)
            .toPromise()
            .then(response => response.json().data as Wedstrijd[])
            .catch(this.handleError);
        }
    
        getSpelerWedstrijden(): Promise<SpelerWedstrijd[]> {
            return this.http.get(this.spelerwedstrijdUrl)
                .toPromise()
                .then(response => response.json().data as SpelerWedstrijd[])
                .catch(this.handleError);
        } */

    update(speler: Speler): Promise<Speler> {
        const url = `${this.spelersUrl}/${speler.id}`;
        return this.http
            .put(url, JSON.stringify(speler), { headers: this.headers })
            .toPromise()
            .then(() => speler)
            .catch(this.handleError);
    }

    create(n: string): Promise<Speler> {
        return this.http
            .post(this.spelersUrl, JSON.stringify({ naam: n }), { headers: this.headers })
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