

var tableauDesDF = [];
var tableauDesCM = [];
var tableauDesR = [];
var tableauDesA = [];
var cptAffichageExplicationsCouverture = 0;
var cptAffichageExplicationsFermeture = 0;
var cptAffichageExplicationsSynthese = 0;
var cptAffichageExplications2FN = 0;
var cptAffichageExplications3FN = 0;
var cptAffichageExplicationsChase = 0;
var cptResultat = 0;
var nouveauLabel = 1;
var nouveauxId = 1;
var listeFermeture = [];
var listeSynthese = [];
var listeFN2 = [];
var listeFN3 = [];
var tableChase = [];
var couvMinCalculee = false;
var algoSyntheseCalcule = false; 

//page accueil = 0, forumulaire = 1, couverture = 2, fermeture = 3, FN = 4, synthèse = 5, chase = 6
var pageMenuActuelle = 0;

function afficherExplications() {
    var divCouverture = document.getElementById("explicationsCouvMin");
    var divFermeture = document.getElementById("explicationsFermAtt");
    var divSynthe = document.getElementById("explicationsSynthe");
    var divFN2 = document.getElementById("explicationsFN2");
    var divFN3 = document.getElementById("explicationsFN3");
    var divChase = document.getElementById("explicationsChase");

    if (cptAffichageExplicationsCouverture == 0) {
        divCouverture.insertAdjacentHTML('beforeend', '<p>'     
                                                            + " Pour commencer, voici notre algorithme de couverture " + '</br>'
                                                            + "<img src='../../Ressources/algoCM.png'></img>" + '</br>'
                                                            + " Etape 1: On commence par décomposer les parties droites des DF composées de plusieurs attributs" + '</br>'
                                                            + "<img src='../../Ressources/algoED.png'></img>" + '</br>'
                                                            + " Etape 2: On élimine les attributs inutiles à gauche en testant leurs fermetures." + '</br>'
                                                            + "<img src='../../Ressources/algoEG.png'></img>" + '</br>'
                                                            + " Etape 3: On supprime DF rédondante en vérifiant leur reflexivité." + '</br>'
                                                            + "<img src='../../Ressources/algoRD.png'></img>" + '</br>'
                                                            + " Ainsi, on arrive à un sous-ensemble de DF permettant de générer " + '</br>'+ "toutes les autres." + '</br>'
                                                            + '</p>');
        cptAffichageExplicationsCouverture = 1;
    }
    if (cptAffichageExplicationsFermeture == 0) {
        divFermeture.insertAdjacentHTML('beforeend', '<p>'  
                                                           
                                                            + " Etape 1: On commence par initialiser X+ à X. Une" + '</br>' 
                                                            + " Etape 2: On cherche une DF  qui appartient à la liste des DF qui à une partie gauche inclue dans X+" + '</br>' 
                                                            + " Etape 3: On ajoute dans X+ les attributs de droite " + '</br>' 
                                                            + " Etape 4: On répète jusqu’à ce que X+ n’évolue plus" + '</br>' 
                                                            + " On obtiens donc l'algorithme de Fermeture d'attributs suivant: " + '</br> </br>' 
                                                            + "<img src='../../Ressources/algoFA.png'></img>" + '</br>'
                                                            + "<img src='../../Ressources/algoTCF.png'></img>" + '</br>'
                                                            + "<img src='../../Ressources/algoCC.png'></img>" + '</br>' 
                                                            + "<img src='../../Ressources/algoTC.png'></img>" + '</br>'
                                                            + '</p>');
        cptAffichageExplicationsFermeture = 1;
    }
    if (cptAffichageExplicationsSynthese == 0) {
        divSynthe.insertAdjacentHTML('beforeend', '<p>'     
                                                            + " Prérequis: Avoir une Couverture minimale" + '</br>' 
                                                            + " Voila notre algorithme de Synthèse" + '</br>' 
                                                            + "<img src='../../Ressources/algoS.png'></img>" + '</br>'
                                                            + " Etape 1: On regroupe dans des Ensembles les différentes DF en fonction de leurs partie gauche" + '</br>' 
                                                            + "<img src='../../Ressources/algoCE.png'></img>" + '</br>'
                                                            + " Etape 2: On réalise l'union des ensembles contenant des DF reflexives" + '</br>' 
                                                            + "<img src='../../Ressources/algoR.png'></img>" + '</br>' 
                                                            + " Enfin on crée nos relations à partir des ensembles crées, "+ '<br/>' 
                                                            + " la clé de ces relation est la partie gauche par laquelle ces ensembles ont été crées" + '</br>' 
                                                            + '</p>');
        cptAffichageExplicationsSynthese = 1;
    } 
    if (cptAffichageExplications2FN == 0) {
        divFN2.insertAdjacentHTML('beforeend', '<p>'        
                                                            + " Prérequis: Etre en 1FN, " + '</br>' 
                                                            + " Verification: Ne pas avoir de DF avec une partie de la clé vers un attribut non clé" + '</br>'
                                                            + "<img src='../../Ressources/algo2FN.png'></img>" + '</br>'
                                                            + "<img src='../../Ressources/algoI2.png'></img>" + '</br>'
                                                            + '</p>');
        cptAffichageExplications2FN = 1;
    } 
    if (cptAffichageExplications3FN == 0) {
        divFN3.insertAdjacentHTML('beforeend', '<p>' 
                                                            + " Prérequis: Etre en 2FN, " + '</br>' 
                                                            + " Verification: Ne contient pas de DF transitive entre attributs non clés" + '</br>'
                                                            + "<img src='../../Ressources/algo3FN.png'></img>" + '</br>'
                                                            + "<img src='../../Ressources/algoI3.png'></img>" + '</br>'
                                                            + "<img src='../../Ressources/algoII.png'></img>" + '</br>'
                                                            + '</p>');
        cptAffichageExplications3FN = 1;
    } 
    if (cptAffichageExplicationsChase == 0) {
        divChase.insertAdjacentHTML('beforeend', '<p>'  
                                                            + "Etape 1: Création du tableau" + '</br>' 
                                                            + "Lignes: Relations " + '</br>' 
                                                            + "Colonnes: Attributs. " + '</br>' 
                                                            + "Remplir à l'intersection entre chaque L/C αi si Ai appartient à Rj" + '</br>' 
                                                            + "Remplir à l'intersection entre chaque L/C βj,i sinon" + '</br>' 
                                                            + "Où i est le numéro de la colonne et j est le numéro de la ligne " + '</br> </br>'  
                                                            + "Etape 2: Unification " + '</br>'
                                                            + "On examine les DF du tableau" + '</br>'
                                                            + "Si DF non vérifié, on unifie les valeurs de la cible" + '</br>'
                                                            + "Si une des valeurs est  αi et les autres des βj,i ->" + '</br>'
                                                            + "On remplace βj,i par αi" + '</br> </br>'
                                                            + "Etape 3: Validation" + '</br>'
                                                            + "Si au moins une ligne ne comporte que des α, la décompostion est sans perte d'Information" + '</br>'
                                                            + "Sinon elle est avec perte" + '</br> </br>'
                                                            + "Soit les algorithmes suivants détaillant notre démarche : " + '</br> '
                                                            + "<img src='../../Ressources/algoChase.png'></img>" + '</br>'
                                                            + "<img src='../../Ressources/algoGA.png'></img>" + '</br>'
                                                            + "<img src='../../Ressources/algoTCC.png'></img>" + '</br>' 
                                                            + "<img src='../../Ressources/algoCHA.png'></img>" + '</br>'
                                                            + "<img src='../../Ressources/algoCT.png'></img>" + '</br>'
                                                            + '</p>');
        cptAffichageExplicationsChase = 1;
    } 
}


