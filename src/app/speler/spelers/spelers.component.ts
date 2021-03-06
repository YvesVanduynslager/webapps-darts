import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Speler } from '../speler';
import { SpelerService } from '../speler.service';
/* import { Speler } from '../../speler';
import { SpelerService } from '../../speler.service'; */
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'Spelers',
  templateUrl: './spelers.component.html',
  styleUrls: ['./spelers.component.less']
})

export class SpelersComponent implements OnInit {
  private nieuweSpeler: FormGroup;
  private title = 'Spelers';
  private spelers: Speler[];
  private selectedSpeler: Speler;

  public constructor(private spelerService: SpelerService,
    private router: Router,
    private formBuilder: FormBuilder) {
  }

  private onSelect(speler: Speler): void {
    this.selectedSpeler = speler;
  }

  private onSubmit() {
    if (this.nieuweSpeler.valid)
      this.add(this.nieuweSpeler.value.naam);
      this.nieuweSpeler.reset();
  }

  private gotoEdit(): void {
    this.router.navigate(['darts/editSpeler', this.selectedSpeler.id]);
  }

  private add(naam: string): boolean {
    naam = naam.trim();
    console.log("add method in spelers.component: " + naam);

    this.spelerService.create(naam)
       .then(() => {
        this.getSpelers(); //nogmaals spelers ophalen na add speler
        this.selectedSpeler = null;
      });
/*       .subscribe(() => {
        this.getSpelers() //nogmaals spelers ophalen na add speler
        this.selectedSpeler = null;
      }); */
    return false; //event handlers return a boolean, true if you want to propagate the event to other handlers, false to "eat" the event
  }

  private delete(speler: Speler): void {
    this.spelerService
      .delete(speler)
       .then(() => {
        this.spelers = this.spelers.filter(s => s !== speler);
        if (this.selectedSpeler === speler) {
          this.selectedSpeler = null;
        }
/*         .subscribe(() => {
          this.spelers = this.spelers.filter(s => s !== speler);
          if (this.selectedSpeler === speler) {
            this.selectedSpeler = null;
          } */
      });
  }
  private getSpelers() {
    this.spelerService.getSpelers()
     .then(spelers => spelers.sort((speler1, speler2) => {
      if (speler1.naam > speler2.naam ) {
        return 1;
      }
      if (speler1.naam < speler2.naam) {
        return -1;
      }
      return 0;
    }))
    .then(spelers => this.spelers = spelers);
  }

  public ngOnInit(): void {
    this.getSpelers();

    this.nieuweSpeler = this.formBuilder.group({
      naam: this.formBuilder.control('', [Validators.required, Validators.minLength(2)])
    });
  }
}