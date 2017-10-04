import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const spelers = [
            {id: 0, naam: 'Zoe Zero'},
            {id: 1, naam: 'Yves Vanduynslager'},
            {id: 2, naam: 'Bert Vanrotsbakker'},
            {id: 3, naam: 'Hans Hijger'},
            {id: 4, naam: 'Pascal Paskotgluurder'},
            {id: 5, naam: 'Rodney Rolmops'}
        ];
        return {spelers};
    }
}