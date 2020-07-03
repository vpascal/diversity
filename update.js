
d3.csv("data/linechart.csv", function(error,d) {
  return {
    year : d.year,
    category : d.category,
    type : d.type,
    value : +d.value
  };
});
