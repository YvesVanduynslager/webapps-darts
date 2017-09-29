import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Speler } from '../speler';
import { SpelerService } from '../speler.service';

@Component({
  selector: 'Spelers',
  templateUrl: './spelers.component.html',
  styleUrls: ['./spelers.component.css'],
  providers: [SpelerService] //injecting the SpelerService service into constructor
})

export class SpelersComponent implements OnInit {
  title = 'Spelers';
  spelers: Speler[];
  selectedSpeler: Speler;

  constructor(private spelerService: SpelerService,
    private router: Router) {
  }

  getSpelers(): void {
    this.spelerService.getSpelers().then(spelers => this.spelers = spelers); //voor promise in spelerService
  }

  onSelect(speler: Speler): void {
    this.selectedSpeler = speler;
  }

  gotoDetail(): void {
    this.router.navigate(['detail', this.selectedSpeler.id]);
  }

  ngOnInit(): void {
    this.getSpelers();
  }
}