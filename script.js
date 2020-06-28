// setting the some initial values
document.getElementById('faculty').focus();
document.getElementById('faculty').classList.add('active');
let button_value = 'faculty';

const ids = ['pcoe_female', 'pcoe_male', 'ou_female', 'ou_male'];
let faculty_data = [61.4, 38.6, 49.6, 50.4];
let staff = [77.6, 22.4, 56.6, 43.4];
let both = [65.3, 34.7, 53.8, 46.2];

let patton_progress = 19.0; 
let ou_progress = 14.6;

const ou_faculty = 14.6,
    ou_staff = 9.1,
    ou_both = 11.3,
    pcoe_faculty = 19.0,
    pcoe_staff = 14.3,
    pcoe_both = 17.8;

// table function
function tabulate(data, columns) {
    var table = d3.select('#mytable').append('table')
    table.attr('class', 'w3-table-all w3-border-0')
    var thead = table.append('thead')
    var tbody = table.append('tbody')

    thead.append('tr')
        .selectAll('th')
        .data(columns)
        .enter()
        .append('th')
        .text(function(d) {
            return d
        })
        .attr('class', 'header')

    var rows = tbody.selectAll('tr')
        .data(data)
        .enter()
        .append('tr')

    var cells = rows.selectAll('td')
        .data(function(row) {
            return columns.map(function(column) {
                return {
                    column: column,
                    value: row[column]
                }
            })
        })
        .enter()
        .append('td')
        .text(function(d) {
            if (typeof d.value == 'number') {
                var temp = new CountUp(this, 0, d.value, 1);
                temp.start()
            } else {
                return d.value
            }
        })

    return table;
}

function updatetable(data) {

    var columns = ['race', 'pcoe', 'ou']

    d3.select(".w3-table-all tbody").selectAll('tr').remove();
    tbody = d3.select('.w3-table-all tbody')
    var rows = tbody.selectAll('tr')
        .data(data)
        .enter()
        .append('tr')

    var cells = rows.selectAll('td')
        .data(function(row) {
            return columns.map(function(column) {
                return {
                    column: column,
                    value: row[column]
                }
            })
        })
        .enter()
        .append('td')
        .text(function(d) {
            if (typeof d.value == 'number') {
                var temp = new CountUp(this, 0, d.value, 1);
                temp.start()
            } else {
                return d.value
            }
        })

    return rows
}

function reader(file) {
    d3.csv(file, function(data) {
        data.forEach(function(d) {
            d[''] = d[''];
            d["Patton College"] = +d["Patton College"];
            d["Ohio Univesity"] = +d["Ohio Univesity"];
        });
        var columns = ['', 'Patton College', 'Ohio Univesity']
        tabulate(data, columns)
    })
}

function reader_new(file) {
    d3.csv(file, function(d) {
        return {
            race: d[''],
            pcoe: +d['Patton College'],
            ou: +d['Ohio Univesity']
        };
    }, function(data) {
        updatetable(data);
    });
}

reader('data/faculty.csv');

// this is what happens when 'Faculty' button is clicked
document.getElementById('faculty').addEventListener('click', function() {
    this.classList.add('active');
    button_value = 'faculty';

    document.getElementById('staff').classList.remove('active');
    document.getElementById('both').classList.remove('active');

    patton_progress = pcoe_faculty;
    ou_progress = ou_faculty;

    $(function() {
        $("#patton").percircle({
            progressBarColor: "#CC3366",
            percent: patton_progress
        });
    });


    $(function() {
        $("#ou").percircle({
            percent: ou_progress
        });
    });

    reader_new('data/faculty.csv');
    var i;
    for (i = 0; i < ids.length; i++) {
        var countfaculty = new CountUp(ids[i], 0, faculty_data[i], 1);
        d3.select(ids[i]).html(countfaculty.start());
    }
})

// this is what happens when 'staff' button is clicked
document.getElementById('staff').addEventListener('click', function() {
    this.classList.add('active');
    button_value = 'staff';
    document.getElementById('faculty').classList.remove('active');
    document.getElementById('both').classList.remove('active');


    patton_progress = pcoe_staff;
    ou_progress = ou_staff;

    $(function() {
        $("#patton").percircle({
            progressBarColor: "#CC3366",
            percent: patton_progress
        });
    });


    $(function() {
        $("#ou").percircle({
            percent: ou_progress
        });
    });

    reader_new('data/staff.csv');

    var i;
    for (i = 0; i < ids.length; i++) {
        var countstaff = new CountUp(ids[i], 0, staff[i], 1);
        d3.select(ids[i]).html(countstaff.start());
    }


})

// this is what happens when 'Both' button is clicked
document.getElementById('both').addEventListener('click', function() {

    this.classList.add('active');
    button_value = 'both';
    document.getElementById('faculty').classList.remove('active');
    document.getElementById('staff').classList.remove('active');

    patton_progress = pcoe_both;
    ou_progress = ou_both;

    $(function() {
        $("#patton").percircle({
            progressBarColor: "#CC3366",
            percent: patton_progress
        });
    });

    $(function() {
        $("#ou").percircle({
            percent: ou_progress
        });
    });


    reader_new('data/both.csv');

    var i;
    for (i = 0; i < ids.length; i++) {
        var counter = new CountUp(ids[i], 0, both[i], 1);
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

$(function() {
    $("#patton").percircle({
        progressBarColor: "#CC3366",
        percent: patton_progress
    });
});


$(function() {
    $("#ou").percircle({
        percent: ou_progress
    });
});


var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden");


d3.select("#pulsating")
    .on("mouseover", function() { return tooltip.style("visibility", "visible"); })
    .on("mousemove", function() {
        tooltip
            .html(function() {
                if (button_value == 'faculty') {
                    return "Down 1.4 percentage <br>points from 2018";
                } else if (button_value == 'staff') {
                    return "Down 4.3 percentage <br>points from 2018";
                } else {
                    return "Down 2.0 percentage <br>points from 2018";
                }
            });
        return tooltip.style("top", (event.pageY + 15) + "px")
            .style("left", (event.pageX + 10) + "px");
    })
    .on("mouseout", function() { return tooltip.style("visibility", "hidden"); });