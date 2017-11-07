import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Speler } from '../speler';
import { Wedstrijd } from '../wedstrijd';
import { SpelerService } from '../speler.service';
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
    let dag: string = datum.substr(8, 2);
    let maand: string = datum.substr(5, 2);
    let jaar: string = datum.substr(0, 4);
    return dag + " / " + maand + " / " + jaar;
  }
  public ngOnInit(): void {
    this.route.paramMap.switchMap((params: ParamMap) => this.spelerService.getSpeler(params.get('id')).map(item => new Speler(item._id, item.naam, item.wedstrijden
      .map(w => new Wedstrijd(w.puntenGewonnen, w.tegenstander, this.parseDatum(w.datumGespeeld))))))
      .subscribe(speler => this.speler = speler);
  }

  private gotoNieuweWedstrijdForm(): void {
    this.router.navigate(['/nieuweWedstrijd', this.speler.id]);
  }
}