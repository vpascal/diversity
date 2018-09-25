


function tabulate (data,columns) {
  var table = d3.select('#mytable').append('table')
  table.attr('class','w3-table-all w3-border-0 w3-large')
	var thead = table.append('thead')
	var tbody = table.append('tbody')

	thead.append('tr')
	  .selectAll('th')
	    .data(columns)
      .enter()
	  .append('th')
      .text(function (d) { return d })
      .attr('class','header')

	var rows = tbody.selectAll('tr')
	    .data(data)
	    .enter()
	  .append('tr')

	var cells = rows.selectAll('td')
	    .data(function(row) {
	    	return columns.map(function (column) {
	    		return { column: column, value: row[column] }
	      })
      })
      .enter()
    .append('td')
      .text(function (d) { return d.value})

  return table;
}

function reader (file) {
  d3.csv(file,function (data) {
	var columns = ['','Patton College','Ohio Univesity']
  tabulate(data,columns)
  })
}


document.getElementById('faculty').addEventListener('click', function(){
  reader('data/faculty.csv');
})

document.getElementById('staff').addEventListener('click', function(){
  reader('data/staff.csv');
})


















$(function(){
    $("#patton").percircle({
      progressBarColor: "#CC3366",
      percent: 18.5
    });
});


$(function(){
  $("#ou").percircle({
      percent: 15.3
    });
});
