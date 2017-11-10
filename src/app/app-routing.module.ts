import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

/* import { DashboardComponent } from './dashboard/dashboard.component';
import { SpelersComponent } from './spelers/spelers.component';
import { SpelerDetailComponent } from './speler-detail/speler-detail.component';
import { WedstrijdDetailComponent} from './wedstrijden/wedstrijden.component';
import { NieuwewedstrijdComponent} from './nieuwewedstrijd/nieuwewedstrijd.component'; */
import { InfoComponent } from './info/info.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch:'full'},
/*     {path: 'dashboard', component: DashboardComponent},
    {path: 'editSpeler/:id', component: SpelerDetailComponent},
    {path: 'nieuweWedstrijd/:id', component: NieuwewedstrijdComponent},
    {path: 'wedstrijden/:id', component: WedstrijdDetailComponent},
    {path: 'spelers', component: SpelersComponent}, */
    {path: 'info', component: InfoComponent},
    {path: '**', component: PagenotfoundComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    declarations: [],
    exports: [RouterModule]
})

export class AppRoutingModule {}