function afficheAtom(div, nb){
    document.getElementById(div).innerHTML = '';
    var listAtom = tableauDesA;
    for (var i = 0; i < listAtom.length; i++) {
        document.getElementById(div).innerHTML = '[' + listAtom + ']';
    }

    if (listAtom.length != 0)  {
        document.getElementById(("ZoneTxt" + nb)).innerHTML = "<p style=" + '"' + "text-decoration: underline" + '"' + ">Attributs : </br> </p>";
    }
        
}


function afficherGraphe(bool, svg)
{
    if(!bool)
    {
        supprimerGraphe(svg);
    }
    else
    {
        console.log("??");
        var affichage=Graphe(tableauDesDF,tableauDesR,svg);
        console.log("...");
    }
}


function supprimerGraphe(svg)
{
    document.getElementById(svg).innerHTML='';
}


function afficherTraceCouverture() {
    document.getElementById("traceCouvMin").innerHTML='';
    for (var i = 0; i < tableauDesCM[1].length; i++) 
    {
        if (i==0)
        {
            document.getElementById("traceCouvMin").insertAdjacentHTML('beforeend', "Eclatement à droite"+ "</br>");
        }
        else if(i==1)
        {
            document.getElementById("traceCouvMin").insertAdjacentHTML('beforeend', "Elimination gauche"+ "</br>");
        }
        else
        {
            document.getElementById("traceCouvMin").insertAdjacentHTML('beforeend', "Redondance"+ "</br>");
        }
        for(var j=0; j<tableauDesCM[1][i].length;j++)
        {
            document.getElementById("traceCouvMin").insertAdjacentHTML('beforeend', tableauDesCM[1][i][j][0] + ' -> ' + tableauDesCM[1][i][j][1] + "</br>");
        }
    }
}


