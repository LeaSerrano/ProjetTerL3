
var divDF;
var divCouvMin;
var divRelation;
var divCouvMinGlobal;

function clickOngletDF (gauche1, gauche2, gauche3) {
    divDF = document.getElementById(gauche1);
    divCouvMin = document.getElementById(gauche2);
    divRelation = document.getElementById(gauche3);

    divDF.style.display="block";
    
    divCouvMin.style.display="none";
    divRelation.style.display="none";
}

function clickOngletCouvMin(gauche1, gauche2, gauche3){
    divDF = document.getElementById(gauche1);
    divCouvMin = document.getElementById(gauche2);
    divRelation = document.getElementById(gauche3);

    divCouvMin.style.display="block";
    
    divDF.style.display="none";
    divRelation.style.display="none";  

}

function clickOngletRelation(gauche1, gauche2, gauche3) {
    divDF = document.getElementById(gauche1);
    divCouvMin = document.getElementById(gauche2);
    divRelation = document.getElementById(gauche3);
    
    divRelation.style.display="block";
    divDF.style.display="none";
    divCouvMin.style.display="none";
}

var divExplication;
var divTrace;

function clickOngletExplication (droite1,droite2) {
    divExplication = document.getElementById(droite1);
    divTrace = document.getElementById(droite2);

    divExplication.style.display="block";
    
    divTrace.style.display="none";
}

function clickOngletTrace(droite1, droite2){
    divExplication = document.getElementById(droite1);
    divTrace = document.getElementById(droite2);

    divTrace.style.display="block";
    divTrace.setAttribute("style", "display:flex;");
    
    divExplication.style.display="none";
}
