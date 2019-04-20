import { fromEvent,interval, of } from "rxjs";
import { DBService } from "./dbService";
import { switchMap, mapTo, mergeMap} from "rxjs/operators";

export class Fight{
    
    constructor(id, fighter1, fighter2, type, date, venue, analysis, org)
    {
        this.id=id;
        this.fighter1=fighter1;
        this.fighter2=fighter2;
        this.type=type;
        this.date = date;
        this.venue = venue;
        this.analysis = analysis;
        this.org = org;
    }

    displayFight(container)
    {
        let parent = container;
        let fight_div = document.createElement("div");
        fight_div.className = "fight-div container-fluid";
        parent.appendChild(fight_div);

        let innerHtml = '<h3>' + this.fighter1 + ' vs ' + this.fighter2  + '</h3> '+ 
                        'venue: ' + this.venue + ' date: ' + this.date + ' analysis' +  this.analysis + '<br>';

        fight_div.innerHTML = innerHtml;

        let btnUpdateAnalysis = document.createElement("button");
        btnUpdateAnalysis.className = "btn btn-danger";
        btnUpdateAnalysis.id = "btnUpdate";
        btnUpdateAnalysis.innerHTML = "Update your analysis";
        btnUpdateAnalysis.value = this.id;
        fight_div.appendChild(btnUpdateAnalysis);


        let btnDelete = document.createElement("button");
        btnDelete.className = "btn btn-success ml-4";
        btnDelete.innerHTML = "Delete fight";
        btnDelete.id = "btnDelete";
        fight_div.appendChild(btnDelete);


        let btnAdd = document.getElementById("btnAdd");
        let lab = document.getElementById("add-update");

        


        const obsUpdate$ = fromEvent(btnUpdateAnalysis, "click");
        const obsUpdateFinish$ = obsUpdate$
            .pipe(
                switchMap((ev)=>{
                   return of(fromEvent(btnAdd, "click")
                        .subscribe(()=>{
                            this.clearInputs();
                        }) )
                    
                })  
            )
            .subscribe((ev) => {
                btnAdd.innerHTML="Confirm changes";
                btnAdd.value=this.id;
                 lab.innerHTML = "Update your analyze"
                this.fillInputs();
               
            });
        

        
    }


    fillInputs(){
     let inp1 =  document.getElementById("inp_fighter1").value = this.fighter1;
     let inp2 =  document.getElementById("inp_fighter2").value = this.fighter2;
     let inp3 =   document.getElementById("inp_type").value = this.type;
     let inp4 =   document.getElementById("inp_date").value = this.date;
     let inp5 =   document.getElementById("inp_venue").value = this.venue;
     let inp6 =   document.getElementById("inp_analysis").value = this.analysis;

     document.getElementById("inp_fighter1").disabled = true;
     document.getElementById("inp_fighter2").disabled = true;
     document.getElementById("inp_type").disabled = true;
     document.getElementById("inp_date").disabled = true;
     document.getElementById("inp_venue").disabled = true;
    }

    clearInputs(){

        let inp1 =  document.getElementById("inp_fighter1").value = "";
        let inp2 =  document.getElementById("inp_fighter2").value = "";
        let inp3 =   document.getElementById("inp_type").value = "";
        let inp4 =   document.getElementById("inp_date").value = "";
        let inp5 =   document.getElementById("inp_venue").value = "";
        let inp6 =   document.getElementById("inp_analysis").value = "";
   
        document.getElementById("inp_fighter1").disabled = false;
        document.getElementById("inp_fighter2").disabled = false;
        document.getElementById("inp_type").disabled = false;
        document.getElementById("inp_date").disabled = false;
        document.getElementById("inp_venue").disabled = false;


        let btnAdd = document.getElementById("btnAdd");
        let lab = document.getElementById("add-update");

        btnAdd.innerHTML="Add fight";
                btnAdd.value=-1;
                 lab.innerHTML = "Add fight"
                 console.log(btnAdd);

    }

}