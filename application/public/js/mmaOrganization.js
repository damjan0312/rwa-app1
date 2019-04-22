import { FightService } from './dbService';
import { Fight } from './fight';
import { Observable, of, from } from "rxjs";
import { flatMap, skip } from "rxjs/operators"

export const url = "http://localhost:3000/fights";

export class MMAorganization {

    constructor(id) {
        this.arr = [];
        this.ID = id;
        this.element = 0; // broj elemenata u nizu
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
    addIntoArray(fight) {
        this.arr.push(fight);

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

        let fight$ = this.getFights(); // vraca observer
        console.log("VRACENI OBSERVER: " + fight$);
        let sub = fight$
            .subscribe(f => {
                this.element++;
                f.displayFight(container);
            });
    }

}