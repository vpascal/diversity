// setting the some data initial values
document.getElementById('faculty').focus();
document.getElementById('faculty').classList.add('active');
let button_value = 'faculty';

const ids = ['pcoe_female', 'pcoe_male', 'ou_female', 'ou_male'];

// below is data for gender table
let faculty_data = [61.4, 38.6, 49.6, 50.4];
let staff = [77.6, 22.4, 56.6, 43.4];
let both = [65.3, 34.7, 53.8, 46.2];

//values for the donut chart
let patton_progress = 19.0;
let ou_progress = 14.6;

const ou_faculty = 14.6,
    ou_staff = 9.1,
    ou_both = 11.3,
    pcoe_faculty = 19.0,
    pcoe_staff = 14.3,
    pcoe_both = 17.8;

const colors =  ['#e41a1c', '#377eb8']    

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
        .text(function (d) {
            return d
        })
        .attr('class', 'header')

    var rows = tbody.selectAll('tr')
        .data(data)
        .enter()
        .append('tr')

    var cells = rows.selectAll('td')
        .data(function (row) {
            return columns.map(function (column) {
                return {
                    column: column,
                    value: row[column]
                }
            })
        })
        .enter()
        .append('td')
        .text(function (d) {
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
        .data(function (row) {
            return columns.map(function (column) {
                return {
                    column: column,
                    value: row[column]
                }
            })
        })
        .enter()
        .append('td')
        .text(function (d) {
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
    d3.csv(file, function (data) {
        data.forEach(function (d) {
            d[''] = d[''];
            d["Patton College"] = +d["Patton College"];
            d["Ohio Univesity"] = +d["Ohio Univesity"];
        });
        var columns = ['', 'Patton College', 'Ohio Univesity']
        tabulate(data, columns)
    })
}

function reader_new(file) {
    d3.csv(file, function (d) {
        return {
            race: d[''],
            pcoe: +d['Patton College'],
            ou: +d['Ohio Univesity']
        };
    }, function (data) {
        updatetable(data);
    });
}

function linechart(type) {
    d3.csv("data/linechart.csv", function (error, data) {
        data = data.filter(function (d) {
            return d.type == type;
        })
        data.forEach(function (d) {
            d.year = parseDate(d.year);
            d.value = (+d.value).toFixed(1);
        });

        // creating domains and adding some padding so it looks better
        var minDate = d3.min(data, function (d) {
                return d.year.getTime();
            }),
            maxDate = d3.max(data, function (d) {
                return d.year.getTime();
            }),
            padding = (maxDate - minDate) * .05;

        var yExtent = d3.extent(data, function (d) {
                return d.value;
            }),
            yRange = yExtent[1] - yExtent[0];

        x.domain([minDate - padding, maxDate + padding]);
        y.domain([0, 25]);

          
        // Nest the entries by category
        var dataNest = d3.nest()
            .key(function (d) {
                return d.category;
            })
            .entries(data);

        // Nest the entries by category
        var dataNest = d3.nest()
            .key(function (d) {
                return d.category;
            })
            .entries(data);


        // set the colour scale
        var color = d3.scaleOrdinal(d3.schemeCategory10).range(colors);

        legendSpace = width / dataNest.length; // spacing for the legend

        // adding lines

        var lines = svg.selectAll('.line')
            .data(dataNest)

        lines.exit().remove()

        var viz = lines.enter()
            .append("path")
            .merge(lines)

        viz
            .transition().duration(550)
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke-width", 2)
            .style("stroke", function (d) {
                return color(d.key);
            })
            .attr("d", function (d) {
                return d3.line()
                    .x(function (d) {
                        return x(d.year);
                    })
                    .y(function (d) {
                        return y(+d.value);
                    })
                    .curve(d3.curveMonotoneX)
                    (d.values)
            });

        //adding points 

        var points = svg.selectAll('circle')
            .data(data)

        var points_viz = points.enter()
            .append('circle')
            .merge(points)

        points_viz
            .transition().duration(550)
            .attr("class", "dot")
            .attr("cx", function (d) {
                return x(d.year)
            })
            .attr("cy", function (d) {
                return y(d.value)
            })
            .attr("r", 4)
            .style("fill", function (d) {
                return color(d.category);
            });


        points.exit().remove();

        // adding value labels    

        texts = svg.selectAll("text")
            .data(data)

        texts.exit().remove();

        var text_viz = texts.enter()
            .append("text")
            .merge(texts)

        text_viz
            .transition().duration(550)
            .attr("x", function (d) {
                return x(d.year) - 5
            })
            .attr("y", function (d) {
                return y(d.value) - 7
            })
            .text(function (d) {
                return d.value
            });

            axis = svg.append("g");
            axis
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).ticks(d3.timeYear));
            
            svg.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(y).ticks(5).tickFormat(d => d + "%"));     

            //Adding legend manually
            svg.append("circle").attr("cx",legendSpace-25).attr("cy",230).attr("r", 6).style("fill", colors[1])
            svg.append("circle").attr("cx",legendSpace-25).attr("cy",260).attr("r", 6).style("fill", colors[0])
            svg.append("text").attr("x", legendSpace-5).attr("y", 230).text("PCOE").style("font-size", "15px").attr("alignment-baseline","middle")
            svg.append("text").attr("x", legendSpace-5).attr("y", 260).text("OHIO").style("font-size", "15px").attr("alignment-baseline","middle")

 

    });


}