function afficherResultatCouverture() {
    var listeCouverture= _.cloneDeep(tableauDesDF);
    tableauDesCM= _.cloneDeep(couvertureMinimale(listeCouverture));
    document.getElementById("CouvMin").innerHTML = '';

    if (listeCouverture.length != 0)  {
        document.getElementById("ZoneEcritureCouv").innerHTML = "Couverture minimale : ";
    }

    for (var i = 0; i < tableauDesCM[0].length; i++) {
        document.getElementById("CouvMin").insertAdjacentHTML('beforeend', tableauDesCM[0][i][0] + ' -> ' + tableauDesCM[0][i][1] + "</br>");
    }

    couvMinCalculee = true;
}


function afficherTraceFermetureAttr()
{
    document.getElementById("traceFermAttr").innerHTML='';
    console.log("Liste Fermeture...",listeFermeture);
    var all=[];
    for (const elt in tableauDesDF)
    {
        for (const element in tableauDesDF[elt])
        {
            for (const elt2 in tableauDesDF[elt][element])
            {
                if (!all.includes(tableauDesDF[elt][element][elt2]))
                {
                    all.push(tableauDesDF[elt][element][elt2]);
                }
            }
        }
    }
    console.log(all);
    if(Array.isArray(listeFermeture[1]))
    {
        if (!listeFermeture[1][0][0])
        {
            if(listeFermeture[1][0][1]!=[])
            {
                var speech="On a donc pas de fermeture avec cette clee: [";
                for(const elt in listeFermeture[1][0][1])
                {
                    speech+=listeFermeture[1][0][1][elt];
                    if(elt<listeFermeture[1][0][1].length-1)
                    {
                        speech+=", ";
                    }
                }
                speech+=']';
                document.getElementById("traceFermAttr").insertAdjacentHTML('beforeend', speech+ "</br>");
            }
            else
            {
                var speech="On a donc pas de fermeture, car on n'a pas de clee initiale (tout les éléments sont à droite et à gauche, ou juste à droite";
                document.getElementById("traceFermAttr").insertAdjacentHTML('beforeend', speech+ "</br>");
            }
            for(var i=1;i<listeFermeture[1].length;i++)
            {
                if(listeFermeture[1][i][0])
                {
                    var speech="<br>"+"On a une fermeture minimale avec ";
                    console.log("Ah bon??",listeFermeture[1][i][1]);
                    speech+=Array.isArray(listeFermeture[1][i][1])?"ces clees: [":"cette clee: ";
                    for(elt in listeFermeture[1][i][1])
                    {
                        speech+='[';
                        for(var j=0;j<listeFermeture[1][i][1][elt].length;j++)
                        {
                            speech+=listeFermeture[1][i][1][elt][j];
                            if(j<listeFermeture[1][i][1][elt][j].length-1)
                            {
                                speech+=", ";
                            }
                        }
                        speech+=']';
                        if(elt<listeFermeture[1][i][1].length-1)
                        {
                            speech+=", ";
                        }
                    }
                    speech+=listeFermeture[1][i][1].length>1?']':'';
                    document.getElementById("traceFermAttr").insertAdjacentHTML('beforeend', speech+ "</br>");
                    speech="Car, "+"</br>";
                    console.log("Fermeture",listeFermeture[1]);
                    for(elt in listeFermeture[1][i][1])
                    {
                        if(listeFermeture[1][i])
                        {
                            speech+='[';
                            for(var j=0;j<listeFermeture[1][i][1][elt].length;j++)
                            {
                                speech+=listeFermeture[1][i][1][elt][j];
                            }
                            speech+=']'+"<sup>+</sup>";
                            speech+="={"+all.join(',')+"}";
                            if(elt<listeFermeture[1][i][1].length-1)
                            {
                                speech+="</br>";
                            }
                        }
                    }
                    console.log(speech);
                    document.getElementById("traceFermAttr").insertAdjacentHTML('beforeend', speech+ "</br>");
                }
            }
        }
    }
    else
    {
        var speech="On a directement cette clee : [";
        for(var i=0;i<listeFermeture[0].length;i++)
        {
            speech+=listeFermeture[0][i];
            if(i<listeFermeture[0].length-1)
            {
                speech+=", ";
            }
        }
        speech+=']';
        document.getElementById("traceFermAttr").insertAdjacentHTML('beforeend', speech+ "</br>");
        speech="Car, "+"</br>";
        speech+='['+listeFermeture[0].join(',')+"]<sup>+</sup>";
        speech+="={"+all.join(',')+'}';
        document.getElementById("traceFermAttr").insertAdjacentHTML('beforeend', speech+ "</br>");
    }
};


