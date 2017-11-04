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
  public wedstrijden: Wedstrijd[];

  constructor(private spelerService: SpelerService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) {
    this.speler = new Speler("", "");
    this.wedstrijden = new Array(); //lege speler instellen omdat html anders foutmelding geeft dat properties niet gelezen kunnen worden
    //can not read property naam of undefined
  }

  ngOnInit(): void {
    this.route.paramMap.switchMap((params: ParamMap) => this.spelerService.getSpeler(params.get('id')))
      .subscribe(speler => this.speler = speler);

    //this.getWedstrijden(this.speler.wedstrijden);
  }

/*   private getWedstrijden(id: string) {
    this.spelerService.getWedstrijdenForSpeler(id)
      .then(wedstrijden => this.wedstrijden = wedstrijden);
  } */

  gotoNieuweWedstrijdForm(): void {
    this.router.navigate(['/nieuweWedstrijd', this.speler._id]);
  }
}