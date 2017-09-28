import { Component, OnInit, Input } from '@angular/core';
import { Speler } from '../speler';

@Component({
  selector: 'spelerDetail',
  templateUrl: './speler-detail.component.html',
  styleUrls: ['./speler-detail.component.css']
})
export class SpelerDetailComponent implements OnInit {
  @Input() speler: Speler;
  constructor() { }

  ngOnInit() {
  }

}