function afficherResultatFermeture() {
    var tabFerm= [];
    tabFerm = _.cloneDeep(tableauDesDF);
    listeFermeture = fermetureAttribut(creaClee(tabFerm)[1], creaClee(tabFerm)[0], tabFerm);
    document.getElementById("FermetureAtt").innerHTML = '';

    if (tabFerm.length != 0)  {
        document.getElementById("ZoneEcritureFermeture").innerHTML = "Fermeture attributs : ";
    
    
    for (var i = 0; i < listeFermeture[0].length; i++) {
        if (listeFermeture[0].length > 1) {
            document.getElementById("FermetureAtt").insertAdjacentHTML('beforeend', '[' + listeFermeture[0][i] + ']');
        } else {
            document.getElementById("FermetureAtt").insertAdjacentHTML('beforeend', '[' + listeFermeture[0][0] + ']');
        }
        if(i<listeFermeture[0].length-1)
        {
            document.getElementById("FermetureAtt").insertAdjacentHTML('beforeend', ',');
        }
    }
}

};


function afficherTraceSynthese() {
    document.getElementById("TraceSynthese").innerHTML = '';
    var indice;
    var affich;
    for (var k=0;k<listeSynthese[1].length;k++)
    {
        if(k==0)
        {
            document.getElementById("TraceSynthese").insertAdjacentHTML('beforeend', "Création des ensembles" + "</br>");
        }
        else
        {
            document.getElementById("TraceSynthese").insertAdjacentHTML('beforeend', "<br>"+"Synthèse: Fusion des ensembles avec reflexivités" + "</br>");
        }
        for (var i = 0; i < listeSynthese[1][k].length; i++) {
            if(k==0)
            {
                indice = 'E' + (i+1);
                 affich = '(' + '[' + listeSynthese[1][k][i][0] + ']';
                for (var j = 1; j < listeSynthese[1][k][i].length; j++) 
                {
                    affich = affich + ','+listeSynthese[1][k][i][j];
                }
            }
            else
            {
                indice = 'R' + (i+1);
                affich = '(' + '[' + listeSynthese[1][k][i][0] + ']';
                for (var j = 1; j < listeSynthese[1][k][i].length; j++) 
                {
                    affich = affich + ','+listeSynthese[1][k][i][j];
                }
            }
            document.getElementById("TraceSynthese").insertAdjacentHTML('beforeend', indice + ': ' + affich + ')' + "</br>");
        }
    }
};



function afficherResultatSynthese() {
    var CM0=_.cloneDeep(tableauDesCM[0]);
    listeSynthese = algoSynthese(CM0);
    tableauDesR= _.cloneDeep(listeSynthese[0]);
    document.getElementById("Synthese").innerHTML = '';

    if (tableauDesR.length != 0)  {
        document.getElementById("ZoneEcritureSynthese").innerHTML = "Relations : ";
    }

    for (var i = 0; i < listeSynthese[0].length; i++) {
        var indice = 'R' + (i+1);
        var affich = '(' + '[' + listeSynthese[0][i][0] + ']';
        for (var j = 1; j < listeSynthese[0][i].length; j++) {
            affich = affich + ','+listeSynthese[0][i][j];
        }
        document.getElementById("Synthese").insertAdjacentHTML('beforeend', indice + ': ' + affich + ')' + "</br>");
    }

    algoSyntheseCalcule = true;
}

