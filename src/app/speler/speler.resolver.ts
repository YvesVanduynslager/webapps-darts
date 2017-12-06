import { Resolve } from '@angular/router';
import { Speler } from './speler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
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
//Een resolver wordt gebruikt om een component niet te laden voor zijn inhoud is geladen. Hier een spelerobject.
//prefetchen van data
