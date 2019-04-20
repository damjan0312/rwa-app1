import { FightService } from './dbService';
import { Fight } from './fight';
import { of } from "rxjs";



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
                        
                        let fight = new Fight(f.id, f.fighter1, f.fighter2, f.type, f.date, f.venue, f.analysis, this.ID);
                   
                        this.addFight(fight);
                    });
                });
    }

    getFightWithID(id){
        this.arr.forEach(f => {
            if(f.id === id)
            {
                return f;
            }
        })
    }


}