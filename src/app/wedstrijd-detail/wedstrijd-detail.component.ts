import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Speler } from '../speler';
import { Wedstrijd } from '../wedstrijd';
import { SpelerService } from '../speler.service';

@Component({
  selector: 'wedstrijdDetail',
  templateUrl: './wedstrijd-detail.component.html',
  styleUrls: ['./wedstrijd-detail.component.less']
})
export class WedstrijdDetailComponent implements OnInit {
  speler: Speler;
  wedstrijden: Wedstrijd[];

  constructor(private spelerService: SpelerService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.route.paramMap.switchMap((params: ParamMap) => this.spelerService.getSpeler(+params.get('id'))) //+convert hier naar number (was eerst string)
      .subscribe(speler => this.speler = speler);

      //hierna wedstrijden opvullen met id van speler;
  }
}