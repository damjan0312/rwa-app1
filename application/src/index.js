import { Fight } from "../public/js/fight";
import { MMAorganization } from "../public/js/mmaOrganization";
import { DBService } from "../public/js/dbService";

import { Observable, fromEvent } from "rxjs";
import { map } from 'rxjs/operators';
import {take, share, publish} from 'rxjs/operators';


const organization = new MMAorganization(1);
organization.getFights();


const btnShow = document.getElementById("btnShow");

const fightDiv = document.getElementById("fight-sec-left");

const showFights$ = fromEvent(btnShow, 'click')
    .subscribe(
        () => {
            organization.arr.forEach(el =>{ 
                
                el.displayFight(fightDiv);
                btnShow.disabled=true;

            })
        },
        (err) => {
            console.log("Error: " + err)
        },
        () => {
            console.log("completed")
        }
    );

const dbService = new DBService();
const btnAdd = document.getElementById("btnAdd");

const addFight$ = fromEvent(btnAdd, 'click')
    .subscribe(
        () => {
            let x = dbService.add(organization);
        },
        (err) => {
            console.log("Error: " + err)
        },
        () => {
            console.log("completed")
        }
    );