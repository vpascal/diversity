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

var patton_progress = 18.5;
var ou_progress = 15.3;


reader('data/faculty.csv');

document.getElementById('faculty').addEventListener('click', function(){
  patton_progress = 18.5;
  ou_progress = 15.3;

  $(function(){
    $("#patton").percircle({
      progressBarColor: "#CC3366",
      percent: patton_progress
    });
  });
  
  
  $(function(){
    $("#ou").percircle({
        percent: ou_progress
      });
  });
  


  d3.select('#mytable').select('table').remove();
  reader('data/faculty.csv');

  var faculty = [61.3,38.7,48.1,51.9];
  var i;
  for (i=0; i<ids.length; i++){
  var countfaculty = new CountUp(ids[i],0,faculty[i],1);
  d3.select(ids[i]).html(countfaculty.start());
  }
})

document.getElementById('staff').addEventListener('click', function(){
  patton_progress = 14.6;
  ou_progress = 9.5;

  $(function(){
    $("#patton").percircle({
      progressBarColor: "#CC3366",
      percent: patton_progress
    });
  });
  
  
  $(function(){
    $("#ou").percircle({
        percent: ou_progress
      });
  });
  

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

  patton_progress = 17.7;
  ou_progress = 11.9;

  $(function(){
    $("#patton").percircle({
      progressBarColor: "#CC3366",
      percent: patton_progress
    });
  });
  
  
  $(function(){
    $("#ou").percircle({
        percent: ou_progress
      });
  });
  


  d3.select('#mytable').select('table').remove();
  reader('data/both.csv');

  var both = [64.6,35.4,52.9,47.1];
  var i;
  for (i=0; i<ids.length; i++){
  var counter = new CountUp(ids[i],0,both[i],1);
  d3.select(ids[i]).html(counter.start());
  }
  
})


$(function(){
  $("#patton").percircle({
    progressBarColor: "#CC3366",
    percent: patton_progress
  });
});


$(function(){
  $("#ou").percircle({
      percent: ou_progress
    });
});
