import { FightService } from './dbService';
import { Fight } from './fight';
import { Observable, of, from, interval } from "rxjs";
import { flatMap, skip, map } from "rxjs/operators"

export const url = "http://localhost:3000/fights";

export class MMAorganization {

    constructor(id) {
        this.arr = [];
        this.ID = id;
        this.element = 0;
        this.IDs= [];
    }

    fetchData() {
        return Observable.create(observer => {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    observer.next(data);
                })
                .catch(err => observer.error(err));
        })
    }
    fillTheArray() {
        const obs$ = this.fetchData();

        const sub = obs$.subscribe(value => {
            this.arr.push(new Fight(fight.id, fight.fighter1, fight.fighter2,
                fight.type, fight.date, fight.venue, fight.analysis, this.ID));
        });

    }
    addIntoArray(fight, fightID) {
        this.arr.push(fight);
        this.IDs.push(fightID);

        this.displayThemAll();
    }

    arrLength() {

        return this.element;
    }

    getFights() {
        return Observable.create(observer => {
            this.fetchData().subscribe(data => {
                data.forEach(fight => {
                    observer.next(new Fight(fight.id, fight.fighter1, fight.fighter2,
                        fight.type, fight.date, fight.venue, fight.analysis, this.ID));
                })
            })
        })
    }

    displayThemAll() {
        const container = document.getElementById('showThem');
        container.innerHTML = "";
        this.element = 0;

        let fight$ = this.getFights();// vraca observable
        let sub = fight$
            .subscribe(f => {
                this.element++;
                f.displayFight(container);
            });
    }

    keepTrackOfIDs(value){
        this.IDs.push(value);
    }
    removeFromIDs(value){
        for( var i = 0; i < IDs.length; i++){ 
            if ( IDs[i] === value) {
                IDs.splice(i, 1); 
            }
         }
         
    }

}