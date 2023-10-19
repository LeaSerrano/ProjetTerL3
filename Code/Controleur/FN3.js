function isInclude(liste1,liste2)
{
    var flag=true;
    var i=0;
    while(flag && i<liste1.length)
    {
        flag=false;
        if (liste2.includes(liste1[i]))
        {
            flag=true;
        }
        i++;
    }
    if(i==liste1.length && flag)
    {
        return true;
    }
    return false;
}

function isFN3(relation,couvMin)
{
    var identique=true;
    var i=1;
    var R1;
    var R2;
    var relationAttr;
    while (i<relation.length && identique)
    {
        relationAttr=[].concat(relation);
        relationAttr.splice(0,1);
        for(var j=0;j<couvMin.length;j++)
        {
            if (relation[i]==couvMin[j][1][0])
            {
                // console.log("Hey!!",relation[i]);
                if(isInclude(couvMin[j][0], relationAttr))
                {
                    // console.log("Ahhh",relation[0]);
                    // console.log("Yo");
                    identique=false;
                    R1=[]
                    R1.push(couvMin[j][0]);
                    R1.push(couvMin[j][1][0]);
                    // console.log("R1",R1);
                    R2=[].concat(relation);
                    // console.log("R2",R2);
                    R2.splice(R2.indexOf(couvMin[j][1][0]),1);
                    // console.log("R2",R2);
                }
                else
                {
                    console.log("??");
                    identique=true;
                }
            }
        }
        i++;
    }


    if(identique && i==relation.length)
    {
        return [relation];
    }
    else
    {
        // console.log("Heyo");
        return [R1,R2];
    }
}


function FN3(listeRelation,couvMin)
{
    var trace=[];
    // console.log("liste",listeRelation);
    // console.log("couvMin",couvMin);
    var newRelation=[];
    var vic;
    var recup;
    for(var i=0;i<listeRelation.length;i++)
    {
        // console.log("..............................................",listeRelation[i])
        recup=listeRelation[i];
        vic=isFN3(listeRelation[i],couvMin);
        if(vic.length!=1)
        {
            // trace.push([false,recup]);
            // trace[1].push(_.cloneDeep(vic));
            var resultat=[false,recup];
            resultat.push(vic);
            trace.push(resultat);
            newRelation.push(vic[0]);
            newRelation.push(vic[1]);
        }
        else
        {
            trace.push([true,_.cloneDeep(vic)]);
            newRelation.push(vic[0]);
        }
    }
    return [newRelation,trace];
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
  [['P','F'],['G']],
  [['P'],['C','T']],
  [['N'],['F']]  
];


var listeDepart8=[
    [['P'],['G']],
    [['N'],['F']],
    [['F'],['N']],
    [['F'],['P']],
    [['P'],['C']],
    [['P'],['T']]
];


var listeDepart9=[
    [['Y'],['Z']]
];


var listeSynthese9=[
    [['X'],'Y','Z'],
];


// console.log("1",FN3(AlgoSynthese.algoSynthese(listeDepart1),AlgoCouvertureMinimale.couvertureMinimale(listeDepart1)));
// console.log("2",FN3(AlgoSynthese.algoSynthese(listeDepart2),AlgoCouvertureMinimale.couvertureMinimale(listeDepart2)));
// console.log("3",FN3(AlgoSynthese.algoSynthese(listeDepart3),AlgoCouvertureMinimale.couvertureMinimale(listeDepart3)));
// console.log("4",FN3(AlgoSynthese.algoSynthese(listeDepart4),AlgoCouvertureMinimale.couvertureMinimale(listeDepart4)));
// console.log("5",FN3(AlgoSynthese.algoSynthese(listeDepart5),AlgoCouvertureMinimale.couvertureMinimale(listeDepart5)));
// console.log("6",FN3(AlgoSynthese.algoSynthese(listeDepart6),AlgoCouvertureMinimale.couvertureMinimale(listeDepart6)));
// console.log("7",FN3(AlgoSynthese.algoSynthese(listeDepart7),AlgoCouvertureMinimale.couvertureMinimale(listeDepart7)));
// console.log("8",FN3(AlgoSynthese.algoSynthese(listeDepart8),AlgoCouvertureMinimale.couvertureMinimale(listeDepart8)));
// console.log("9",FN3(listeSynthese9,AlgoCouvertureMinimale.couvertureMinimale(listeDepart9)));

// console.log(AlgoSynthese.algoSynthese(listeDepart9));