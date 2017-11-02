import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Speler } from '../speler';
import { SpelerService } from '../speler.service';
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
  }

  private gotoEdit(): void {
    this.router.navigate(['/editSpeler', this.selectedSpeler._id]);
  }

  private add(naam: string): boolean {
    naam = naam.trim();

    this.spelerService.create(naam)
      .then(() => {
        this.getSpelers(); //nogmaals spelers ophalen na add speler
        this.selectedSpeler = null;
      });
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
      });
  }
  private getSpelers() {
    this.spelerService.getSpelers().then(spelers => this.spelers = spelers);
  }

  public ngOnInit(): void {
    this.getSpelers();

    this.nieuweSpeler = this.formBuilder.group({
      naam: this.formBuilder.control('', [Validators.required, Validators.minLength(2)])
    });
    /* this.nieuweSpeler = new FormGroup({
      naam: new FormControl('', [Validators.required, Validators.minLength(2)])
    }); */
  }
}