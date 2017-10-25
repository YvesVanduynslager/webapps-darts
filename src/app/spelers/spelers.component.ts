import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Speler } from '../speler';
import { SpelerService } from '../speler.service';

@Component({
  selector: 'Spelers',
  templateUrl: './spelers.component.html',
  styleUrls: ['./spelers.component.less']
  //providers: [SpelerService] //injecting the SpelerService service into constructor
})

export class SpelersComponent implements OnInit {
  title = 'Spelers';
  spelers: Speler[];
  //private _spelers;
  selectedSpeler: Speler;

  constructor(private spelerService: SpelerService,
    private router: Router) {
  }

  onSelect(speler: Speler): void {
    this.selectedSpeler = speler;
  }

  gotoEdit(): void {
    this.router.navigate(['/editSpeler', this.selectedSpeler._id]);
  }

  add(naam: string): boolean { /* betere methode dan in de slides, slides werken met HTMLInputElement ipv string,
    als je dit doet kan je lege strings toevoegen aan de spelers */
    naam = naam.trim();
    //naam.value = naam.value.trim();
    if (!naam) { //naam.value
      return;
    }
    this.spelerService.create(naam) //naam.value
      .then(speler => {
        this.spelers.push(speler);
        this.selectedSpeler = null;
      });
    return false; //event handlers return a boolean, true if you want to propagate the event to other handlers, false to "eat" the event
  }

  /* delete(speler: Speler): void {
    this.spelerService
      .delete(speler.id)
      .then(() => {
        this.spelers = this.spelers.filter(s => s !== speler);
        if (this.selectedSpeler === speler) {
          this.selectedSpeler = null;
        }
      });
  } */
  delete(speler: Speler): void {
    this.spelerService
      .delete(speler)
      .then(() => {
        this.spelers = this.spelers.filter(s => s !== speler);
        if (this.selectedSpeler === speler) {
          this.selectedSpeler = null;
        }
      });
  }

  /*   ngOnInit(): void {
      this.getSpelers();
    } */

  ngOnInit(): void {
    this.spelerService.getSpelers()
      .then(spelers => this.spelers = spelers); //select top 2 spelers
    //this._spelers = this.spelerService.spelers;
  }

  /*      get spelers() {
        return this._spelers;
      } */
}