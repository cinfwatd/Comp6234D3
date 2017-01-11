//set margin 
var margin = {top: 30, right: 70, bottom: 130, left: 70},
    width = 960 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// Parse date / time
var parseDate = d3.time.format("%d/%m/%Y").parse;

// Define the ranges
var quarter = function(date, i){
        var date2 = new Date();
        var yearly = date2.getFullYear()
        date2.setMonth(date.getMonth() +1);
        q = Math.ceil(( date2.getMonth()) / 3 );
        if (i === 0) { 
            return "Q1/2015";
        } else if (i < 4) { 
            var yearly1 = Math.ceil(yearly - 2);
            return "Q" + q + "/" +  yearly1;
        } else { 
            var yearly2 = Math.ceil(yearly - 1);
            if (i > 7) {
                return "Q1/2017";
            } else {
                return "Q" + q + "/" +  yearly2;
            }
        }
}         

var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);
var y2 = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis()
	.scale(x)
    .orient("bottom").tickFormat(quarter);

var yAxis = d3.svg.axis()
	.scale(y)
    .orient("left").ticks(10);

var yAxis2 = d3.svg.axis()
    .scale(y2)
    .orient("right").ticks(10);

// Define the line
var valueline = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.exchange);});

	var growthline = d3.svg.line()
	.x(function(d) { return x(d.date); })
	.y(function(d) { return y2(d.growth); }); 

// Add gridlines 
function make_x_axis() {        
    return d3.svg.axis()
        .scale(x)
         .orient("bottom")
         .ticks(8)
}

function make_y_axis() {        
    return d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(0)
}

// Adds the svg canvas
var svg = d3.select(".currency")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");


d3.csv("../test-jas/Cur_Data_Clean_short.csv", function(error, data){ 
	data.forEach(function(d){ 
			d.date = parseDate(d['date']); 
			d.exchange = +d['GBPtoUSD'];
			d.growth = +d['growthRate']; 
	});
	
	// Scale the range of the data

	x.domain(d3.extent(data, function(d) { return d.date; }));
	y.domain([1, d3.max(data, function(d) { return Math.max(d.exchange);})]);
	y2.domain([-0.1, 0.25]); //hard coded second y-axis	domain


    // Add the valueline path.
    svg.append("path")
        .attr("class", "line")
        .attr("d", valueline(data));

    // Add the growthline path
	svg.append("path")
	   	.attr("class", "line")
	   	.style("stroke", "#002db3")
	   	.attr("d", growthline(data));


    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + 1.025*height + ")")
        .call(xAxis)

    // Add the Y Axis (left)
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

	svg.append("text")
    	.attr("text-anchor", "middle")  
    	.attr("transform", "translate(" + (0-margin.left/1.3) +","+(height/2)+")rotate(-90)")  
    	.text("Value of £1 in Dollars");


    // Add the second Y Axis (right)
 	svg.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(" + (width - margin.right/100)  + " ,0)") //hard-coded axis 2 position
		.style("fill","#002db3")		        
		.call(yAxis2);

	svg.append("text")
    	.attr("text-anchor", "middle")  
    	.attr("transform", "translate(" + (width + (margin.right)) +","+(height/2)+")rotate(-90)")  
    	.text("Growth Rate");


    //Add gridlines
    svg.append("g")         
        .attr("class", "grid")
        .attr("transform", "translate(0," + height + ")")
        .call(make_x_axis()
            .tickSize(-height, 0, 0)
            .tickFormat("")
        )

    svg.append("g")         
        .attr("class", "grid")
        .call(make_y_axis()
            .tickSize(-width, 0, 0)
            .tickFormat("")
        )

    // Add brexit indicator line
   var brexit = parseDate("23/06/2016");

   svg.append("line")
	    .style("stroke-width", 1.5)
		.style("stroke", "red")
	    .attr("x1", x(brexit))
	    .attr("y1", 0)
	    .attr("x2", x(brexit))
	    .attr("y2", height*1.025);
    
   var text = "Brexit"

   d3.select("svg")
        .append("text")
        //.style("stroke", "black")
        .attr("x", x(brexit) + margin.left)
        .attr("y", margin.top-15)
        .attr("text-anchor", "middle")
        .text(text);

});