function afficherTraceFN2(){
    console.log("FN2",listeFN2[1]);
    //var listeCouverture = couvertureMinimale(tableauDesDF);
    var decalage=1;
    document.getElementById("trace2FN").innerHTML = '';
    var speech;

    for (var i = 0; i < listeFN2[1].length; i++) {
        if(listeFN2[1][i][0])
        {
            speech="La relation "+'R' + (i+1);
            var affichTrace = '(' + '[' + listeFN2[1][i][1][0] + ']';
            for (var j = 1; j < listeFN2[1][i][1].length; j++) {
                affichTrace = affichTrace + ','+listeFN2[1][i][1][j];
            }
            affichTrace+=')';
            affichTrace+=" est déjà en FN2";
            document.getElementById("trace2FN").insertAdjacentHTML('beforeend', speech + ': ' + affichTrace  + "</br>");
        }
        else
        {
            var speech="La relation ";
            var indiceS = 'R' + (i+1);
            var affichS = '(' + '[' + listeFN2[1][i][1][0][0] + ']';
            // console.log("Test",listeFN3[1][i][1]);
            for (var j = 1; j < listeFN2[1][i][1].length; j++) {
                affichS = affichS + ','+listeFN2[1][i][1][j];
            }
            affichS +=')';
            speech+=indiceS+": "+affichS+" n'est pas en FN2, donc on doit décomposer:"+"</br>";
            document.getElementById("trace2FN").insertAdjacentHTML('beforeend', speech);

            //New R1
            console.log("AHHHHH",listeFN2[1][i][2]);
            for(var j=0;j<2;j++)
            {
                var indice = 'R' + (i+1);
                var affich = '(' + '[' + listeFN2[1][i][2][0][0] + ']';
                for (var k = 1; k < listeFN2[1][i][2][0].length; k++) {
                    affich = affich + ','+listeFN2[1][i][2][0][k];
                }
            }
            document.getElementById("trace2FN").insertAdjacentHTML('beforeend', indice + ": " + affich + ')' + "</br>");

            //New R2
            for(var j=0;j<2;j++)
            {
                var indice = 'R' + (i+2);
                var affich = '(' + '[' + listeFN2[1][i][2][j][0] + ']';
                for (var k = 1; k < listeFN2[1][i][2][j].length; k++) {
                    affich = affich + ','+listeFN2[1][i][2][j][k];
                }
            }
            document.getElementById("trace3FN").insertAdjacentHTML('beforeend', indice + ": " + affich + ')' + "</br>");
        }
    }
}



function afficherResultatFN2() {
    var listeSynthese = algoSynthese(tableauDesCM[0]);
    listeFN2 = FN2(listeSynthese[0],tableauDesCM[0]);

   document.getElementById("FN2").innerHTML = '';

    if (listeSynthese.length != 0)  {
        document.getElementById("ZoneEcritureFN2").innerHTML = "FN2 : ";
    }

    for (var i = 0; i < listeFN2[0].length; i++) {
        var indice = 'R' + (i+1);
        var affich = '(' + '[' + listeFN2[0][i][0] + ']';
        for (var j = 1; j < listeFN2[0][i].length; j++) {
            affich = affich + ','+listeFN2[0][i][j];
        }
        document.getElementById("FN2").insertAdjacentHTML('beforeend', indice + ': ' + affich + ')' + "</br>");
}
return listeFN2;
}

function afficherTraceFN3(){
    console.log("FN3",listeFN3[1]);
    document.getElementById("trace3FN").innerHTML = '';

    for (var i = 0; i < listeFN3[1].length; i++) {
        if(listeFN3[1][i][0])
        {
            var speech="La relation "+'R' + (i+1);
            var affich = '(' + '[' + listeFN3[1][i][1][0][0] + ']';
            for (var j = 1; j < listeFN3[1][i][1][0].length; j++) {
                affich = affich + ','+listeFN3[1][i][1][0][j];
            }
            document.getElementById("trace3FN").insertAdjacentHTML('beforeend', speech + ": " + affich + ')'+ " est déjà en FN3"+ "</br>");
        }
        else
        {
            var speech="La relation ";
            var indiceS = 'R' + (i+1);
            var affichS = '(' + '[' + listeFN3[1][i][1][0][0] + ']';
            // console.log("Test",listeFN3[1][i][1]);
            for (var j = 1; j < listeFN3[1][i][1].length; j++) {
                affichS = affichS + ','+listeFN3[1][i][1][j];
            }
            affichS +=')';
            speech+=indiceS+": "+affichS+" n'est pas en FN3, donc on doit décomposer:"+"</br>";
            document.getElementById("trace3FN").insertAdjacentHTML('beforeend', speech);

            //New R1
            console.log("AHHHHH",listeFN3[1][i][2]);
            for(var j=0;j<2;j++)
            {
                var indice = 'R' + (i+1);
                var affich = '(' + '[' + listeFN3[1][i][2][0][0] + ']';
                for (var k = 1; k < listeFN3[1][i][2][0].length; k++) {
                    affich = affich + ','+listeFN3[1][i][2][0][k];
                }
            }
            document.getElementById("trace3FN").insertAdjacentHTML('beforeend', indice + ": " + affich + ')' + "</br>");

            //New R2
            for(var j=0;j<2;j++)
            {
                var indice = 'R' + (i+2);
                var affich = '(' + '[' + listeFN3[1][i][2][j][0] + ']';
                for (var k = 1; k < listeFN3[1][i][2][j].length; k++) {
                    affich = affich + ','+listeFN3[1][i][2][j][k];
                }
            }
            document.getElementById("trace3FN").insertAdjacentHTML('beforeend', indice + ": " + affich + ')' + "</br>");
        }
    }
}



