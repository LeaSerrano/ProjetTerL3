function isFN2(relation,couvMin)
{
    var identique=true;
    var i=1;
    var R1;
    var R2;
    while (i<relation.length && identique)
    {
        for(var j=0;j<couvMin.length;j++)
        {
            if (relation[i]==couvMin[j][1][0])
            {
                // console.log("Hey!!",relation[i]);
                if(relation[0].length==couvMin[j][0].length)
                {
                    // console.log("Ahhh",relation[0]);
                    identique=true;
                }
                else
                {
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
        // console.log("R1R2",R1,R2);
        return [R1,R2];
    }
}

function FN2(listeRelation,couvMin)
{
    var trace=[];
    // console.log("liste",listeRelation);
    // console.log("couvMin",couvMin);
    var newRelation=[];
    var vic;
    for(var i=0;i<listeRelation.length;i++)
    {
        // console.log("..............................................",listeRelation[i])
        vic=isFN2(listeRelation[i],couvMin);
        if(vic.length!=1)
        {
            trace.push([false,[].concat(vic)]); //
            newRelation.push(vic[0]);
            newRelation.push(vic[1]);
        }
        else
        {
            trace.push([true,[].concat(vic[0])]);
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
    [['A'],['C']]
];

var listeSynthese9=[
    [['A','B'],'C','D']
];


// console.log("1",FN2([ [ [ 'A' ], 'B', 'C' ], [ [ 'D' ], 'E' ] ],[ [['A'],['B']], [['A'],['C']], [['D'],['E']] ])[0]);
// console.log("2",FN2(AlgoSynthese.algoSynthese(listeDepart2),AlgoCouvertureMinimale.couvertureMinimale(listeDepart2)));
// console.log("3",FN2(AlgoSynthese.algoSynthese(listeDepart3),AlgoCouvertureMinimale.couvertureMinimale(listeDepart3)));
// console.log("4",FN2(AlgoSynthese.algoSynthese(listeDepart4),AlgoCouvertureMinimale.couvertureMinimale(listeDepart4)));
// console.log("5",FN2(AlgoSynthese.algoSynthese(listeDepart5),AlgoCouvertureMinimale.couvertureMinimale(listeDepart5)));
// console.log("6",FN2(AlgoSynthese.algoSynthese(listeDepart6),AlgoCouvertureMinimale.couvertureMinimale(listeDepart6)));
// console.log("7",FN2(AlgoSynthese.algoSynthese(listeDepart7),AlgoCouvertureMinimale.couvertureMinimale(listeDepart7)));
// console.log("8",FN2(AlgoSynthese.algoSynthese(listeDepart8),AlgoCouvertureMinimale.couvertureMinimale(listeDepart8)));
// console.log("9",FN2(AlgoSynthese.algoSynthese(listeDepart9),AlgoCouvertureMinimale.couvertureMinimale(listeDepart9)));
//console.log("9",FN2(listeSynthese9,AlgoCouvertureMinimale.couvertureMinimale(listeDepart9)));

// console.log(AlgoSynthese.algoSynthese(listeDepart9));
// console.log(AlgoSynthese.algoSynthese(listeDepart9));
