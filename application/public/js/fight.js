
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
        btnUpdateAnalysis.innerHTML = "Update your analysis";
        fight_div.appendChild(btnUpdateAnalysis);

        let btnDelete = document.createElement("button");
        btnDelete.className = "btn btn-success ml-4";
        btnDelete.innerHTML = "Delete fight";
        fight_div.appendChild(btnDelete);

        

    }
}