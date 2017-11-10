import { Resolve } from '@angular/router';
import { Speler } from './speler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';
import { SpelerService } from './speler.service';

@Injectable()
export class SpelerResolver implements Resolve<Speler>{
    constructor(private spelerService: SpelerService) {}
    
    resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Speler>{
        return this.spelerService.getSpeler(route.params['id']);
    }
}
