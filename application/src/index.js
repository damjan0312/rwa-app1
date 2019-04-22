
import { Fight } from "../public/js/fight";
import { MMAorganization } from "../public/js/mmaOrganization";
import { DBService } from "../public/js/dbService";

import { Observable, fromEvent, of, interval, pipe, from } from "rxjs";
import { ajax } from 'rxjs/ajax';
import { map, take, delay, zip, skip, tap, debounceTime, switchMap, mergeMap, distinctUntilChanged, catchError, filter } from 'rxjs/operators';



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


const searchByName = document.getElementById("inpSearchByName");
const divForFighter = document.getElementById("divForFighter");

const search$ = fromEvent(searchByName, 'input')
        .pipe(
            map(e => e.target.value),
            debounceTime(1000),
            distinctUntilChanged(),
            tap(() => (divForFighter.innerHTML = '')),
            filter(fighter => !!fighter),
            switchMap(fighter => 
                ajax.getJSON("http://localhost:3000/fighters?q=" + fighter)
                .pipe(catchError(err=> EMPTY))
                ),
            mergeMap(fighters => fighters),
            tap(console.log, console.warn)
        )
        .subscribe(fighter => {

            const fighterDiv = document.createElement('div');

            fighterDiv.innerHTML = '<div class="card col-sm-12 ml-5 mt-3 text-center mb-3" style="width: 18rem;">'+
            '<img class="card-img-top" src="'+fighter.picture+'" alt = "Card image cap">'+
            '<div class="card-body">'+
             '<h5 class="card-title"> ' + fighter.firstName + " " + fighter.lastName + ' </h5>'+
             '<p class="card-text">Weight division: ' + fighter.weightClass + '</p>' +
             '<p class="card-text">Total strikes landed: ' + fighter.totalStrikesLanded +'</p>' +
             '<p class="card-text">Total take downs landed: ' + fighter.takeDownsLanded + '</p>' +
             '<p class="card-text">Total career knockdowns: ' + fighter.knockDowns + '</p>' +
            '</div>'+
            '</div>';

            divForFighter.appendChild(fighterDiv);
            
        })