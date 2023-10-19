function Graphe(DF,relations, id)
{
    var width = 300;
    var height = 300;
    console.log("id",id);
    console.log("DF",DF);
    console.log("relations",relations);
    for(elt in relations)
    {
      relations[elt][0]=relations[elt][0][0];
    }


/*
    var nodes=[ 
        { id: 'A', label: 'a', level: 1},
        { id: 'F', label: 'f', level: 1},
        { id: 'B', label: 'b', level: 0},
      //   { id: 'G', label: 'g', level: 0},
        { id: 'C', label: 'c', level: 0},
        { id: 'E', label: 'e', level: 0}
      ];
      
      var links=[
          { source: 'A', target: 'F', strength: 0.9},
          { source: 'F', target: 'A', strength : 0.9},
          { source: 'A', target: 'B', strength: 0.7 },
          { source: 'A', target: 'C', strength: 0.7 },
          // { source: 'A', target: 'G', strength: 0.7 },
          // { source: 'F', target: 'G', strength: 0.7 },
          { source: 'F', target: 'C', strength: 0.7 },
          { source: 'F', target: 'B', strength: 0.7 },
          { source: 'A', target: 'E', strength: 0.7 }
      ];
*/

    var nodes=[];
    
    var links=[];

    function estPresent(element, tableau)
    {
        for(var l=0;l<tableau.length;l++)
        {
            // console.log(element,"/\\",tableau[l].source);
            // console.log("estPresent",tableau[l].id.toLowerCase(),"/\\",element.toLowerCase());
            if(tableau[l].id==element.toUpperCase())
            {
                // console.log(element,"==",tableau[l].source)
                return true;
            }
        }
        return false;
    }

    for(var i=0;i<DF.length;i++)
    {
        for(var j=0;j<DF[i].length;j++)
        {
            for(var k=0;k<DF[i][j].length;k++)
            {
                // console.log("Lettre: ",DF[i][j][k]);
                if(!estPresent(DF[i][j][k],nodes))
                {
                    nodes.push({id: DF[i][j][k].toUpperCase(), label: DF[i][j][k].toLowerCase(),level:j?0:1});
                }
                else
                {
                  for(var l=0;l<nodes.length;l++)
                  {
                      if(nodes[l].id==DF[i][j][k].toUpperCase())
                      {
                        // console.log("Hey!!",nodes[l].id);
                        nodes[l].level=nodes[l].level==1?1:j?0:1;
                        // console.log("Nodes: ",nodes[l].level);
                      }
                  }
                }
            }
        }
    }

    for(var i=0;i<relations.length;i++)
    {
            for(var k=1;k<relations[i].length;k++)
            {
              if(relations[i][k]!=relations[i][0])
              {
                links.push({source: relations[i][0], target: relations[i][k],strength: 0.7});
              }
            }
            // console.log("Element: ",DF[i][j]);
    }
/*
    links=[
      { source: 'A', target: 'B', strength: 0.9},
      { source: 'A', target: 'C', strength: 0.9},
      { source: 'D', target: 'E', strength: 0.9},
      { source: 'C', target: 'B', strength: 0.9},
    ];
    */

    // console.log("links22",links);
    // console.log("nodes",nodes);

    function getNodeColor(node) {
        return node.level? 'red' : 'gray'
      }

      svg = d3.select("#"+id).append("svg").attr("width", width).attr("height", height);
      
        const simulation = d3.forceSimulation()
        .force('charge', d3.forceManyBody().strength(-10)) 
        .force('center', d3.forceCenter(width/4, height / 2));
      
        
      var node = svg.append("g")
              .attr("class", "nodes")
          .selectAll("circle")
          .data(nodes)
          .enter().append("circle")
            .attr("r", 5)
            .attr("fill", getNodeColor)
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));
      
      const textElements = svg.append('g')
          .attr("class","text")
        .selectAll('text')
        .data(nodes)
        .enter().append('text')
          .text(node => node.id)
          .attr('font-size', 15)
          .attr('dx', 15)
          .attr('dy', 4)
          .attr("fill","white");
      
      
      simulation.force('link', d3.forceLink()
        .id(link => link.id)
        .strength(link => link.strength));
      
      
        var link = svg.append("g")
            .attr("class", "links")
          .selectAll("line")
          .data(links)
          .enter().append("line")
          .attr('stroke-width', 1)
          .attr('stroke', '#E5E5E5');
      
      
            simulation
            .nodes(nodes)
            .on("tick", ticked);
      
      // console.log(links);
      
            simulation
            .force("link")
            .links(links);
      
              
      function ticked() {
          link
              .attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });
      
          node
              .attr("cx", function(d) { return d.x; })
              .attr("cy", function(d) { return d.y; });
              
          textElements
          .attr("x", node => node.x)
          .attr("y", node => node.y)
        }
       
        function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }
      
      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }
      
      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
      
      console.log("Nyeh",nodes);
      console.log("Mais euhh",links);
      // console.log("link",link);
      
      simulation.force("link").links(links)
}
