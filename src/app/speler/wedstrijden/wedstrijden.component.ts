import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Speler } from '../speler';
import { Wedstrijd } from '../wedstrijd';
import { SpelerService } from '../speler.service';

/* import { Speler } from '../../speler';
import { Wedstrijd } from '../../wedstrijd';
import { SpelerService } from '../../speler.service'; */

import { Router } from '@angular/router';

@Component({
  selector: 'wedstrijden',
  templateUrl: './wedstrijden.component.html',
  styleUrls: ['./wedstrijden.component.less']
})
export class WedstrijdDetailComponent implements OnInit {
  public speler: Speler;

  public constructor(private spelerService: SpelerService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) {
    this.speler = new Speler("", ""); //lege speler instellen omdat html anders foutmelding geeft dat properties niet gelezen kunnen worden
    //can not read property naam of undefined
  }

  private parseDatum(datum: string): string {
    console.log(datum);
    let dag: string = datum.substr(8, 2);
    let maand: string = datum.substr(5, 2);
    let jaar: string = datum.substr(0, 4);
    return dag + " / " + maand + " / " + jaar;
  }
  public ngOnInit(): void {
    this.getWedstrijdDetails();
  }

  /* Ik haal hier de speler ook opnieuw op , ipv enkel de wedstrijden, omdat de totale score van alle wedstrijden in Speler berekend wordt */
  private getWedstrijdDetails(): void {
    //geen gebruik van SpelerResolver, omdat wedstrijden gemapt moeten worden naar Wedstrijd objecten, moet wel mogelijk zijn, but yeah...
    this.route.paramMap.switchMap((params: ParamMap) => this.spelerService.getSpeler(params.get('id')).map(item => new Speler(item._id, item.naam, item.wedstrijden
    .map(w => new Wedstrijd(w._id, w.puntenGewonnen, this.parseDatum(w.datumGespeeld), w.tegenstander)))))
      .subscribe(speler => this.speler = speler);
  }

  private gotoNieuweWedstrijdForm(): void {
    this.router.navigate(['darts/nieuweWedstrijd', this.speler.id]);
  }

  private delete(wedstrijd: Wedstrijd): void {
    this.spelerService
      .deleteWedstrijd(wedstrijd._id)
      .then(() => this.getWedstrijdDetails());
    //.subscribe(() => this.getWedstrijdDetails());
  }
}