function afficherResultatFN3(FN2) {
    listeFN3 = FN3(FN2[0],tableauDesCM[0]);
    tableauDesR = listeFN3[0];

    document.getElementById("FN3").innerHTML = '';

    if (listeSynthese.length != 0)  {
        document.getElementById("ZoneEcritureFN3").innerHTML = "FN3 : ";
    }

    for (var i = 0; i < listeFN3[0].length; i++) {
        var indice = 'R' + (i+1);
        var affich = '(' + '[' + listeFN3[0][i][0] + ']';
        for (var j = 1; j < listeFN3[0][i].length; j++) {
            affich = affich + ','+listeFN3[0][i][j];
        }
        document.getElementById("FN3").insertAdjacentHTML('beforeend', indice + ': ' + affich + ')' + "</br>");
}
}

function afficheTraceChase(){
    console.log("Chase 2",tableChase[1]);
    document.getElementById("traceChase").innerHTML = '';
    if(tableChase[1].length!=1)
    {
        for (var k=1;k<tableChase[1].length;k++)
        {
            console.log("numero ",k, "/",tableChase[1].length);
            document.getElementById("traceChase").insertAdjacentHTML('beforeend',"Tour numéro "+k+"<br>");
            var tableau="<table class='tableau'>";
            for(var i=0;i<tableChase[1][k].length;i++)
            {
                tableau+="<tr>";
                if(i==0)
                {
                    tableau+="<td>\u00a0\u00a0\u00a0</td>";
                }
                for(var j=0;j<tableChase[1][k][i].length;j++)
                {
                    if(i==0)
                    {
                        tableau+="<td>"+tableChase[1][k][i][j]+"</td>";
                    }
                    else
                    {
                        if(j==0)
                        {
                            tableau+="<td>"+tableChase[1][k][i][j]+"</td>";
                        }
                        else
                        {
                            for(var l=0;l<tableChase[1][k][i][j].length;l++)
                            {
                                tableau+="<td>"+tableChase[1][k][i][j][l]+"</td>";
                            }
                        }
                    }
                }
                tableau+="</tr>";
            }
            tableau+="</table>";
            document.getElementById("traceChase").insertAdjacentHTML('beforeend',tableau+"<br>");
        }
    }
    else
    {
        for (var k=0;k<tableChase[1].length;k++)
        {
            console.log("numero ",k, "/",tableChase[1].length);
            document.getElementById("traceChase").insertAdjacentHTML('beforeend',"Tour numéro "+(k+1)+"<br>");
            var tableau="<table class='tableau'>";
            for(var i=0;i<tableChase[1][k].length;i++)
            {
                tableau+="<tr>";
                if(i==0)
                {
                    tableau+="<td>\u00a0\u00a0\u00a0</td>";
                }
                for(var j=0;j<tableChase[1][k][i].length;j++)
                {
                    if(i==0)
                    {
                        tableau+="<td>"+tableChase[1][k][i][j]+"</td>";
                    }
                    else
                    {
                        if(j==0)
                        {
                            tableau+="<td>"+tableChase[1][k][i][j]+"</td>";
                        }
                        else
                        {
                            for(var l=0;l<tableChase[1][k][i][j].length;l++)
                            {
                                tableau+="<td>"+tableChase[1][k][i][j][l]+"</td>";
                            }
                        }
                    }
                }
                tableau+="</tr>";
            }
            tableau+="</table>";
            document.getElementById("traceChase").insertAdjacentHTML('beforeend',tableau+"<br>");
        } 
    }

}


