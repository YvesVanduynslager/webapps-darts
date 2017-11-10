import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Speler } from '../speler';
import { SpelerService } from '../speler.service';
/* import { Speler } from '../../speler';
import { SpelerService } from '../../speler.service'; */

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'spelerDetail',
  templateUrl: './speler-detail.component.html',
  styleUrls: ['./speler-detail.component.less']
})
export class SpelerDetailComponent implements OnInit {
  private wijzigSpeler: FormGroup;
  speler: Speler;

  constructor(private spelerService: SpelerService, private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location) {
    //this.speler = new Speler("", "");
  }

  private onSubmit(): void {
    if (this.wijzigSpeler.valid)
      //this.add(new Wedstrijd(this.nieuweWedstrijd.value.puntenGewonnen, this.nieuweWedstrijd.value.tegenstander, this.nieuweWedstrijd.value.datumGespeeld));
      this.updateSpeler(this.wijzigSpeler.value.naam);
  }

  private add(punten: number, datum: string, tegenstander: string): void { //BOOLEAN?
    this.spelerService.addWedstrijdToSpeler(punten, datum, tegenstander, this.speler._id);

    this.goBack();
  }

  private goBack(): void { //terug van waar je komt (één stap terug in browers history stack)
    this.location.back();
  }

  private updateSpeler(naam: string): void {
    //console.log(this.speler);
    this.speler.naam = naam;
    this.spelerService.update(this.speler)
      .then(() => this.goBack());
  }

  public ngOnInit(): void {
/*     this.route.paramMap.switchMap((params: ParamMap) => this.spelerService.getSpeler(params.get('id'))) //+convert hier naar number (was eerst string)
      .subscribe(speler => this.speler = speler); */
      this.route.data.subscribe(item => this.speler = item['speler']);
    //VOOR OBSERVABLE!!!
    //this.route.paramMap.subscribe(pa => this.spelerService.getSpeler(pa.get('id')).subscribe(item => this.speler = item));

    this.wijzigSpeler = this.formBuilder.group({
      naam: this.formBuilder.control("", [Validators.required, Validators.minLength(2)])
    });
  }
}