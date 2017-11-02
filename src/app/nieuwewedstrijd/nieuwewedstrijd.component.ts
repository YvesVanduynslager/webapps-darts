import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Speler } from '../speler';
import { Wedstrijd } from '../wedstrijd';
import { SpelerService } from '../speler.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'nieuweWedstrijd',
  templateUrl: './nieuwewedstrijd.component.html',
  styleUrls: ['./nieuwewedstrijd.component.less']
})
export class NieuwewedstrijdComponent implements OnInit {
  private nieuweWedstrijd: FormGroup;
  public speler: Speler;
  public spelers: Speler[];
  public wedstrijden: Wedstrijd[];
  public MOGELIJKE_SCORES: number[] = [1,2,3];

  constructor(private spelerService: SpelerService, private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location) { }

  public goBack(): void { //terug van waar je komt (één stap terug in browers history stack)
    this.location.back();
  }

  private onSubmit(): void{
    if (this.nieuweWedstrijd.valid)
    this.add(new Wedstrijd(this.nieuweWedstrijd.value.puntenGewonnen, this.nieuweWedstrijd.value.tegenstander, this.nieuweWedstrijd.value.datumGespeeld) );
  }
   public ngOnInit(): void {
    this.route.paramMap.switchMap((params: ParamMap) => this.spelerService.getSpeler(params.get('id'))) //+convert hier naar number (was eerst string)
      .subscribe(speler => this.speler = speler);

    this.getSpelers();

    this.nieuweWedstrijd = this.formBuilder.group({
      datumGespeeld: this.formBuilder.control("", [Validators.required]),
      puntenGewonnen: this.formBuilder.control("", [Validators.required]),
      tegenstander: this.formBuilder.control("", [Validators.required, Validators.minLength(2)])
    });
  }

  private add(wedstr: Wedstrijd): boolean {
    this.spelerService.addWedstrijdToSpeler(wedstr, this.speler);
    return false;
  }

  public getSpelers(): void { //is ok, scores moeten niet weergegeven worden voor een lijst van spelers
      this.spelerService.getSpelers()
      .then(spelers => this.spelers = spelers); //voor promise in spelerService
      //this._spelers = this.spelerService.spelers;
  }

  public getFilteredSpelers(): Speler[] /*deze methode geeft de spelers array terug ZONDER de speler voor wie we een wedstrijd willen toevoegen 
  deze mag natuurlijk geen wedstrijden spelen tegen zichzelf! */ {
    return this.spelers.filter(speler => speler._id != this.speler._id);
  }
}
