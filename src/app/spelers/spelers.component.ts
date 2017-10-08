import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Speler } from '../speler';
import { SpelerService } from '../speler.service';

@Component({
  selector: 'Spelers',
  templateUrl: './spelers.component.html',
  styleUrls: ['./spelers.component.less'],
  providers: [SpelerService] //injecting the SpelerService service into constructor
})

export class SpelersComponent implements OnInit {
  title = 'Spelers';
  spelers: Speler[];
  selectedSpeler: Speler;

  constructor(private spelerService: SpelerService,
    private router: Router) {
  }

  getSpelers(): void { //is ok, scores moeten niet weergegeven worden voor een lijst van spelers
    this.spelerService.getSpelers().then(spelers => this.spelers = spelers); //voor promise in spelerService
  }

  onSelect(speler: Speler): void {
    this.selectedSpeler = speler;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedSpeler.id]);
  }

  add(naam: string): void {
    naam = naam.trim();
    if (!naam) {
      return;
    }
    this.spelerService.create(naam)
      .then(speler => {
        this.spelers.push(speler);
        this.selectedSpeler = null;
      });
  }

  delete(speler: Speler): void {
    this.spelerService
      .delete(speler.id)
      .then(() => {
        this.spelers = this.spelers.filter(s => s !== speler);
        if (this.selectedSpeler === speler) {
          this.selectedSpeler = null;
        }
      });
  }

  ngOnInit(): void {
    this.getSpelers();
  }
}