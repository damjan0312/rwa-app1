import { MMAorganization } from "../public/js/mmaOrganization";
import { DBService } from "../public/js/dbService";

import { fromEvent, interval, zip } from "rxjs";
import { ajax } from "rxjs/ajax";
import {
  map,
  take,
  tap,
  debounceTime,
  switchMap,
  mergeMap,
  distinctUntilChanged,
  catchError,
  filter
} from "rxjs/operators";

export const URL = "http://localhost:3000/fighters";

const organization = new MMAorganization(1);

organization.displayThemAll();

const btnShow = document.getElementById("btnShow");

const fightDiv = document.getElementById("fight-sec-left");

const dbService = new DBService();

const btnAdd = document.getElementById("btnAdd");

const addFight$ = fromEvent(btnAdd, "click").subscribe(
  () => {
    if (document.getElementById("btnAdd").innerHTML === "Add fight")
      dbService.add(organization);
    else if (
      document.getElementById("btnAdd").innerHTML === "Confirm changes"
    ) {
      dbService.update(organization, document.getElementById("btnAdd").value);
    } else {
      console.log("Error");
    }
  },
  err => {
    console.log("Error: " + err);
  }
);

const searchByName = document.getElementById("inpSearchByName");
const divForFighter = document.getElementById("divForFighter");

const search$ = fromEvent(searchByName, "input")
  .pipe(
    map(e => e.target.value),
    debounceTime(1000),
    distinctUntilChanged(),
    tap(() => (divForFighter.innerHTML = "")),
    filter(fighter => !!fighter),
    switchMap(fighter =>
      ajax
        .getJSON(`http://localhost:3000/fighters?q=${fighter}`)
        .pipe(catchError(err => EMPTY))
    ),
    mergeMap(fighters => fighters)
  )
  .subscribe(fighter => {
    const fighterDiv = document.createElement("div");

    fighterDiv.innerHTML =
      '<div class="card col-sm-12 ml-5 mt-3 text-center mb-3" style="width: 18rem;">' +
      '<img class="card-img-top" src="' +
      fighter.picture +
      '" alt = "Card image cap">' +
      '<div class="card-body">' +
      '<h5 class="card-title"> ' +
      fighter.firstName +
      " " +
      fighter.lastName +
      " </h5>" +
      '<p class="card-text">Weight division: ' +
      fighter.weightClass +
      "</p>" +
      '<p class="card-text">Total strikes landed: ' +
      fighter.totalStrikesLanded +
      "</p>" +
      '<p class="card-text">Total take downs landed: ' +
      fighter.takeDownsLanded +
      "</p>" +
      '<p class="card-text">Total career knockdowns: ' +
      fighter.knockDowns +
      "</p>" +
      '<hr> <p class="card-text text-danger"> CHOOSE FIGHTER FOR SIMULATION' +
      "</p>" +
      "<button id=" +
      `chooseMe1` +
      " class='btn btn-primary' value='" +
      fighter.id +
      "'>BLUE CORNER</button>" +
      "<button id=" +
      `chooseMe2` +
      " class='btn btn-danger mt-3' value='" +
      fighter.id +
      "'>RED CORNER</button>" +
      "</div>";

    divForFighter.appendChild(fighterDiv);
  });

// SEPTEMBARKSI ROK DODATAK

const divForFighter1 = document.getElementById("blue-corner");
const divForFighter2 = document.getElementById("red-corner");

// izaberi prvog borca za simulaciju na btn BLUE CORNER (chooseMe1)
const fighter1$ = fromEvent(document, "click")
  .pipe(
    filter(event => event.target.id.includes("chooseMe1")),
    map(event => event.target.value),
    switchMap(id =>
      ajax
        .getJSON(`http://localhost:3000/fighters/${id}`)
        .pipe(catchError(err => EMPTY))
    )
  )
  .subscribe(fighter => {
    const fighterDiv = document.createElement("div");

    fighterDiv.innerHTML =
      '<div class="card ml-5 mt-3 text-center mb-3" style="width: 25rem;">' +
      '<img class="card-img-top" src="' +
      fighter.picture +
      '" alt = "Card image cap">' +
      '<div class="card-body">' +
      '<h5 class="card-title"> ' +
      fighter.firstName +
      " " +
      fighter.lastName +
      " </h5>" +
      '<p class="card-text">Weight division: ' +
      fighter.weightClass;

    divForFighter1.innerHTML = "";
    divForFighter1.appendChild(fighterDiv);

    if (divForFighter2.innerHTML != "") {
      btnStart.disabled = false;
    }
  });

// izaberi drugog borca za simulaciju na btn RED CORNER (chooseMe2)
const fighter2$ = fromEvent(document, "click")
  .pipe(
    filter(event => event.target.id.includes("chooseMe2")),
    map(event => event.target.value),
    switchMap(id =>
      ajax
        .getJSON(`http://localhost:3000/fighters/${id}`)
        .pipe(catchError(err => EMPTY))
    )
  )
  .subscribe(fighter => {
    const fighterDiv = document.createElement("div");

    fighterDiv.innerHTML =
      '<div class="card ml-5 mt-3 text-center mb-3" style="width: 25rem;">' +
      '<img class="card-img-top" src="' +
      fighter.picture +
      '" alt = "Card image cap">' +
      '<div class="card-body">' +
      '<h5 class="card-title"> ' +
      fighter.firstName +
      " " +
      fighter.lastName +
      " </h5>" +
      '<p class="card-text">Weight division: ' +
      fighter.weightClass;

    divForFighter2.innerHTML = "";
    divForFighter2.appendChild(fighterDiv);

    if (divForFighter1.innerHTML != "") {
      btnStart.disabled = false;
    }
  });

const btnStart = document.getElementById("start-simulation"); // zapocni simulaciju

const fighter1score$ = interval(1000).pipe(
  map(num => (Math.random().toFixed(2) + 1) * num),
  take(5)
);
const fighter2score$ = interval(1000).pipe(
  map(num => (Math.random().toFixed(2) + 1) * num),
  take(5)
);

const start$ = zip(fighter1score$, fighter2score$).pipe(
  tap(res => console.log(res)),
  map(([red, blue]) => {
    if (red >= blue) {
      return "Round for RED FIGHTER";
    } else {
      return "Round for BLUE FIGHTER";
    }
  })
);
const divForResult = document.getElementById("result");

fromEvent(btnStart, "click")
  .pipe(
    tap(() => (divForResult.innerHTML = "")),
    switchMap(event => {
      return start$;
    })
  )
  .subscribe(round => {
    const resultDiv = document.createElement("div");
    resultDiv.innerHTML = `<div class="row text-center text-danger"><h1 class="col-sm-12 text-center"> ${round}</h1></div>`;

    divForResult.appendChild(resultDiv);
  });
