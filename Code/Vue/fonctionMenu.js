
var menuAccueil = document.getElementById("menuAccueil");
var divAccueil = document.querySelector(".Accueil");

var menuFormulaire = document.getElementById("menuFormulaire");
var divFormulaire = document.querySelector(".ZoneDF");

var menuCouverture = document.getElementById("menuCouverture");
var divCouverture = document.querySelector(".CouvertureMin");

var menuFermeture = document.getElementById("menuFermeture");
var divFermeture = document.querySelector(".FermetureAtt");

var menuFN = document.getElementById("menuFN");
var divFN = document.querySelector(".FormesNormales");

var menuSynthese = document.getElementById("menuSynthese");
var divSynthese = document.querySelector(".AlgoSynthese");

var menuChase = document.getElementById("menuChase");
var divChase = document.querySelector(".AlgoChase");

var menuAPropos = document.getElementById("menuAPropos");
var divAPropos = document.querySelector(".APropos");

var tabIdMenu = [divAccueil, divFormulaire, divCouverture, divFermeture, divFN, divSynthese, divChase, divAPropos];
var tabMenu = [menuAccueil, menuFormulaire, menuCouverture, menuFermeture, menuFN, menuSynthese, menuChase,menuAPropos];

menuAccueil.style.color = "#8AB0BA";
menuAccueil.style.borderBottom = "2px solid #8AB0BA";

menuAccueil.addEventListener("click", () => {
    divAccueil.style.display = "block";
    menuAccueil.style.color = "#8AB0BA";
    menuAccueil.style.borderBottom = "2px solid #8AB0BA";
    
    for (var i = 0; i < tabIdMenu.length; i++) {
        if (tabIdMenu[i] != divAccueil && tabMenu[i] != menuAccueil) {
            tabIdMenu[i].style.display = "none";
            tabMenu[i].setAttribute("style", "color:#FEFBEA");
        }
    }
})

var boutonCouvMin = document.getElementById("bouton02");
var boutonRelation = document.getElementById("bouton03");

menuFormulaire.addEventListener("click", () => {
    divFormulaire.style.display = "block";
    menuFormulaire.style.color = "#8AB0BA";
    menuFormulaire.style.borderBottom = "2px solid #8AB0BA";
    
    for (var i = 0; i < tabIdMenu.length; i++) {
        if (tabIdMenu[i] != divFormulaire && tabMenu[i] != menuFormulaire) {
            tabIdMenu[i].style.display = "none";
            tabMenu[i].setAttribute("style", "color:#FEFBEA");
        }
    }

    if (tableauDesCM.length == 0) {
        boutonCouvMin.setAttribute("style", "background-color:gray");
        boutonCouvMin.disabled = true;

    }
    else {
        boutonCouvMin.setAttribute("style", "background-color:white");
        boutonCouvMin.disabled = false;
        afficheCM('CouvMin1');
    }

    if (tableauDesR.length == 0)  {
        boutonRelation.setAttribute("style", "background-color:gray");
        boutonRelation.disabled = true;
    }
    else {
        boutonRelation.setAttribute("style", "background-color:white");
        boutonRelation.disabled = false;
        afficheR('Relation1');
    }

})

var boutonRelation2 = document.getElementById("bouton13");

menuCouverture.addEventListener("click", () => {
    divCouverture.style.display = "block";
    menuCouverture.style.color = "#8AB0BA";
    menuCouverture.style.borderBottom = "2px solid #8AB0BA";
    
    for (var i = 0; i < tabIdMenu.length; i++) {
        if (tabIdMenu[i] != divCouverture && tabMenu[i] != menuCouverture) {
            tabIdMenu[i].style.display = "none";
            tabMenu[i].setAttribute("style", "color:#FEFBEA");
        }
    }
    
    afficheAtom("atom1", 1);
    afficheDF('AffichageDF2');
    afficherResultatCouverture();
    afficheCM('CouvMin2');
    afficherExplications();

    if (tableauDesR.length == 0)  {
        boutonRelation2.setAttribute("style", "background-color:gray");
        boutonRelation2.disabled = true;
    }
    else {
        boutonRelation2.setAttribute("style", "background-color:white");
        boutonRelation2.disabled = false;
        afficheR('Relation2');
    }
})

