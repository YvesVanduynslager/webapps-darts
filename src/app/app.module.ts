//import modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import routing settings
import { AppRoutingModule } from './app-routing.module';
//import components
import { AppComponent } from './app.component';
import { InfoComponent } from './info/info.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    InfoComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    //SpelerModule weggehaald, want werkt nu met lazy loading, wordt geladen in app-routing.module
    //SpelerModule,
    UserModule,
    AppRoutingModule
  ],
  //wordt nu geladen in speler.module
  //providers: [SpelerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
