import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Speler } from '../speler';
import { Wedstrijd } from '../wedstrijd';
import { SpelerService } from '../speler.service';

@Component({
  selector: 'nieuweWedstrijd',
  templateUrl: './nieuwewedstrijd.component.html',
  styleUrls: ['./nieuwewedstrijd.component.less']
})
export class NieuwewedstrijdComponent implements OnInit {
  public speler: Speler;
  public spelers: Speler[];
  public MOGELIJKE_SCORES: number[] = [1,2,3];

  constructor(private spelerService: SpelerService,
    private route: ActivatedRoute,
    private location: Location) { }

  public goBack(): void { //terug van waar je komt (één stap terug in browers history stack)
    this.location.back();
  }

/*   save(): void { //wedstrijd moet opgeslaan worden voor huidige speler, n:m etc
    this.spelerService.update(this.speler)
      .then(() => this.goBack());
  } */

  ngOnInit(): void {
    this.route.paramMap.switchMap((params: ParamMap) => this.spelerService.getSpeler(+params.get('id'))) //+convert hier naar number (was eerst string)
      .subscribe(speler => this.speler = speler);

    this.getAllSpelers();
  }

  public getAllSpelers(): void { //is ok, scores moeten niet weergegeven worden voor een lijst van spelers
    this.spelerService.getSpelers()
      .then(spelers => this.spelers = spelers); //voor promise in spelerService
  }

  public getFilteredSpelers(): Speler[] /*deze methode geeft de spelers array terug ZONDER de speler voor wie we een wedstrijd willen toevoegen 
  deze mag natuurlijk geen wedstrijden spelen tegen zichzelf! */ {
    return this.spelers.filter(speler => speler.id != this.speler.id);
  }
}
