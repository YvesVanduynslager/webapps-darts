//import modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'; //http for getting data from server
//import routing settings
import { AppRoutingModule } from './app-routing.module';
//imports for loading & configuring the in-memory-web-api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api'; //simulate communication with a remote server
import { InMemoryDataService } from './in-memory-data.service';
//import components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SpelerDetailComponent } from './speler-detail/speler-detail.component';
import { WedstrijdDetailComponent } from './wedstrijden/wedstrijden.component';
import { SpelersComponent } from './spelers/spelers.component';
//import services
import { SpelerService } from './speler.service';
import { InfoComponent } from './info/info.component';
import { NieuwewedstrijdComponent } from './nieuwewedstrijd/nieuwewedstrijd.component';

@NgModule({
  declarations: [
    AppComponent,
    SpelerDetailComponent,
    WedstrijdDetailComponent,
    SpelersComponent,
    DashboardComponent,
    InfoComponent,
    NieuwewedstrijdComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule, //haalt routinggegevens uit AppRoutingModule op
  ],
  providers: [SpelerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
