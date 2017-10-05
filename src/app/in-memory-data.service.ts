import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const spelers = [
            {id: 0, naam: 'Zoe Zero', wedstrijden: [
                {id:1, puntenGewonnen: 3, tegenstanderid: 5},
                {id:3, puntenGewonnen: 1, tegenstanderid: 3}
                ]},
            {id: 1, naam: 'Yves Vanduynslager'},
            {id: 2, naam: 'Bert Vanrotsbakker'},
            {id: 3, naam: 'Hans Hijger', wedstrijden: [
                {id:4, puntenGewonnen: 2, tegenstanderid: 0}
            ]},
            {id: 4, naam: 'Pascal Paskotgluurder'},
            {id: 5, naam: 'Rodney Rolmops', wedstrijden: [
                {id:2, puntenGewonnen: 0, tegenstanderid: 0}
            ]}
        ];
        return {spelers};
    }
}