var boutonRelation3 = document.getElementById("bouton23");

menuFermeture.addEventListener("click", () => {
    divFermeture.style.display = "block";
    menuFermeture.style.color = "#8AB0BA";
    menuFermeture.style.borderBottom = "2px solid #8AB0BA";
    
    for (var i = 0; i < tabIdMenu.length; i++) {
        if (tabIdMenu[i] != divFermeture && tabMenu[i] != menuFermeture) {
            tabIdMenu[i].style.display = "none";
            tabMenu[i].setAttribute("style", "color:#FEFBEA");
        }
    }
    afficheAtom("atom2", 2);
    afficheDF('AffichageDF3');
    afficherResultatFermeture();
    afficheCM('CouvMin3');
    afficherExplications();

    if (tableauDesR.length == 0)  {
        boutonRelation3.setAttribute("style", "background-color:gray");
        boutonRelation3.disabled = true;
    }
    else {
        boutonRelation3.setAttribute("style", "background-color:white");
        boutonRelation3.disabled = false;
        afficheR('Relation3');
    }
})

menuSynthese.addEventListener("click", () => {
    divSynthese.style.display = "block";
    menuSynthese.style.color = "#8AB0BA";
    menuSynthese.style.borderBottom = "2px solid #8AB0BA";
    
    for (var i = 0; i < tabIdMenu.length; i++) {
        if (tabIdMenu[i] != divSynthese && tabMenu[i] != menuSynthese) {
            tabIdMenu[i].style.display = "none";
            tabMenu[i].setAttribute("style", "color:#FEFBEA");
        }
    }
    afficheAtom("atom3", 3);
    afficheDF('AffichageDF4');
    afficheCM('CouvMin4');
    afficherResultatSynthese();
    afficheR('Relation4');
    afficherExplications();
})

menuFN.addEventListener("click", () => {
    divFN.style.display = "block";
    menuFN.style.color = "#8AB0BA";
    menuFN.style.borderBottom = "2px solid #8AB0BA";
    
    for (var i = 0; i < tabIdMenu.length; i++) {
        if (tabIdMenu[i] != divFN && tabMenu[i] != menuFN) {
            tabIdMenu[i].style.display = "none";
            tabMenu[i].setAttribute("style", "color:#FEFBEA");
        }
    }
    
    afficheAtom("atom4", 4);
    afficheDF('AffichageDF5');
    afficheCM('CouvMin5');
    var FN2 = afficherResultatFN2();
    afficherResultatFN3(FN2);
    afficheR('Relation5');
    afficherExplications();
})


menuChase.addEventListener("click", () => {
    divChase.style.display = "block";
    menuChase.style.color = "#8AB0BA";
    menuChase.style.borderBottom = "2px solid #8AB0BA";
    
    for (var i = 0; i < tabIdMenu.length; i++) {
        if (tabIdMenu[i] != divChase && tabMenu[i] != menuChase) {
            tabIdMenu[i].style.display = "none";
            tabMenu[i].setAttribute("style", "color:#FEFBEA");
        }
    }

    afficheAtom("atom5", 5);
    afficheDF('AffichageDF6');
    afficheCM('CouvMin6');
    afficheR('Relation6');
    afficherResultatChase();
    afficherExplications();
})

menuAPropos.addEventListener("click", () => {
    divAPropos.style.display = "block";
    menuAPropos.style.color = "#8AB0BA";
    menuAPropos.style.borderBottom = "2px solid #8AB0BA";
    
    for (var i = 0; i < tabIdMenu.length; i++) {
        if (tabIdMenu[i] != divAPropos && tabMenu[i] != menuAPropos) {
            tabIdMenu[i].style.display = "none";
            tabMenu[i].setAttribute("style", "color:#FEFBEA");
        }
    }

})
