import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-speler',
  templateUrl: './speler.component.html',
  styleUrls: ['./speler.component.css']
})
export class SpelerComponent implements OnInit {
  naam:string;
  constructor(naam)
  {
    this.naam = naam;
  }

  ngOnInit() {
  }
}