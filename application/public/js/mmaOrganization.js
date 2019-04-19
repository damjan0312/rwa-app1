import { FightService } from './dbService';
import { Fight } from './fight';



export class MMAorganization{

    constructor(id){
        this.arr = [];
        this.ID = id;
    }

    addFight(fight){
        this.arr.push(fight);
    }

    getFights(){
        let get = fetch("http://localhost:3000/fights/")
                .then(response => response.json())
                .then(response => {
                    response.forEach(f => {
                        let fight = new Fight(f.fightId, f.fighter1, f.fighter2, f.venue, f.date, f.analysis);
                        this.addFight(fight);
                    });
                });
    }


}