import { Component , OnInit} from '@angular/core';
import { Speler } from './speler';
import { SpelerService } from './speler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SpelerService] //injecting the SpelerService service into constructor
})

export class AppComponent implements OnInit{
  title = 'Darts';
  spelers: Speler[];
  selectedSpeler : Speler;

  constructor(private spelerService: SpelerService)
  {
  }

  getSpelers(): void {
    this.spelerService.getSpelers().then(spelers => this.spelers = spelers); //voor promise in spelerService
  }

  onSelect(speler: Speler): void {
    this.selectedSpeler = speler;
  }

  ngOnInit(): void {
    this.getSpelers();
  }
}