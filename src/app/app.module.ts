import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SpelerComponent } from './speler/speler.component';
import { WedstrijdComponent } from './wedstrijd/wedstrijd.component';

@NgModule({
  declarations: [
    AppComponent,
    SpelerComponent,
    WedstrijdComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
