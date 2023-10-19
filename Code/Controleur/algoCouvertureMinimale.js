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
    console.log("Clee",clee);
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
        // console.log("SÃ©rieux!",trace);
        return [Res,trace];
    }
}


function testFermeture(partieG, DF)
{
    // console.log("TestFermeture",DF,partieG);
    console.log("DF",DF);
    console.log("PartieG",partieG);
    var fermetureFinale=[];
    var i=0;
    var modif;
    var allPresent;
    var present;
    while(i<DF.length)
    {
        modif=false;
        allPresent=true;
        // console.log("FD[i]",DF[i][0]);
        for(elt in DF[i][0])
        {
            // console.log("DF[i][0]",DF[i][0][elt])
            present=false;
            for(elt2 in partieG)
            {
                // console.log("Equal?",DF[i][0][elt],partieG[elt2])
                if(DF[i][0][elt]==partieG[elt2])
                {
                    present=true;
                }
            }
            // console.log("present",present);
            if(!present)
            {
                allPresent=false;
            }
        }
        // console.log("allPresent",allPresent);
        if(allPresent)
        {
            for(elt in DF[i][0])
            {
                if(fermetureFinale.length==0)
                {
                    fermetureFinale.push(DF[i][1][0]);
                    if(!partieG.includes(DF[i][1][0]))
                    {
                        partieG.push(DF[i][1][0]);
                    }
                    modif=true;
                }
                else if(!fermetureFinale.includes(DF[i][1][0]))
                {
                    fermetureFinale.push(DF[i][1][0]);
                    partieG.push(DF[i][1][0]);
                    modif=true;
                }
            }
        }
        i++;
        if(modif)
        {
            i=0;
        }
    }
    return fermetureFinale;
}

function testClee(listeDepart,clee)
{
    var modulo2=0;
    var ind=0;
    var tailleClee=clee.length;
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
    if(tailleClee<clee.length)
    {
        // console.log("Hey??");
        testClee(listeDepart,clee);
    }
    return clee;
}


function eclatementDroite(liste)
{
    var indice=0;
    var taille=liste.length;
    while (indice<taille)
    {
        //console.log("indice",indice);
        //Check les elements un par un et les ajouter a la fin de la liste avec la m partie gauche.
        if (liste[indice][1].length!=1)
        {
            //console.log("[DEBUG]",all[indice]);
            //console.log("avant for",all);
            for (const ajout in liste[indice][1])
            {
                //console.log(all[indice][1][ajout],"\t",all[indice][0]);
                liste.push([liste[indice][0],[liste[indice][1][ajout]]]);
            }
            //console.log("apres for",all,indice,all[indice]);
            liste.splice(indice,1);
            //console.log("apres splice",all);
            taille-=1;
        }
        else
        {
            indice+=1;
        }
    }
    console.log("liste",liste);
    return liste;
}

