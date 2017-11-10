import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Speler } from '../speler';
import { Wedstrijd } from '../wedstrijd';
import { SpelerService } from '../speler.service';
/* 
import { Speler } from '../../speler';
import { SpelerService } from '../../speler.service';
import { Wedstrijd } from '../../wedstrijd'; */
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'nieuweWedstrijd',
  templateUrl: './nieuwewedstrijd.component.html',
  styleUrls: ['./nieuwewedstrijd.component.less']
})
export class NieuwewedstrijdComponent implements OnInit {
  private nieuweWedstrijd: FormGroup;
  private speler: Speler;
  private spelers: Speler[];
  private wedstrijden: Wedstrijd[];
  private MOGELIJKE_SCORES: number[] = [1, 2, 3];

  constructor(private spelerService: SpelerService, private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location) {
    this.speler = new Speler("", "");
    this.spelers = new Array();
    this.wedstrijden = new Array();
  }
  
  public ngOnInit(): void {
    this.route.paramMap.switchMap((params: ParamMap) => this.spelerService.getSpeler(params.get('id')))
      .subscribe(speler => this.speler = speler);

    this.getSpelers();

    this.nieuweWedstrijd = this.formBuilder.group({
      puntenGewonnen: this.formBuilder.control("", [Validators.required]),
      datumGespeeld: this.formBuilder.control("", [Validators.required]),
      tegenstander: this.formBuilder.control("", [Validators.required, Validators.minLength(2)])
    });
  }

  private goBack(): void { //terug van waar je komt (één stap terug in browser history stack)
    this.location.back();
  }

  private onSubmit(): void {
    if (this.nieuweWedstrijd.valid)
      //this.add(new Wedstrijd(this.nieuweWedstrijd.value.puntenGewonnen, this.nieuweWedstrijd.value.tegenstander, this.nieuweWedstrijd.value.datumGespeeld));
      this.add(this.nieuweWedstrijd.value.puntenGewonnen, this.nieuweWedstrijd.value.datumGespeeld, this.nieuweWedstrijd.value.tegenstander);
    }

/*   private add(wedstr: Wedstrijd): boolean { //BOOLEAN?
    this.spelerService.addWedstrijdToSpeler(wedstr, this.speler._id); */

    private add(punten: number, datum: string, tegenstander: string): void { //BOOLEAN?
      this.spelerService.addWedstrijdToSpeler(punten, datum, tegenstander, this.speler._id);

     this.goBack();
  }

  private getSpelers(): void {
    this.spelerService.getSpelers()
      .then(spelers => this.spelers = spelers); //voor promise in spelerService
  }

  private getFilteredSpelers(): Speler[] {
    return this.spelers.filter(speler => speler._id != this.speler._id);
  }
}