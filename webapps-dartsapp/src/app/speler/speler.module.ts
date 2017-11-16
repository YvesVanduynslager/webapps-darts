import { NgModule } from '@angular/core';

import { SpelerDetailComponent } from './speler-detail/speler-detail.component';
import { WedstrijdDetailComponent } from './wedstrijden/wedstrijden.component';
import { SpelersComponent } from './spelers/spelers.component';
import { NieuwewedstrijdComponent } from './nieuwewedstrijd/nieuwewedstrijd.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';

import { SpelerResolver } from './speler.resolver';
import { SpelerService } from './speler.service';

const routes = [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'editSpeler/:id', component: SpelerDetailComponent, /*resolve guard*/ resolve: { speler: SpelerResolver }}, //prefetch spelerData mbv SpelerResolver
    {path: 'nieuweWedstrijd/:id', component: NieuwewedstrijdComponent, resolve: { speler: SpelerResolver }},
    {path: 'wedstrijden/:id', component: WedstrijdDetailComponent, /*resolver: { speler: SpelerResolver}*/},
    {path: 'spelers', component: SpelersComponent},
];

@NgModule({
    imports:[
        HttpModule,
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        DashboardComponent,
        SpelerDetailComponent,
        WedstrijdDetailComponent,
        SpelersComponent,
        NieuwewedstrijdComponent,
    ],
    providers: [SpelerService, SpelerResolver]
})

export class SpelerModule {}