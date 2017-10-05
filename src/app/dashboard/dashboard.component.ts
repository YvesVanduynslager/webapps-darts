import { Component, OnInit } from '@angular/core';
import { Speler } from '../speler';
import { SpelerService } from '../speler.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  spelers: Speler[] = [];
  constructor(private spelerService: SpelerService) {

  }

   ngOnInit(): void {
    this.spelerService.getSpelers()
      .then(spelers => this.spelers = spelers/*.slice(0,4)*/); //select top 2 spelers
      //veranderen naar alle spelers ophalen
  }
}