//paremeters for line charts

var margin = {
        top: 30,
        right: 20,
        bottom: 70,
        left: 50
    },
    width = 950 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.timeParse("%Y");

// Set the ranges
var x = d3.scaleTime().rangeRound([0, width]);
var y = d3.scaleLinear().rangeRound([height, 0]);


// Adds the svg canvas
var svg = d3.select("#linechart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
  
 

// let's start loading stuff

reader('data/faculty.csv');
linechart('faculty');

// this is what happens when 'Faculty' button is clicked
document.getElementById('faculty').addEventListener('click', function () {
    this.classList.add('active');
    button_value = 'faculty';

    document.getElementById('staff').classList.remove('active');
    document.getElementById('both').classList.remove('active');

    patton_progress = pcoe_faculty;
    ou_progress = ou_faculty;

    $(function () {
        $("#patton").percircle({
            progressBarColor: "#CC3366",
            percent: patton_progress.toFixed(1)
        });
    });


    $(function () {
        $("#ou").percircle({
            percent: ou_progress.toFixed(1)
        });
    });

    linechart('faculty');

    reader_new('data/faculty.csv');
    var i;
    for (i = 0; i < ids.length; i++) {
        var countfaculty = new CountUp(ids[i], 0, faculty_data[i], 1);
        d3.select(ids[i]).html(countfaculty.start());
    }
})

// this is what happens when 'staff' button is clicked
document.getElementById('staff').addEventListener('click', function () {
    this.classList.add('active');
    button_value = 'staff';
    document.getElementById('faculty').classList.remove('active');
    document.getElementById('both').classList.remove('active');


    patton_progress = pcoe_staff;
    ou_progress = ou_staff;

    $(function () {
        $("#patton").percircle({
            progressBarColor: "#CC3366",
            percent: patton_progress.toFixed(1)
        });
    });


    $(function () {
        $("#ou").percircle({
            percent: ou_progress.toFixed(1)
        });
    });

    reader_new('data/staff.csv');
    linechart('staff');

    var i;
    for (i = 0; i < ids.length; i++) {
        var countstaff = new CountUp(ids[i], 0, staff[i], 1);
        d3.select(ids[i]).html(countstaff.start());
    }


})

// this is what happens when 'Both' button is clicked
document.getElementById('both').addEventListener('click', function () {

    this.classList.add('active');
    button_value = 'both';
    document.getElementById('faculty').classList.remove('active');
    document.getElementById('staff').classList.remove('active');

    patton_progress = pcoe_both;
    ou_progress = ou_both;

    $(function () {
        $("#patton").percircle({
            progressBarColor: "#CC3366",
            percent: patton_progress.toFixed(1)
        });
    });

    $(function () {
        $("#ou").percircle({
            percent: ou_progress.toFixed(1)
        });
    });


    reader_new('data/both.csv');
    linechart('both');

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

$(function () {
    $("#patton").percircle({
        progressBarColor: "#CC3366",
        percent: patton_progress.toFixed(1)
    });
});


$(function () {
    $("#ou").percircle({
        percent: ou_progress.toFixed(1)
    });
});


var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden");


d3.select("#pulsating")
    .on("mouseover", function () {
        return tooltip.style("visibility", "visible");
    })
    .on("mousemove", function () {
        tooltip
            .html(function () {
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
    .on("mouseout", function () {
        return tooltip.style("visibility", "hidden");
    });