function testCleeFin(listeDepart,clee,all)
{
    var tailleListe=0;
    var listeClee=[].concat(clee);
    while (listeClee.length < all.length && tailleListe<listeClee.length)
    {
        tailleListe=listeClee.length;
        listeClee=testClee(listeDepart,listeClee);
    }
    if (listeClee.length==all.length)
    {
        return true;
    }    
    return false;
}

function creaClee(listeDepart)
{
    var listeD=[];
    var listeG=[];
    var cleInitiale=[];
    var cpt=0;
    for (const elt in listeDepart)
    {
        for (const sselt in listeDepart[elt])
        {
            if (cpt==2)
            {
                cpt=0;
            }
            for (const ss2elt in listeDepart[elt][sselt])
            {
                if (cpt==1)
                {
                    if (! listeD.includes(listeDepart[elt][sselt][ss2elt]))
                    {
                        listeD.push(listeDepart[elt][sselt][ss2elt]);
                    }
                }
                else
                {
                    if (! listeG.includes(listeDepart[elt][sselt][ss2elt]))
                    {
                        listeG.push(listeDepart[elt][sselt][ss2elt]);
                    }
                }
            
            } 
            cpt+=1;
        }
    }

    for (const elt in listeG)
    {
        if (!listeD.includes(listeG[elt]))
        {
            cleInitiale.push(listeG[elt]);
            listeD.push(listeG[elt]);
        }
    }
    /*
    for (const elt in listeG)
    {
        if (! listeD.includes(listeG[elt]))
        {
            listeD.push(listeG[elt]);
        }
    }*/
    return [cleInitiale,listeD];
}

function testClee(listeDepart,clee)
{
    var modulo2=0;
    var ind=0;
    for (const elt in listeDepart)
    {
        for (const sselt in listeDepart[elt])
        {
            if (modulo2==2)
            {
                modulo2=0;
                ind+=1;
            }
            if (modulo2 ==0)
            {
                var flag=true;
                for (const ss2elt in listeDepart[elt][sselt])
                {
                    if (! clee.includes(listeDepart[elt][sselt][ss2elt]))
                    {
                        flag=false;
                    }
                }
                if (flag)
                {
                    for (const j in listeDepart[ind][1])
                    {
                        if (! clee.includes(listeDepart[ind][1][j]))
                        {
                            clee.push(listeDepart[ind][1][j]);
                        }
                    }
                }
                
            }
            modulo2+=1;
        }
    }
    return clee;
}


function testResultats(liste)
{
    var tailleMin=liste.length*4;
    for(const elt in liste)
    {
        if (liste[elt].length<tailleMin)
        {
            tailleMin=liste[elt].length;
        }
    }
    indice=0;
    while (indice<liste.length)
    {
        if (liste[indice].length!=tailleMin)
        {
            liste.splice(indice,1);
        }
        else
        {
            indice+=1;
        }
    }
    return liste;
}

function fermetureAttribut(all,clee,listeDepart)
{
    var trace=[];
    // console.log("Clee",clee);
    var test=testCleeFin(listeDepart,clee,all);
    console.log("Test",test,clee);
    trace.push([test,clee]);
    if (test)
    {
        return [[clee],true];
    }
    else
    {
        var tableau=[];
        // console.log("Clee",clee);
        for (const elt in all)
        {
            if (!clee.includes(all[elt]))
            {
                tableau.push(clee.concat([all[elt]]));
            }
        }
        console.log("tableau",tableau);
        var Res=[];
        var vic;
        var reussit=false;
        var vic2;
        for(elt in tableau)
        {
            console.log("Res: ",testCleeFin(listeDepart,tableau[elt],all));
            vic2=testCleeFin(listeDepart,tableau[elt],all);
            if(!reussit)
            {
                reussit=vic2;
            }
            if(vic2)
            {
                Res.push([tableau[elt][0]]);
            }
        }
        if(!reussit)
        {
            for (const elt in tableau)
            {
                vic=fermetureAttribut(all,tableau[elt],listeDepart);
                Res.push(vic);
                vic=[];
            }
        }
        // testResultats(Res);
        trace.push([reussit,Res]);
        // console.log("Sérieux!",trace);
        return [Res,trace];
    }
}


    
var listeDepart1=[
    [['A','B'],['C']],
    [['D','E'],['A']]
];
    
    
var listeDepart2=[
    [['A','B'],['C','D']],
    [['A','E'],['Z','B']],
    [['A','Y'],['F']]
];
    
    
var listeDepart3=[
    [['A','B'],['E']],
    [['A','D'],['B']],
    [['B'],['C']],
    [['C'],['D']]
];
    
    
var listeDepart4=[
    [['A'],['B','C']],
    [['E'],['C','F']],
    [['B'],['E']],
    [['C','D'],['E','F']]
];
    
var listeDepart5=[
    [['A'],['C']],
    [['B'],['D']],
    [['A','C'],['D']],
    [['C','D'],['E']],
    [['E'],['A']]
];

var listeDepart6=[
    [['A','C'],['B']],
    [['A'],['C']],
    [['D'],['E']]
];

var listeDepart7=[
    [['F'],['N']],
    [['F'],['P']],
    [['P','N'],['G']],
    [['P'],['C']],
    [['P'],['T']],
    [['N'],['F']]
];
var listeDepart8=[
    [['A','C'],['B']],
    [['A'],['C']],
    [['D'],['E']]
];

// console.log(fermetureAttribut(creaClee(listeDepart1)[1],creaClee(listeDepart1)[0],listeDepart1));
// console.log(fermetureAttribut(creaClee(listeDepart2)[1],creaClee(listeDepart2)[0],listeDepart2));
// console.log(fermetureAttribut(creaClee(listeDepart3)[1],creaClee(listeDepart3)[0],listeDepart3));
// console.log(fermetureAttribut(creaClee(listeDepart4)[1],creaClee(listeDepart4)[0],listeDepart4));
// console.log(fermetureAttribut(creaClee(listeDepart5)[1],creaClee(listeDepart5)[0],listeDepart5));
// console.log(fermetureAttribut(creaClee(listeDepart6)[1],creaClee(listeDepart6)[0],listeDepart6));
// console.log(fermetureAttribut(creaClee(listeDepart7)[1],creaClee(listeDepart7)[0],listeDepart7));
// console.log(creaClee(listeDepart7));
// console.log(fermetureAttribut(creaClee(listeDepart8)[1],creaClee(listeDepart8)[0],listeDepart8));
// console.log(creaClee(listeDepart8));
