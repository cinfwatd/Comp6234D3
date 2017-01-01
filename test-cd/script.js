/**
 * Created by cdogakz on 01/01/2017.
 */
// ===================== chart 3 ===============================
// var svg = d3.select("#chart3").append("svg");
// svg.attr("width", 960), svg.attr("height", 500);
//
// var margin = {top: 20, right: 20, bottom: 30, left: 40},
//     width = +svg.attr("width") - margin.left - margin.right,
//     height = +svg.attr("height") - margin.top - margin.bottom;
//
// var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
//     y = d3.scaleLinear().rangeRound([height, 0]);
//
// var g = svg.append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
// // svg.append("text")
// //     .attr("transform",
// //         "translate(" + (width/2) + " ," +
// //         (height + margin.top + 20) + ")")
// //     .style("text-anchor", "middle")
// //     .text("Date");
//
// d3.csv("uk_gdp.csv", function(d) {
//     d.QoQG = +d.QoQG / 100;
//     return d;
// }, function(error, data) {
//     if (error) throw error;
//
//     x.domain(data.map(function(d) { return d.Quarter; }));
//     y.domain([0, d3.max(data, function(d) { return d.QoQG; })]);
//
//     g.append("g")
//         .attr("class", "axis axis--x")
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3.axisBottom(x));
//
//     // var p = d3.precisionRound(0.1, 1.1),
//     //     f = d3.format("." + p + "%");
//     g.append("g")
//         .attr("class", "axis axis--y")
//         .call(d3.axisLeft(y).ticks(10, ".00p"))
//         .append("text")
//         .attr("transform", "rotate(-90)")
//         .attr("y", 6)
//         .attr("dy", "0.71em")
//         .attr("text-anchor", "end")
//         .text("QoQG");
//
//     g.selectAll(".bar")
//         .data(data)
//         .enter().append("rect")
//         .attr("class", "bar")
//         .attr("x", function(d) { return x(d.Quarter); })
//         .attr("y", function(d) { return y(d.QoQG); })
//         .attr("width", x.bandwidth())
//         .attr("height", function(d) { return height - y(d.QoQG); });
// });

//==============================chart 4===================================.

var svg = d3.select("#chart4").append("svg"),
    svg_width = 960, svg_height = 500;
svg.attr("width", svg_width);
svg.attr("height", svg_height);

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = svg_width - margin.left - margin.right,
    height = svg_height - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x0 = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.1);

var x1 = d3.scaleBand()
    .padding(0.05);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

// var colors = d3.scaleOrdinal()
//     .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var colors = d3.scaleOrdinal()
    .range(["#7b6888", "#6b486b", "#a05d56", "#d0743c"]);

var center = d3.scaleLinear()
    .range([0, width]);


d3.csv("uk_gdp_group.csv", function(d, i, columns) {
    for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]] / 100;
    return d;
}, function(error, data) {
    if (error) throw error;

    var keys = data.columns.slice(1);

    x0.domain(data.map(function(d) { return d.Year; }));
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);
    y.domain([d3.min(data, function(d) { return d3.min(keys, function(key) { return d[key]; }); }),
        d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

    g.append("g")
        .selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function(d) { return "translate(" + x0(d.Year) + ",0)"; })
        .selectAll("rect")
        .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
        .enter().append("rect")
        .attr("x", function(d) { return x1(d.key); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", x1.bandwidth())
        .attr("height", function(d) { return height - y(d.value); })
        .attr("fill", function(d) { return colors(d.key); });

    g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x0));

    g.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y).ticks(null, "+%"))
        .append("text")
        .attr("x", 2)
        .attr("y", y(y.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .text("Percentage");

    var legend = g.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys.slice().reverse())
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", colors);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function(d) { return d; });
});