document.getElementById('faculty').focus();


function tabulate (data,columns) {
  var table = d3.select('#mytable').append('table')
  table.attr('class','w3-table-all w3-border-0')
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

var ids =['pcoe_female','pcoe_male','ou_female','ou_male'];


reader('data/faculty.csv');

var faculty_data = [61.3,38.7,48.1,51.9];

document.getElementById('faculty').addEventListener('click', function(){
  d3.select('#mytable').select('table').remove();
  reader('data/faculty.csv');
  var i;
  for (i=0; i<ids.length; i++){
  var countfaculty = new CountUp(ids[i],0,faculty_data[i],1);
  d3.select(ids[i]).html(countfaculty.start());
  }
})

document.getElementById('staff').addEventListener('click', function(){

  d3.select('#mytable').select('table').remove();
  reader('data/staff.csv');
 
  var staff = [78.0,22.0,56.2,43.8];
  var i;
  for (i=0; i<ids.length; i++){
  var countstaff = new CountUp(ids[i],0,staff[i],1);
  d3.select(ids[i]).html(countstaff.start());
  }
  

})

document.getElementById('both').addEventListener('click', function(){

  d3.select('#mytable').select('table').remove();
  reader('data/both.csv');

  var both = [64.6,35.4,52.9,47.1];
  var i;
  for (i=0; i<ids.length; i++){
  var counter = new CountUp(ids[i],0,both[i],1);
  d3.select(ids[i]).html(counter.start());
  }
})

 var demo = new CountUp('pcoe_female', 0, faculty_data[0], 1);
 var demo1 = new CountUp('pcoe_male', 0, faculty_data[1], 1);
 var demo2 = new CountUp('ou_female', 0, faculty_data[2], 1);
 var demo3 = new CountUp('ou_male', 0, faculty_data[3], 1);

  if (!demo.error) {
    demo.start();
    demo1.start();
    demo2.start();
    demo3.start();
  } else {
    console.error(demo.error);
    console.error(demo1.error);
    console.error(demo2.error);
    console.error(demo3.error);
  }

$(function(){
  $("#patton").percircle({
    progressBarColor: "#CC3366",
    percent: 20.1
  });
});


$(function(){
  $("#ou").percircle({
      percent: 15.3
    });
});