function EliminationGauche(liste,all)
{
    console.log("LISTE",liste);
    console.log("CREACLE",creaClee(liste));
    var resultatFermeture=fermetureAttribut(creaClee(liste)[1],creaClee(liste)[0],liste)[0]
    var partieGminimale=[];
    var listeRecup; 
    var print;
    for (const elt in liste)
    {
        console.log("[...]",liste[elt]);
        if(liste[elt][0].length>1)
        {
            listeRecup=[];
            var hash ={};
            var essentiel;
            for(const elt2 in liste[elt][0])
            {
                var partieDroite=liste[elt][1][0];
                console.log("Partie droite",partieDroite);
                essentiel=false;
                var NvlListeG=[]
                for(const elt3 in liste[elt][0])
                {
                    if(liste[elt][0][elt3]!=liste[elt][0][elt2] && !hash[liste[elt][0][elt3]])
                    {
                        NvlListeG.push(_.cloneDeep(liste[elt][0][elt3]));
                    }
                }
                console.log("NvlListeG",NvlListeG);
                console.log("liste",liste);
                console.log("Fermeture de ",NvlListeG);
                var fermeture=testFermeture(NvlListeG,liste);
                console.log("fermeture",fermeture);
                console.log("partie droite, fermeture",partieDroite,fermeture,!fermeture.includes(partieDroite));
                print=_.cloneDeep(listeRecup);
                console.log("Liste Recup",print);
                if(fermeture.length==0 || !fermeture.includes(partieDroite))
                {
                    console.log("If, listeRecup",liste[elt2][0]);
                    listeRecup.push(_.cloneDeep(liste[elt2][0]));
                    print=_.cloneDeep(listeRecup);
                    console.log("liste Recup",print);
                    essentiel=true;
                }
                print=_.cloneDeep(listeRecup);
                console.log("Liste Recup",print);
                if(!essentiel)
                {
                    console.log("Tu ne sers Ã  rien!!",fermeture);
                    hash[liste[elt][0][elt2]]=liste[elt][0][elt2];
                }
            }
            print=_.cloneDeep(listeRecup);
            console.log("IF","liste Recup",print);
            console.log("liste",liste[elt]);
            if(listeRecup.length<liste[elt].length)
            {
                console.log("Hey",listeRecup);
                console.log("WTF???",listeRecup.length!=0);
                if(listeRecup.length!=0)
                {
                    console.log("Hey???");
                    var Recuperation=_.cloneDeep(listeRecup);
                    console.log("Liste Recup",listeRecup);
                    var DFTest=[];
                    for(const eltListe in listeRecup)
                    {
                        if(eltListe==0)
                        {
                            DFTest=[listeRecup[eltListe][0],liste[elt][1]];
                        }
                    }
                    DFTest[0]=[DFTest[0]];
                    // DFTest=[listeRecup[0],liste[elt][1]];
                    // console.log("DFTest",DFTest);
                    var liste2=_.cloneDeep(liste);
                    // liste2.push(DFTest);
                    // console.log("PartieGDF",DFTest[0]);
                    var verif=testFermeture([DFTest[0]],liste2);
                    // console.log("Verif",verif);
                    for(const element in verif)
                    {
                        console.log("FOR",verif[element],DFTest[1]);

                        if(verif[element]==DFTest[1][0])
                        {
                            var flag=false;
                            console.log("partieGminimale",partieGminimale);
                            for(const element2 in partieGminimale)
                            {
                                console.log("FOR2",partieGminimale[element2],DFTest);
                                if(partieGminimale[element2]==DFTest)
                                {
                                    flag=true;
                                }
                            }
                            console.log("flag",flag);
                            if(!flag)
                            {
                                partieGminimale.push(_.cloneDeep(DFTest));
                            }
                            console.log("PartieGMin2",partieGminimale);
                        }
                    }
                }
            }
            else
            {
                var flag=false;
                for(const element2 in partieGminimale)
                {
                    if(partieGminimale[element2]==liste[elt])
                    {
                        flag=true;
                    }
                }
                if(!flag)
                {
                    partieGminimale.push(_.cloneDeep(liste[elt]));
                }
            }
        }
        else
        {
            var flag=false;
            for(const element2 in partieGminimale)
            {
                if(partieGminimale[element2]==liste[elt])
                {
                    flag=true;
                }
            }
            if(!flag)
            {
                partieGminimale.push(_.cloneDeep(liste[elt]));
            }
        }
    }
    console.log("PartieGMin",partieGminimale);
    for(const element3 in partieGminimale)
    {
        liste.push(_.cloneDeep(partieGminimale[element3]));
    }
    // console.log("ElimG",liste);
    return partieGminimale;
}

function redondance(liste)
{
    var i=0;
    var i2;
    var i3;
    var flag;
    var i4;
    var test;
    while (i<liste.length)
    {
        i2=0;
        //console.log("............................",liste[i]);
        while (i2<liste.length)
        {
            if (liste[i][1][0]==liste[i2][1][0] && liste[i][0].length==liste[i2][0].length && i!=i2)
            {
                //console.log("AH... Ouf",liste[i2]);
                flag=true;
                i3=0;
                while(flag & i3<liste[i][0].length)
                {
                    test=false;
                    i4=0;
                    while (!test && i4<liste[i2][0].length)
                    {
                        if(liste[i2][0][i4]==liste[i][0][i3])
                        {
                            test=true;
                        }
                        i4+=1;
                    }
                    flag=test;
                    i3+=1;
                }
                if(flag)
                {
                    //console.log("suppression de :",liste[i2]);
                    liste.splice(i2,1);
                }
            }
            i2+=1;
        }
        i+=1;
    }
    console.log("redondance",liste);
}

function couvertureMinimale(liste)
{
    var trace=[];
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
    //console.log("allForOne:",all);
    var resultat=eclatementDroite(liste);
    trace.push(_.cloneDeep(resultat));
    var liste2=_.cloneDeep(liste);
    var ElimG=EliminationGauche(liste2,all);
    console.log(ElimG);
    trace.push(_.cloneDeep(ElimG));
    redondance(ElimG);
    trace.push(_.cloneDeep(ElimG));
    return [ElimG,trace];
    // return liste;
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
    [['A','B','C','D'],['C']],
    [['B'],['D']],
    [['A','C'],['D']],
    [['C','D'],['E']],
    [['E'],['A']],
    [['E'],['A']],
    [['C','A'],['D']]
];

var listeDepart7=[
  [['F'],['N','P']],
  [['P','N'],['G']],
  [['P'],['C','T']],
  [['N'],['F']]  
];

var listeDepart9=[
    [['A','C'],['B']],
    [['A'],['C']],
    [['D'],['E']]
];

// console.log("9",couvertureMinimale(listeDepart9)[0]);
// console.log("9",couvertureMinimale(listeDepart9)[1][0]);
// console.log("9",couvertureMinimale(listeDepart9)[1][1]);
// console.log("9",couvertureMinimale(listeDepart9)[1][2]);
// console.log("2",couvertureMinimale(listeDepart2));
// console.log("3",couvertureMinimale(listeDepart3));
// console.log("4",couvertureMinimale(listeDepart4));
// console.log("5",couvertureMinimale(listeDepart5));
// console.log("6",couvertureMinimale(listeDepart6));
// console.log("7",couvertureMinimale(listeDepart7));
//console.log("8",couvertureMinimale(listeDepart7));