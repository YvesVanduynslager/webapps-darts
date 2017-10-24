import { Component, OnInit } from '@angular/core';
import { Speler } from '../speler';
import { SpelerService } from '../speler.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  spelers: Speler[] = [];
  //private _spelers;

  constructor(private spelerService: SpelerService) { }

  //called nadat alle @Input vars zijn ingesteld
  ngOnInit() {
    this.spelerService.getSpelers()
      .then(spelers => this.spelers = spelers);
    //this.spelers = this.spelerService.spelers;
  }

  /*    get spelers()
    {
      return this._spelers;
    } */
}