
function linechart(type){
  d3.csv("data/linechart.csv", function(error,data) {
  data = data.filter(function(d){return d.type == type;})
    data.forEach(function(d) {
		d.year = parseDate(d.year);
    d.value = +d.value;
    });

// creating domains and adding some padding so it looks better
  var minDate = d3.min(data, function(d) { return d.year.getTime(); }),
  maxDate = d3.max(data, function(d) { return d.year.getTime(); }),
  padding = (maxDate - minDate) * .05;
  
  var yExtent = d3.extent(data, function(d) { return d.value; }),
  yRange = yExtent[1] - yExtent[0];
  
  x.domain([minDate - padding, maxDate + padding]);
  y.domain([0, 25]);
 
   // Nest the entries by symbol
   var dataNest = d3.nest()
       .key(function(d) {return d.category;})
       .entries(data);

   // set the colour scale
   var color = d3.scaleOrdinal(d3.schemeCategory10).range(['#e41a1c','#377eb8']);

   legendSpace = width/dataNest.length; // spacing for the legend

   // Loop through each symbol / key
   dataNest.forEach(function(d,i) { 

       svg.append("path")
           .attr("class", "line")
           .attr("fill","none")
           .attr("stroke-width", 2)
           .style("stroke", function() { 
               return d.color = color(d.key); })
           .attr("d", priceline(d.values));

       // Add the Legend
       svg.append("text")
           .attr("x", (legendSpace/2)+i*legendSpace)  // space legend
           .attr("y", height + (margin.bottom/2)+ 5)
           .attr("class", "legend")   
           .style("fill", function() { 
               return d.color = color(d.key); })
           .text(d.key); 

   });

 // Add the X Axis
 svg.append("g")
     .attr("class", "axis")
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(x));

 // Add the Y Axis
 svg.append("g")
     .attr("class", "axis")
     .call(d3.axisLeft(y));

  // adding points   
  svg.selectAll(".dot")
  .data(data)
  .enter().append("circle") 
    .attr("class","dot")
    .attr("cx",function(d) { return x(d.year) })
    .attr("cy",function(d) { return y(d.value) })
    .attr("r",4)
    .style("fill", function(d) { 
      return color(d.category); });

  svg.append("g").selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", function(d) { return x(d.year) - 5 })
      .attr("y", function(d) { return y(d.value)-7 })
      .text(function(d) { return d.value });

});


}
