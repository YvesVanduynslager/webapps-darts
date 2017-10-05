import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SpelersComponent } from './spelers/spelers.component';
import { SpelerDetailComponent } from './speler-detail/speler-detail.component';
import { InfoComponent } from './info/info.component';

const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch:'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'detail/:id', component: SpelerDetailComponent},
    {path: 'spelers', component: SpelersComponent},
    {path: 'info', component: InfoComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}