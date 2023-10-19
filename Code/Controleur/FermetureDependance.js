function reflexivite(listeDepart)
{
    var liste=[];
    var listeRecup=[];
    var listeRecuperationN_uplet=[];
    var recup;
    var uplet_1=[];
    for(const elt in listeDepart)
    {
        if(listeDepart[elt][0].length>1)
        {
            console.log(listeDepart[elt][0]);
            for(var i=0;i<listeDepart[elt][0].length;i++)
            {
                // console.log("AAA",listeDepart[elt][0][i]);
                uplet_1.push(listeDepart[elt][0][i]);
                liste.push(listeDepart[elt][0][i]);
            }
            console.log("uplet_1",uplet_1);
            for(var indice=0;indice<uplet_1.length;indice++)
            {
                // listeRecup.push(uplet_1[indice]);
                listeRecup=[];
                listeRecup.push(uplet_1[indice]);
                console.log("..........................................;",uplet_1[indice]);
                // console.log("element",indice,indice+1,uplet_1.length);
                for(var j=indice+1; j<uplet_1.length;j++)
                {
                    // console.log("listeRecup[listeRecup.length-1]",listeRecup[listeRecup.length-1]);
                    listeRecup.push(listeRecup[listeRecup.length-1].concat('',uplet_1[j]));
                    console.log(listeRecup);
                    liste.push(listeRecup[listeRecup.length-1]);
                    listeRecuperationN_uplet=[];
                    // listeRecuperationN_uplet.push(listeRecup[]);
                    for(var k=1;k<listeRecup.length;k++)
                    {
                        console.log("recup",listeRecup[k]);
                        for(var l=k+1;l<uplet_1.length;l++)
                        {
                            listeRecuperationN_uplet.push(listeRecup[k].slice(0,listeRecup[k][listeRecup[k].length-1]));
                            // console.log(listeRecuperationN_uplet);
                            listeRecuperationN_uplet[listeRecuperationN_uplet.length-1].concat('',uplet_1[l]);
                        }
                        // console.log("listeRecup",listeRecuperationN_uplet);
                    }
                }
                // console.log("Recup",listeRecup,liste);
            }
        }
    }
}


function fermetureDependance(listeDepart)
{
    reflexivite(listeDepart);
}

var listeDepart1=[
    [['A'],['C']],
    [['B'],['D']],
    //[['A','C','B','D','E'],['D']],
    [['C','D'],['E']],
    [['E'],['A']]
];

console.log("1",fermetureDependance(listeDepart1));
