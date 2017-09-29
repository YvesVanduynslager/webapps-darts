//import modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; //NgModel import
import { RouterModule } from '@angular/router';

//import components
import { AppComponent } from './app.component';
import { SpelerDetailComponent } from './speler-detail/speler-detail.component';
import { WedstrijdDetailComponent } from './wedstrijd-detail/wedstrijd-detail.component';
import { SpelersComponent } from './spelers/spelers.component';
import { DashboardComponent } from './dashboard/dashboard.component';

//import services
import { SpelerService } from './speler.service';

import { AppRoutingModule } from './app-routing.module'; //routing gegevens importeren

@NgModule({
  declarations: [
    AppComponent,
    SpelerDetailComponent,
    WedstrijdDetailComponent,
    SpelersComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule, //haalt routinggegevens uit AppRoutingModule op
  ],
  providers: [SpelerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
