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
  speler: Speler;
  wedstrijden: Wedstrijd[];

  constructor(private spelerService: SpelerService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.switchMap((params: ParamMap) => this.spelerService.getSpeler(+params.get('id'))) //+convert hier naar number (was eerst string)
      .subscribe(speler => this.speler = speler);

    //hierna wedstrijden opvullen met id van speler;
  }

  gotoNieuweWedstrijdForm(): void {
    this.router.navigate(['/nieuweWedstrijd', this.speler.id]);
  }
}