function updatetable (data) {

var columns = ['','Patton College','Ohio Univesity']

d3.select(".w3-table-all tbody").selectAll('tr').remove();
tbody = d3.select('.w3-table-all tbody')
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

  return rows
}

function reader_new (file) {
  d3.csv(file,function (data) {
  updatetable(data)
  })
}
