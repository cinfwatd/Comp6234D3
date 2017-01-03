var data = {
  labels: [
    'Mechanical machinery', 'Cars', 'Electrical machinery','Medicinal & Pharma', 'Crude oil', 'Refined oil','Other misc','Scientific','Aircraft','Unspecified goods','Beverages','Vehicles excl. cars'
  ],
  series: [
    {
      label: '2014',
      values: [39.9, 25.9, 24.5, 21.1, 17.5, 15.3, 12.5, 11.1, 10.1, 9.1, 6.6, 6.3]
    },
    {
      label: '2015',
      values: [38.4, 25.6, 24.0, 24.5, 10.5, 10.4, 12.7, 11.3, 12.3, 10.2, 6.3, 6.4]
    },]
};

var chartWidth       = 200,
    barHeight        = 14,
    groupHeight      = barHeight * data.series.length,
    gapBetweenGroups = 10,
    spaceForLabels   = 160,
    spaceForLegend   = 100;

// Zip the series data together (first values, second values, etc.)
var zippedData = [];
for (var i=0; i<data.labels.length; i++) {
  for (var j=0; j<data.series.length; j++) {
    zippedData.push(data.series[j].values[i]);
  }
}

// Color scale
var color = d3.scale.category20();
var colorOne = ["#68829E","#E1B16A","#CE5A57"] 
var chartHeight = barHeight * zippedData.length + gapBetweenGroups * data.labels.length;
var x = d3.scale.linear()
    .domain([0, d3.max(zippedData)])
    .range([0, chartWidth]);
var y = d3.scale.linear()
    .range([chartHeight + gapBetweenGroups, 0]);
var yAxis = d3.svg.axis()
    .scale(y)
    .tickFormat('')
    .tickSize(0)
    .orient("left");
	
// Specify the chart area and dimensions
var chart = d3.select(".exportsByCommodityBar")
    .attr("width", spaceForLabels + chartWidth + spaceForLegend)
    .attr("height", chartHeight);

// Create bars
var bar = chart.selectAll("g")
    .data(zippedData)
    .enter().append("g")
    .attr("transform", function(d, i) {
      return "translate(" + spaceForLabels + "," + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/data.series.length))) + ")";
    });

// Create rectangles of the correct width
bar.append("rect")
    .attr("fill", function(d,i) { return colorOne[i % 2]; })
    .attr("class", "bar")
    .attr("width", x)
    .attr("height", barHeight -2)
	.attr("stroke", "#000000")
	.attr("stroke-width", "0.5");  	

// Add text label in bar
bar.append("text")
    .attr("x", function(d) { return x(d)-2; })
    .attr("y", barHeight/2 -1)
    .attr("fill", "black")
    .attr("dy", ".35em")
    .text(function(d) { return d; });

// Draw labels
bar.append("text")
    .attr("class", "label")
    .attr("x", function(d) { return - 10; })
    .attr("y", groupHeight / 2)
    .attr("dy", ".35em")
    .text(function(d,i) {
      if (i % data.series.length === 0)
        return data.labels[Math.floor(i/data.series.length)];
      else
        return ""});

chart.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + spaceForLabels + ", " + -gapBetweenGroups/2 + ")")
      .call(yAxis);

// Draw legend
var legendRectSize = 18,
    legendSpacing  = 4;

var legend = chart.selectAll('.legend')
    .data(data.series)
    .enter()
    .append('g')
    .attr('transform', function (d, i) {
        var height = legendRectSize + legendSpacing;
        var offset = -gapBetweenGroups/2;
        var horz = spaceForLabels + chartWidth + 40 - legendRectSize;
        var vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';
    });

legend.append('rect')
    .attr('width', legendRectSize)
    .attr('height', legendRectSize)
    .style('fill', function (d, i) { return colorOne[i % 3]; })
    .style('stroke', function (d, i) { return "#000000" })
	.attr("stroke-width", "0.5");
	

legend.append('text')
    .attr('class', 'legend')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(function (d) { return d.label; });