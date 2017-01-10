var margin = {top: 30, right: 50, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format("%d/%m/%Y").parse;

// Set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);
var y2 = d3.scale.linear().range([height, 0]);


// Define the axes
var xAxis = d3.svg.axis()
	.scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
	.scale(y)
    .orient("left").ticks(10);

var yAxis2 = d3.svg.axis()
    .scale(y2)
    .orient("right").ticks(8);

// Define the line
var valueline = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.exchange);});

	var growthline = d3.svg.line()
	.x(function(d) { return x(d.date); })
	.y(function(d) { return y2(d.growth); }); 
    
// Adds the svg canvas
var svg = d3.select(".currency")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

var parseDate = d3.time.format('%d/%m/%Y').parse;

d3.csv("../test-jas/Cur_Data_Clean.csv", function(error, data){ 
	data.forEach(function(d){ 
			d.date = parseDate(d['date']); 
			d.exchange = +d['GBPtoUSD'];
			d.growth = +d['growthRate']; 
	});
	
	// Scale the range of the data

	x.domain(d3.extent(data, function(d) { return d.date; }));
	y.domain([0 , d3.max(data, function(d) { return Math.max(d.exchange);})]);
	y2.domain([-0.08, 0.08]); //hard coded second y-axis	domain


    // Add the valueline path.
    svg.append("path")
        .attr("class", "line")
        .attr("d", valueline(data));

    // Add the growthline path
	svg.append("path")
	   	.attr("class", "line")
	   	.style("stroke", "blue")
	   	.attr("d", growthline(data));


    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);


    // Add the Y Axis (left)
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

	svg.append("text")
    	.attr("text-anchor", "middle")  
    	.attr("transform", "translate(" + (0-margin.left/1.5) +","+(height/2)+")rotate(-90)")  
    	.text("Exchange Rate");


    // Add the second Y Axis (right)
 	svg.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(" + (width - margin.right/100)  + " ,0)") //hard-coded axis 2 position
		.style("fill", "red")		        
		.call(yAxis2);

	svg.append("text")
    	.attr("text-anchor", "middle")  
    	.attr("transform", "translate(" + (width + margin.right) +","+(height/2)+")rotate(-90)")  
    	.text("Growth Rate");

    // Add legend

//           	var legend = svg.append("g")
//	 			.attr("class", "legend")
//	 			.attr("x", w - 65)
//	 			.attr("y", 25)
//	 			.attr("height", 100)
//	 			.attr("width", 100);
//
//			legend.selectAll('g').data(dataset)
//    		  	.enter()
//    		  	.append('g')
//    		  	.each(function(d, i) {
//    		  	  var g = d3.select(this);
//    		  	  g.append("rect")
//    		  	    .attr("x", w - 65)
//    		  	    .attr("y", i*25)
//    		  	    .attr("width", 10)
//    		  	    .attr("height", 10)
//    		  	    .style("fill", color_hash[String(i)][1]);
//    		  	  
//    		  	  g.append("text")
//    		  	    .attr("x", w - 50)
//    		  	    .attr("y", i * 25 + 8)
//    		  	    .attr("height",30)
//    		  	    .attr("width",100)
//    		  	    .style("fill", color_hash[String(i)][1])
//    		  	    .text(color_hash[String(i)][0]);
//			
//    		  });
//

   var brexit = parseDate("23/06/2016");

   svg.append("line")
	    .style("stroke-width", 1.5)
		.style("stroke", "red")
	    .attr("x1", x(brexit))
	    .attr("y1", 0)
	    .attr("x2", x(brexit))
	    .attr("y2", height);
    
   var text = "Brexit"

   d3.select("svg")
        .append("text")
        .style("stroke", "black")
        .attr("x", x(brexit) + margin.left)
        .attr("y", margin.top-10)
        .attr("text-anchor", "middle")
        .text(text);

});