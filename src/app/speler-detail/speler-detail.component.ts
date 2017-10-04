import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { Speler } from '../speler';
import { SpelerService } from '../speler.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'spelerDetail',
  templateUrl: './speler-detail.component.html',
  styleUrls: ['./speler-detail.component.css']
})
export class SpelerDetailComponent implements OnInit {
  speler: Speler;

  constructor(private spelerService: SpelerService,
    private route: ActivatedRoute,
    private location: Location) { }

  goBack(): void { //terug van waar je komt (één stap terug in browers history stack)
    this.location.back();
  }

  save(): void {
    this.spelerService.update(this.speler)
    .then(() => this.goBack());
  }

  ngOnInit(): void {
    this.route.paramMap.switchMap((params: ParamMap) => this.spelerService.getSpeler(+params.get('id'))) //+convert hier naar number (was eerst string)
      .subscribe(speler => this.speler = speler);
  }
}