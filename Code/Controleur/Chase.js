function isEqual(liste1,liste2)
{
    var test;
    for(const elt in liste1)
    {
        test=false
        for(const element in liste2)
        {
            if(liste2[element]==liste1[elt])
            {
                test=true;
            }
        }
        if(!test)
        {
            return false;
        }
    }
    return true;
}
function getAll(liste)
{
    var all=[];
    for (const elt in liste)
    {
        //console.log("elt",liste[elt]);
        for (const element in liste[elt])
        {
            //console.log("element",liste[elt][element]);
            for (const elt2 in liste[elt][element])
            {
                //console.log("Nani???",liste[elt][element][elt2]);
                if (!all.includes(liste[elt][element][elt2]))
                {
                    all.push(liste[elt][element][elt2]);
                }
            }
        }
    }
    return all;
}
function testComplete(tableau)
{
    var test;
    for(var indice=1;indice<tableau.length;indice++)
    {
        test=true;
        for(var ind2=0;ind2<tableau[indice][1].length;ind2++)
        {
            // console.log(tableau[indice][1][ind2].includes('α'));
            if(!tableau[indice][1][ind2].includes('α'))
            {
                test=false;
            }
        }
        if (test)
        {
            return true;
        }
    }
    return false;
}

function isαInclude(liste)
{
    for(const elt in liste)
    {
        if(liste[elt].includes('α'))
        {
            return true;
        }
    }
    return false;
}

function rule1(tableau,indexage)
{   
    // console.log("rule1",tableau);
    var time={};
    for(var i=1;i<tableau.length;i++)
    {
        if(time[tableau[i][0]])
        {
            time[tableau[i][0]].push(i);
        }
        else
        {
            time[tableau[i][0]]=[i];
        }
    }
    // console.log("time",time);

    var alpha;
    for (var k in time)
    {
        // console.log("k",k,"time[k]",time[k]);
        if (time[k].length>1)
        {
            // console.log("Hey!",time[k]);
            alpha=false;
            for(var i =0;i<time[k].length;i++)
            {
                // console.log("indice",time[k][i]);
                // console.log("path",isαInclude(tableau[time[k][i]][1]));
                // console.log("test",isαInclude(tableau[time[k][i]][1]));
                if(isαInclude(tableau[time[k][i]][1]))
                {
                    alpha=true;
                }
            }
            // console.log('α',alpha);
            if(alpha)
            {
                var allalpha=true;
                for(var j=0;j<time[k].length;j++)
                {
                    // console.log("[DEBUG]",tableau[time[k][j]]);
                    for(var l=0;l<tableau[time[k][j]].length;l++)
                    {
                        allalpha=allalpha && tableau[time[k][j]][l][0].includes('α');
                        // console.log("Hihi",allalpha,tableau[time[k][j]][l][0].includes('α'),tableau[time[k][j]][l][0]);
                    }
                }
            }
            // console.log("alphaaaaaaaaa",alpha,allalpha);
            if(alpha && !allalpha)
            {
               for(var j=0;j<time[k].length;j++)
               {
                //    console.log("Uh?",tableau[time[k][j]][1]);
                   if(!isαInclude(tableau[time[k][j]][1]))
                   {
                    //    console.log("Hello there!",tableau[time[k][j]][1]);
                       for(var l=0;l<tableau[time[k][j]][1].length;l++)
                       {
                        //    console.log("?????",tableau[time[k][j]][1][l]);
                           if(!tableau[time[k][j]][1][l].includes('α'))
                           {
                                // console.log("time...",time[k],"j",j,"...",time[k][j]);
                                // console.log(".................................................",tableau[time[k][j]][1][l],time[k],k,j,l);
                                tableau[time[k][j]][1][l]='α'+"<sub>"+indexage[tableau[0][1][l]]+"</sub>";
                                // console.log("....",indexage[tableau[0][1][l]]);
                                return [true,tableau];
                           }
                       }
                   }
               } 
            }
            else if(!allalpha)
            {
                var samebeta=true;
                for(const elt in time)
                {
                    if (time[elt].length>1)
                    {
                        // console.log(time[elt]);
                        // console.log(tableau);
                       for(const element in time[elt])
                       {
                        // console.log("?.??.",tableau[time[elt][0]][1][0]);
                        // console.log("?.??.",tableau[time[elt][element]][1][0]);                           
                            if(tableau[time[elt][element]][1][0]!=tableau[time[elt][0]][1][0])
                            {
                                samebeta=false;
                            }
                       } 
                    }
                }
                // console.log("beta",samebeta);

                if(!samebeta)
                {
                    //Beta changing
                    // console.log(time);
                    for(const elt in time)
                    {
                        if (time[elt].length>1)
                        {
                            // console.log("...",tableau[time[elt][0]][1]);
                            for(const elt2 in time[elt])
                            {
                                tableau[time[elt][elt2]][1]=tableau[time[elt][0]][1];
                            }
                        }
                    }
                    // console.log("tableau?",tableau);
                    return [true, tableau];
                }
                
            }
            // console.log("alpha",alpha);
        }
    }
    // console.log("tableau!!",tableau);
    return [false];
}