function afficherResultatChase(){
    tableChase=main(tableauDesR,tableauDesCM[0]);
    document.getElementById("Chase").innerHTML = '';

    if (tableChase.length != 0) {

        document.getElementById("ZoneEcritureChase").innerHTML = "Algorithme de Chase : ";

    if(tableChase[0][0]==true){
        var affich = "La modélisation et sans pertes d'informations !" +"</br>";
    }
    else{ var affich = "La modélisation comporte une perte d'information !" +"</br>";}
    document.getElementById("Chase").insertAdjacentHTML('beforeend',  affich + "</br>");

    var tableau="<table class='tableau'>";
    for(var i=0;i<tableChase[0][1].length;i++)
    {
        tableau+="<tr>";
        if(i==0)
        {
            tableau+="<td>\u00a0\u00a0\u00a0</td>";
        }
        for(var j=0;j<tableChase[0][1][i].length;j++)
        {
            if(i==0)
            {
                tableau+="<td>"+tableChase[0][1][i][j]+"</td>";
            }
            else
            {
                if(j==0)
                {
                    tableau+="<td>"+tableChase[0][1][i][j]+"</td>";
                }
                else
                {
                    console.log("!!!",tableChase[0][1][i][j]);
                    for(var k=0;k<tableChase[0][1][i][j].length;k++)
                    {
                        tableau+="<td>"+tableChase[0][1][i][j][k]+"</td>";
                    }
                }
            }
        }
        tableau+="</tr>";
    }
    tableau+="</table>";
    document.getElementById("Chase").insertAdjacentHTML('beforeend',tableau+"<br>");
    }

}



function ajouterZoneDf(numLabel) {

    var divZoneDF = document.getElementById("label" + numLabel);

    divZoneDF.insertAdjacentHTML('afterend', '<label id="label' + nouveauLabel + '"><br><input id="df' + (nouveauxId + 1) + '" type="text" pattern="[A-Za-z0-9-,]+" onchange="alterteRafraichissement()"><label id="label"> -> </label><input id="df' + (nouveauxId + 2) + '" type="text" pattern="[A-Za-z0-9-,]+" onchange="alterteRafraichissement()"> <button class="styleBouton" type="button" onclick="ajouterZoneDf(' + nouveauLabel + ',' + (nouveauxId + 1) + ')">+</button>' + '<button class="styleBouton" onclick="retirerZoneDF(' + nouveauLabel + ')">-</button> </label>');

    nouveauLabel++;
    nouveauxId += 2;

    alterteRafraichissement();
}

function retirerZoneDF(numLabel) {
    var divZoneDF = document.getElementById("label" + numLabel);

    divZoneDF.remove();
    alterteRafraichissement();
}

function remplissageDF(numLabel) {
    var divZoneDF = document.getElementById("label" + numLabel);
    for (var i = 0; i < tableauDesDF.length; i++) {

        if (i == 0) {
            divZoneDF.insertAdjacentHTML('beforeend', '<label id="label' + nouveauLabel + '"><br><input id="df' + (nouveauxId + 1) + '" type="text" pattern="[A-Za-z0-9-,]+" onchange="alterteRafraichissement()" value =' + tableauDesDF[i][0] + '> <label id="label"> -> </label><input id="df' + (nouveauxId + 2) + '" type="text" pattern="[A-Za-z0-9-,]+" onchange="alterteRafraichissement()" value =' + tableauDesDF[i][1] + '> <button class="styleBouton" type="button" onclick="ajouterZoneDf(' + nouveauLabel + ',' + (nouveauxId + 1) + ')">+</button></label>');
        }
        else {
        divZoneDF.insertAdjacentHTML('beforeend', '<label id="label' + nouveauLabel + '"><br><input id="df' + (nouveauxId + 1) + '" type="text" pattern="[A-Za-z0-9-,]+" onchange="alterteRafraichissement()" value =' + tableauDesDF[i][0] + '> <label id="label"> -> </label><input id="df' + (nouveauxId + 2) + '" type="text" pattern="[A-Za-z0-9-,]+" onchange="alterteRafraichissement()" value =' + tableauDesDF[i][1] + '> <button class="styleBouton" type="button" onclick="ajouterZoneDf(' + nouveauLabel + ',' + (nouveauxId + 1) + ')">+</button>' + '<button class="styleBouton" onclick="retirerZoneDF(' + nouveauLabel + ')">-</button> </label>');
        }

        nouveauLabel++;
        nouveauxId += 2;
    }
    retirerZoneDF(0);
}

function enregistrerlesDF() {
    document.getElementById("AffichageDF").innerHTML = '';
    var liste = [];
    var elt = 0;
    for (var i = 0; i <= nouveauxId / 2; i++) {
        for (var j = 0; j < 2; j++) {
            if (!liste[i]) {
                liste[i] = [];
            }

            var df = document.getElementById("df" + elt);
            console.log(df);
            if (df == "df0") {
                if (df.value.length > 1) {
                    df = df.value.split(',');
                    liste[i][j] = df;
                } else {
                    df = df.value;
                    liste[i][j] = [df];
                }
            }
            if (df != null) {
                if (df.value.length > 1) {
                    df = df.value.split(',');
                    liste[i][j] = df;
                } else {
                    df = df.value;
                    liste[i][j] = [df];
                }
            }
            elt++;
        }
    }
    var listeFiltree = [];
    listeFiltree = liste.filter(String);

    tableauDesDF = listeFiltree;
    afficheDF("AffichageDF");
    tableauDesA = getAll(tableauDesDF);
    afficheAtom("atom", 0);
    document.getElementById("alerteRafraichissement").innerHTML = "";
    return listeFiltree;
}

