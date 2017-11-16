import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Speler } from './speler';
import { Wedstrijd } from './wedstrijd';

@Injectable()
export class SpelerService {
    private spelersUrl = 'http://localhost:4200/API/spelers/';

    private headers = new Headers({ 'Content-Type': 'application/json' });

    public constructor(private http: Http) { }

    public getSpelers(): Promise<Speler[]> {
        return this.http.get(this.spelersUrl).map(response =>
            response.json().map(item => new Speler(item._id, item.naam, item.wedstrijden
                .map(w => new Wedstrijd(w._id, w.puntenGewonnen, w.tegenstander, w.datumGespeeld))))) //url naar servercommand die data ophaalt
            .toPromise() //Observable naar Promise omzetten, .toPromise op observable heeft [import 'rxjs/add/operator/toPromise';] nodig!!!
            //.then(response => response.json() as Speler[]/*.map(item => new Speler(item._id, item.naam))*/) //omzetten van gekregen .json data naar Speler-object
            .catch(this.handleError); //catch server failures and pass to handler method
    }

    public getSpeler(id: string): Observable<Speler> {
        /*In de speler functie is de json() een speler, en geen array, en dus lukt map niet.
        De functie daar afsluiten en een map toepassen op de observable<any> die gereturned wordt zou wel lukken.
        Ik dacht dat ik het in mijn slides ook zo doe, kijk eens naar die van hoofdstuk 5.*/
        const url = `${this.spelersUrl}${id}`;
        return this.http.get(url).map(response => response.json());
        /*         return this.http.get(url).map(response =>
                    response.json().map(item => new Speler(item._id, item.naam, item.wedstrijden
                        .map(w => new Wedstrijd(w.puntenGewonnen, w.tegenstander, w.datumGespeeld))))) //url naar servercommand die data ophaalt
                    .toPromise() */
        //.then(response => response.json() as Speler[]/*.map(item => new Speler(item._id, item.naam))*/) //omzetten van gekregen .json data naar Speler-object
        //.catch(this.handleError);
    }

    public update(speler: Speler): Promise<Speler> {
        const url = `${this.spelersUrl}${speler._id}`;
        return this.http
            .put(url, JSON.stringify(speler), { headers: this.headers })
            .toPromise()
            .then(() => speler)
            .catch(this.handleError);
    }

    public create(n: string): Promise<Speler> {
        return this.http
            .post(this.spelersUrl, JSON.stringify({ naam: n }), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data as Speler)
            .catch(this.handleError);
    }

    public addWedstrijdToSpeler(/*wedstr: Wedstrijd,*/punten: number, datum: string, tegenst: string, id: string): Promise<Wedstrijd> {
        const url = `${this.spelersUrl}${id}/wedstrijden/`;
        //return this.http.post(url, JSON.stringify({ puntenGewonnen: wedstr.puntenGewonnen, datumGespeeld: wedstr.datumGespeeld, tegenstander: wedstr.tegenstander }),
        return this.http.post(url, JSON.stringify({ puntenGewonnen: punten, datumGespeeld: datum, tegenstander: tegenst }),
            { headers: this.headers }).toPromise()
            .then(res => res.json().data as Wedstrijd)
            .catch(this.handleError);
    }

    public delete(speler: Speler): Promise<void> {
        const url = `${this.spelersUrl}${speler.id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    public deleteWedstrijd(id: string): Promise<void> {
        const url = `http://localhost:4200/API/wedstrijden/${id}`;
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