function Chase(tableau,DF,indexage)
{
    var changement=true;
    var changement;
    var intraChangement;
    for (const sing in DF)
    {
        // console.log("!!!",DF[sing]);
        changement=[DF[sing]];
        for(var ind=1;ind<tableau.length;ind++)
        {
            intraChangement=[];
            for(const sssing in DF[sing])
            {
                // console.log("..",DF[sing][sssing]);   
                intraChangement.push([])
                for(const ss2sing in DF[sing][sssing])
                {
                    // console.log('.',DF[sing][sssing][ss2sing],indexage[DF[sing][sssing][ss2sing]]);
                    // console.log(',',tableau[ind][1][indexage[DF[sing][sssing][ss2sing]]]);
                    // console.log('?',tableau[ind][1][1]);
                    intraChangement[intraChangement.length-1].push(tableau[ind][1][indexage[DF[sing][sssing][ss2sing]]])
                }
                // console.log("Hehe",intraChangement);
                
            }
            changement.push(intraChangement);
        }
        // console.log("changement",changement);
        var recup=rule1(changement,indexage);
        var where;
        var switchies=1;
        if (recup[0])
        {
            // console.log("recup!!",recup[1]);
            // console.log("tableau",tableau);
            where=recup[1][0];
            for(var indice=1;indice<recup[1].length;indice++)
            {
                // console.log("indice",indice);
                // console.log("wiiiiiiiiiii",recup[1][indice]);
                // console.log("index",indexage[where[switchies]],"where",where,switchies);
                // console.log("??",indexage,'/',where,'/',switchies);
                // console.log("Nyeh",tableau[indice][1][indexage[where[switchies]]]);
                // console.log("recup[1][indice][ind2]",recup[1][indice][1][0]);
                tableau[indice][1][indexage[where[switchies]]]=recup[1][indice][1][0];
                
            }
            // console.log("tableau!",tableau);
            return [true, tableau];
        }
    }
    return [false,tableau];

}

function creationTableau(all,relations,indexage)
{
    var tableau=[];
    tableau.push(all);
    // console.log("!",indexage);
    var res;
    var indAdd;
    for (var ind=0;ind<relations.length;ind++)
    {
        res=[];
        for(var i=0;i<all.length;i++)
        {
            res.push(i);
        }
        for(var ssind=0;ssind<relations[ind].length;ssind++)
        {
            for(const indice in all)
            {
                for(var ss2ind=0;ss2ind<relations[ind][ssind].length;ss2ind++)
                {
                    if(relations[ind][ssind][ss2ind]==all[indice])
                    {
                        // console.log("...",res);
                        // console.log(all[indice],res[indexage[all[indice]]]);
                        res[indexage[all[indice]]]='α'+"<sub>"+indexage[all[indice]]+"</sub>";
                        // console.log("......",res);
                    }
                }
            }
        }
        for(const elt in res)
        {
            if(Number.isInteger(res[elt]))
            {
                res[elt]='β'+"<sub>"+ind+','+elt+"</sub>";
            }
        }
        indAdd=ind+1;
        tableau.push(["R"+indAdd,res]); //+": "+relations[ind]
        
    }
    // console.log(tableau);
    return tableau;
}
function main(relations,DF)
{
    var trace=[];
    all=getAll(DF);
    indexage={}
    for(var indice=0;indice<all.length;indice++)
    {
        indexage[all[indice]]=indice;
    }
    var tableau=creationTableau(all,relations,indexage);
    var test=Chase(tableau,DF,indexage);
    trace.push([].concat(test[1]));
    var complete=false;
    // console.log("test[0]",test[0]);
    // console.log("test[1]",test[1]);
    while(test[0]&&!complete)
    {
        test=Chase(tableau,DF,indexage);
        complete=testComplete(tableau)
        // console.log("tableau",tableau);
        var recup=_.cloneDeep(test[1]);
        trace.push(recup);
    }
    return [[complete,test[1]],trace];
}


// console.log("1",main([[['A'],'B','C'],[['C'],'D','E']],
// [[['A'],['B']],[['A'],['C']],[['D'],['E']]])[0][1][2]);

// console.log("1",main([[['A'],'B','C'],[['C'],'D','E']],
// [[['A'],['B']],[['A'],['C']],[['D'],['E']]])[1]);

// console.log("----------------");

// console.log("2",main([[['A'],'B','C','F'],[['A','D'],'E'],[['B'],'D','F']],
// [[['B'],['E']], [['E','F'],['C']], [['B','C'],['A']], [['A','D'],['E']]]
// ));