// Affiche la DF actuellement chargée en mémoire
function afficheDF(div) {
    document.getElementById(div).innerHTML = '';
    if (tableauDesDF.length != 0)  {
        document.getElementById(div).insertAdjacentHTML('beforeend', "<p class=" + '"' + "DFGauche" + '"' + ">Dépendances Fonctionnelles : </br> </p>");
    }
    for (var i = 0; i < tableauDesDF.length; i++) {
        var indice = "f" + (i + 1);
        document.getElementById(div).insertAdjacentHTML('beforeend', indice + ': ' + tableauDesDF[i][0] + ' -> ' + tableauDesDF[i][1] + "</br>");
    }
}

function afficheCM(div) {
    document.getElementById(div).innerHTML = '';
    if (tableauDesCM.length != 0)  {
        document.getElementById(div).insertAdjacentHTML('beforeend', "<p class=" + '"' + "couvMinGauche" + '"' + ">Couverture minimale : </br> </p>");
    }
    
    for (var i = 0; i < tableauDesCM[0].length; i++) {
        var indice = "c" + (i + 1);
        document.getElementById(div).insertAdjacentHTML('beforeend', indice + ': ' + tableauDesCM[0][i][0] + ' -> ' + tableauDesCM[0][i][1] + "</br>");
    }
}


function afficheR(div) {
    document.getElementById(div).innerHTML = '';
    if (tableauDesR.length != 0)  {
        document.getElementById(div).insertAdjacentHTML('beforeend', "<p class=" + '"' + "relationGauche" + '"' + ">Relations : </br> </p>");
    }
    for (var i = 0; i < tableauDesR.length; i++) {
        var indice = 'R' + (i+1);
        var affich = '(' + '[' + tableauDesR[i][0] + ']';
        for (var j = 1; j < tableauDesR[i].length; j++) {
            affich = affich + ','+tableauDesR[i][j];
        }
        document.getElementById(div).insertAdjacentHTML('beforeend', indice + ': ' + affich + ')' + "</br>");
    }
}

function csvToArray(csv) {

    var rows = csv.split("\n");
    console.log("ROWS", rows);
    if (rows[rows.length - 1] == '') {
        rows.splice(rows.length - 1, 1);
    }
    console.log("rows", rows);
    var rowsFin = rows.map(function(row) {
        return row.split(";");
    });

    console.log("rowsFin", rowsFin);
    for (var i = 0; i < rowsFin.length; i++) {
        rowsFin[i] = [
            [rowsFin[i][0]],
            [rowsFin[i][1]]
        ];
        if (rowsFin[i][0][0].includes(',')) {
            rowsFin[i][0] = rowsFin[i][0][0].split(',');
        }
        if (rowsFin[i][1][0].includes(',')) {
            rowsFin[i][1] = rowsFin[i][1][0].split(',');
        }
        if (rowsFin[i][1][0][rowsFin[i][1].length - 1] == '\r') {
            rowsFin[i][1] = rowsFin[i][1].slice(0, rowsFin[i][1][0].length - 1);
        }
    }
    console.log("rowsFin", rowsFin);

    return rowsFin;
}

function arrayToCsv(liste) {
    var test;
    var string = "";
    for (const elt in liste) {
        string += liste[elt][0].join(',');
        string += ';';
        string += liste[elt][1].join(',');
        string += '\n';
    }
    return string;
}


function Download() {
    let filename = "mesDF.csv";
    let text = arrayToCsv(tableauDesDF);
    let blob = new Blob([text], { type: 'text/plain' });
    let link = document.createElement("a");
    link.download = filename;
    link.href = window.URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(link.href);
    }, 100);
}


function Traitement() {
    var reader = new FileReader();
    reader.addEventListener('load', function() {
        document.getElementById('label999').innerHTML = '';
        var arry = reader.result;
        var data = csvToArray(arry);
        tableauDesDF = data;
        remplissageDF(999);

    });

    reader.readAsText(document.getElementById('a2').files[0]);
    alterteRafraichissement();
}

function alterteRafraichissement() {
    document.getElementById("alerteRafraichissement").innerHTML = "Veuillez appuyer sur le bouton d'actualisation";
}
