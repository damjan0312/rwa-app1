
import { Fight } from "../public/js/fight";
import { MMAorganization } from "../public/js/mmaOrganization";
import { DBService } from "../public/js/dbService";

import { Observable, fromEvent, of, interval, pipe, from } from "rxjs";
import { map } from 'rxjs/operators';
import { take, share, publish, takeWhile, concatMap, delay, zip, skip } from 'rxjs/operators';



const organization = new MMAorganization(1);

organization.displayThemAll();



const btnShow = document.getElementById("btnShow");

const fightDiv = document.getElementById("fight-sec-left");

/*const showFights$ = fromEvent(btnShow, 'click')
    .subscribe(
     () => {
                organization.arr
                .forEach(el => {
                    el.displayFight(fightDiv);
                    btnShow.disabled = true;
                })
        },
     (err) => {
            console.log("Error: " + err)
        }
    ); */

const dbService = new DBService();

const btnAdd = document.getElementById("btnAdd");

const addFight$ = fromEvent(btnAdd, 'click')
    .subscribe(
        () => {
            if (document.getElementById("btnAdd").innerHTML === "Add fight")
                dbService.add(organization);
            else if (document.getElementById("btnAdd").innerHTML === "Confirm changes") {
                dbService.update(organization, document.getElementById("btnAdd").value);
            }
            else {
                console.log("Error");
            }
        },
        (err) => {
            console.log("Error: " + err)
        }
    );


/*
const fightt = new Fight(4, "sads", "fdsadsa", "dascsa", "dsadas", "dsadas", "dsadas", 1);
// pravim objekat
const source = of(fightt);
console.log(source);
// pravim observable od objekta
const dugme = document.getElementById("proba");
// dugme proba
console.log(source);

const probaclick = fromEvent(proba, "click");

const probasub = probaclick.subscribe(() =>{
    //NA KLIK MENJAM FIGHT I LOGUJEM OBSERVABLE KOJI JE UHVATIO PROMENU
    fightt.change();
    console.log(source);
}); */