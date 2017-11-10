//import modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { FormsModule } from '@angular/forms';
/* import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'; */
//import routing settings
import { AppRoutingModule } from './app-routing.module';
//import components
import { AppComponent } from './app.component';
//import { DashboardComponent } from './dashboard/dashboard.component';
/*import { SpelerDetailComponent } from './speler-detail/speler-detail.component';
import { WedstrijdDetailComponent } from './wedstrijden/wedstrijden.component';
import { SpelersComponent } from './spelers/spelers.component'; */
//import services
//import { SpelerService } from './speler.service';
import { InfoComponent } from './info/info.component';
// import { NieuwewedstrijdComponent } from './nieuwewedstrijd/nieuwewedstrijd.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SpelerModule } from './speler/speler.module';

@NgModule({
  declarations: [
    AppComponent,
    /* SpelerDetailComponent,
    WedstrijdDetailComponent,
    SpelersComponent,
    DashboardComponent,
    NieuwewedstrijdComponent,*/
    InfoComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    // FormsModule,
    // ReactiveFormsModule,
    // HttpModule,
    SpelerModule,
    AppRoutingModule
  ],
  //providers: [SpelerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
