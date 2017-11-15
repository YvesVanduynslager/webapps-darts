import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { InfoComponent } from './info/info.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
    { //lazy loading config
        path: 'darts',
        loadChildren: 'app/speler/speler.module#SpelerModule'
    },
    //{path: '', redirectTo: '/dashboard', pathMatch:'full'},
    {path: '', redirectTo: 'darts/dashboard', pathMatch: 'full'},
    {path: 'info', component: InfoComponent},
    {path: '**', component: PagenotfoundComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    declarations: [],
    exports: [RouterModule]
})

export class AppRoutingModule {}