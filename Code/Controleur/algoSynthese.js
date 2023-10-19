//Crea ensemble
//X->y y->x
//creation relation [[cp]...]

function creationEnsemble(liste)
{
    var listeEns=[];
    var ensemble=[];
    for (const elt in liste)
    {
        if (liste[elt][0].length==1)
        {
            if(!ensemble.includes(liste[elt][0][0]))
            {
                ensemble.push(liste[elt][0][0]);
                listeEns.push([liste[elt][0]]);
                for (const element in liste[elt][1])
                {
                listeEns[listeEns.length-1].push(liste[elt][1][element]);
                }
            }
            else
            {
                for (const element in listeEns)
                {
                    //console.log("elt",liste[elt][0],"element",[].concat(listeEns[element][0]),"equal??",liste[elt][0]==listeEns[element][0]);
                    if (listeEns[element][0][0]==liste[elt][0])
                    {
                        listeEns[element].push(liste[elt][1][0]);
                    }
                }
                // console.log("2.2",listeEns);

            }
        // console.log(listeEns);
        }
        else
        {
            //console.log("equ??",liste[elt],"X",ensemble);
            if(!ensemble.includes(liste[elt][0].join()))
            {
                // console.log("??",liste[elt][0]);
                ensemble.push((liste[elt][0].join()));
                listeEns.push([liste[elt][0]]);
                for (const element in liste[elt][1])
                {
                listeEns[listeEns.length-1].push(liste[elt][1][element]);
                }
            }
            else
            {
                for (const element in listeEns)
                {
                    // console.log(listeEns[element][0]);
                    if (listeEns[element][0]==liste[elt][0].join())
                    {
                        listeEns[element].push(liste[elt][1][0]);
                    }
                }
            }
        }
    }
    //console.log(ensemble);
    console.log("listeEns",listeEns);
    return listeEns;
}

function reflexivite(liste)
{
    var i=0;
    var i2;
    var i3;
    var i4;
    var flag;
    var flag2;
    var recup;
    var recup2;
    var li;
    var li2;
    while (i<liste.length)
    {
        i2=0;
        //console.log("............................",liste[i]);
        while (i2<liste.length)
        {
            if (i2!=i)
            {
                // console.log("l2",liste[i2]);
                recup=[].concat(liste[i2]).flat();
                recup.splice(0,1);
                recup2=[].concat(liste[i]).flat();
                recup2.splice(0,1);
                // console.log("li",liste[i],"X",recup2,"// li2",liste[i2],"X",recup,"i",i,"i2",i2);
                li=liste[i].flat();
                li2=liste[i2].flat();
                // console.log(liste[i][0][0]);
                if(liste[i2].includes(liste[i][0][0]))
                {   
                    // console.log("??",recup,recup2);
                    i3=0;
                    flag=true;
                    while(i3<recup2.length && flag)
                    {
                        //console.log("..............","recup2 ",recup2,"i3 ",i3,"liste[i2] ",li2,"...",recup2[i3]==li2[0],"recup2[i3]",recup2[i3],"liste[i2][1]",li2[1]);
                        flag=li2.includes(recup2[i3]);
                        i3+=1;
                    }
                    // console.log(liste[i2][0][0]);
                    if(liste[i].includes(liste[i2][0][0]))
                    {
                        // console.log("YES!");
                        i4=0;
                        flag2=true;
                        while(i4<recup.length && flag2)
                        {
                            flag2=li.includes(recup[i4]);
                            i4+=1;
                        }
                        // console.log("flag",flag,"flag2",flag2,"\n");
                        // console.log(".....",liste);
                        if(flag)
                        {
                            liste[i2]=liste[i2].concat(recup2);
                            liste.splice(i,1);
                        }
                        if(flag2)
                        {
                            liste[i]=liste[i].concat(recup);
                            liste.splice(i2,1);
                        }
                        // console.log("XD",liste);
                    }
                }
            }
            i2+=1;
        }
        i+=1;
    }
    // console.log("reflexivite",liste);
    return liste;
}


function algoSynthese(liste)
{
    var trace=[];
    var ensemble=creationEnsemble(liste);
    trace.push([].concat(ensemble));
    var res=reflexivite(ensemble)
    trace.push([].concat(res));
    // var resultatFinal=creationRelations(res);
    return [res,trace];
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
    [['C','A'],['D']]
];

var listeDepart7=[
    [['B'],['D']],
    [['A','C'],['D']],
    [['C','D'],['E']],
    [['E'],['A']]
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
    [['A'],['B']],
    [['A'],['C']],
    [['D'],['E']]
]

// console.log("1",algoSynthese(listeDepart1));
// console.log("2",algoSynthese(listeDepart2));
// console.log("3",algoSynthese(listeDepart3));
// console.log("4",algoSynthese(listeDepart4));
// console.log("5",algoSynthese(listeDepart5));
// console.log("6",algoSynthese(listeDepart6));
// console.log("7",algoSynthese(listeDepart7));
// console.log("8",algoSynthese(listeDepart8));
// console.log("8",algoSynthese(listeDepart9)[0]);
// console.log("8",algoSynthese(listeDepart9)[1]);
