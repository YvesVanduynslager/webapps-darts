import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SpelerDetailComponent } from './speler-detail/speler-detail.component';
import { WedstrijdDetailComponent } from './wedstrijd-detail/wedstrijd-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    SpelerDetailComponent,
    WedstrijdDetailComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
