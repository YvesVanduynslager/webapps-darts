import { NgModule } from '@angular/core';
// import { PreloadAllModules } from '@angular/router/src/router_preloader';
import { RouterModule, Routes, PreloadAllModules} from '@angular/router';
import { AuthGuardService } from '../app/user/auth-guard.service';
import { InfoComponent } from './info/info.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
    { //lazy loading config
        path: 'darts',
        canActivate: [AuthGuardService],
        loadChildren: 'app/speler/speler.module#SpelerModule'
    },
    //{path: '', redirectTo: '/dashboard', pathMatch:'full'},
    {path: '', redirectTo: 'darts/dashboard', pathMatch: 'full'},
    {path: 'info', component: InfoComponent},
    {path: '**', component: PagenotfoundComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
    declarations: [],
    exports: [RouterModule]
})

export class AppRoutingModule {}