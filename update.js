
import * as d3 from "d3";

d3.csv("/data/line _chart.csv", function(d) {
  return {
    year : d.year,
    category : d.category,
    type : d.type,
    value : +d.value
  };
}).then(function(data) {
  console.log(data[0]);
});