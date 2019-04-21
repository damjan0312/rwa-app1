import { MMAorganization } from "../js/mmaOrganization"
import { Fight } from "../js/fight"

import { Observable, fromPromise } from "rxjs";

export class DBService{

    

    add(organization)
    {
        let fighter1 = document.getElementById("inp_fighter1").value;
        let fighter2 = document.getElementById("inp_fighter2").value;
        let venue = document.getElementById("inp_venue").value;
        let type = document.getElementById("inp_type").value;
        let date = document.getElementById("inp_date").value;
        let analysis = document.getElementById("inp_analysis").value;
        let mmaOrganization = organization.ID;
       

        let newFight = new Fight(15, fighter1, fighter2, type, date, venue, analysis, mmaOrganization);

        let fightID= organization.arrLength() + 1; //organization.arr.length+1;

        console.log("ID: " + fightID);

        fetch("http://localhost:3000/fights", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: fightID,
                fighter1: fighter1,
                fighter2: fighter2,
                type:type,
                date: date,
                venue: venue,
                analysis: analysis,
                mmaOrganization: mmaOrganization
            })
        })
        .then(response => {
            console.log("ADDING SUCCESS!!!!");
            organization.addIntoArray(newFight);
        })
        .catch(response => { console.log(response) })
        
    }


    update(organization, id)
    {
        let fighter1 = document.getElementById("inp_fighter1").value;
        let fighter2 = document.getElementById("inp_fighter2").value;
        let venue = document.getElementById("inp_venue").value;
        let type = document.getElementById("inp_type").value;
        let date = document.getElementById("inp_date").value;
        let analysiS = document.getElementById("inp_analysis").value;
        let mmaOrganization = organization.ID;

        let url = 'http://localhost:3000/fights/' + id;

        fetch(url, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                fighter1: fighter1,
                fighter2: fighter2,
                type: type,
                date: date,
                venue: venue,
                analysis: analysiS,
                mmaOrganization: mmaOrganization
            })
        })
        .then(response => {
            console.log("UPDATE SUCCESS!!!!");
            organization.displayThemAll();
        })
        .catch(response => { console.log(response) })
        
    }

    delete(id) {

        let url = 'http://localhost:3000/fights/' + id;

        console.log();

            fetch(url, {
                method: 'delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(response => {
                console.log("DELETE SUCCESS!!!!");
                var organization = new MMAorganization(1);
                organization.displayThemAll();
            })
            .catch(err => console.log(err)) 
        
    }


}