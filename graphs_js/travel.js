/**
 * Comp6234D3 Group 1
 */
 
/*---Top---*/
var chart;
var data;
var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var color_year = ["#706466","#68829E","#E1B16A","#325332"]

nv.addGraph(function() {
    chart = nv.models.lineChart()
        .options({
            duration: 300,
            useInteractiveGuideline: true
        })
    ;

    chart.xAxis
        .axisLabel('Month')
        .tickFormat(function (d) {
            return months[d];
        })
    ;

    chart.yAxis
        .axisLabel('Million (£)')
        .tickFormat(function(d) {
            if (d == null) {
                return 'N/A';
            }
            return d3.format(',f')(d);
        })
    ;

    data = setUpDataEar();

    d3.select('#chartEar').append('svg')
        .datum(data)
        .call(chart);

    nv.utils.windowResize(chart.update);

    drawBrexitLine();

    function drawBrexitLine(){
        var svg = d3.select("#chartEar svg");
        var height = parseInt(svg.style("height"), 10);
        var width = parseInt(svg.style("width"), 10);
        var margin = {top: 30, right: 0, bottom: 50, left: 0};
        var xScale = chart.xAxis.scale();
        var xValue = '5.72'; // Hard Code for 'Jun'
        svg.append("line")
            .attr("id","svgline")
            .style("stroke", "#FF0000")
            .attr("x1", xScale(xValue) + margin.left)
            .attr("y1", margin.top)
            .attr("x2", xScale(xValue) + margin.left)
            .attr("y2", height - margin.bottom);
        
        var text = "Brexit (2016)"
        d3.select("#chartEar svg")
            .append("text")
            .attr("id","svgtext")
            .attr("x", xScale(xValue) + margin.left)
            .attr("y", margin.top-10)
            .attr("text-anchor", "middle")
            .text(text);
    }

    return chart;
});

nv.addGraph(function() {
    chart = nv.models.lineChart()
        .options({
            duration: 300,
            useInteractiveGuideline: true
        })
    ;

    chart.xAxis
        .axisLabel('Month')
        .tickFormat(function (d) {
            return months[d];
        })
    ;

    chart.yAxis
        .axisLabel('Million (£)')
        .tickFormat(function(d) {
            if (d == null) {
                return 'N/A';
            }
            return d3.format(',f')(d);
        })
    ;

    data = setUpDataExp();

    d3.select('#chartExp').append('svg')
        .datum(data)
        .call(chart);

    nv.utils.windowResize(chart.update);

    drawBrexitLine();

    function drawBrexitLine(){
        var svg = d3.select("#chartExp svg");
        var height = parseInt(svg.style("height"), 10);
        var width = parseInt(svg.style("width"), 10);
        var margin = {top: 30, right: 0, bottom: 50, left: 0};
        var xScale = chart.xAxis.scale();
        var xValue = '5.72'; // Hard Code for 'Jun'
        svg.append("line")
            .attr("id","svgline")
            .style("stroke", "#FF0000")
            .attr("x1", xScale(xValue) + margin.left)
            .attr("y1", margin.top)
            .attr("x2", xScale(xValue) + margin.left)
            .attr("y2", height - margin.bottom);
        
        var text = "Brexit (2016)"
        d3.select("#chartExp svg")
            .append("text")
            .attr("id","svgtext")
            .attr("x", xScale(xValue) + margin.left)
            .attr("y", margin.top-10)
            .attr("text-anchor", "middle")
            .text(text);
    }

    return chart;
});

function setUpDataEar() {
    // Earnings in the UK by month (NSA)
    var raw_nsay2014 = [1405,1187,1320,1526,1791,2121,2669,2568,2178,1790,1571,1725],
        raw_nsay2015 = [1346,1043,1405,1604,2019,2195,2429,2473,2239,2028,1490,1802],
        raw_nsay2016 = [1305,1100,1306,1688,1958,2123,2530,2570,2110,1860,0,0];
    var nsay2014 = [],
        nsay2015 = [],
        nsay2016 = []
        ;

    for (var i = 0; i < 12; i++) {
        nsay2014.push({x: i, y: raw_nsay2014[i]});
        nsay2015.push({x: i, y: raw_nsay2015[i]});
        if(i<10) nsay2016.push({x: i, y: raw_nsay2016[i]});
    }

    return [
        {
            values: nsay2014,
            key: "Earnings (2014)",
            color: color_year[1]
        },
        {
            values: nsay2015,
            key: "Earnings (2015)",
            color: color_year[2]
        },
        {
            values: nsay2016,
            key: "Earnings (2016)",
            color: color_year[3]
        }
    ];
}

function setUpDataExp() {
    // Expenditure abroad by month (NSA)
    var raw_nsay2014 = [2323,2118,2281,2727,3053,3414,3543,4983,4150,3248,2019,1677],
        raw_nsay2015 = [2371,2071,2548,2901,3255,3690,4442,5506,4461,3445,2365,1972],
        raw_nsay2016 = [2448,2523,2607,3529,3489,3969,4550,6070,5200,4030,0,0];
    var nsay2014 = [],
        nsay2015 = [],
        nsay2016 = []
        ;

    for (var i = 0; i < 12; i++) {
        nsay2014.push({x: i, y: raw_nsay2014[i]});
        nsay2015.push({x: i, y: raw_nsay2015[i]});
        if(i<10) nsay2016.push({x: i, y: raw_nsay2016[i]});
    }

    return [
        {
            values: nsay2014,
            key: "Expenditure (2014)",
            color: color_year[1]
        },
        {
            values: nsay2015,
            key: "Expenditure (2015)",
            color: color_year[2]
        },
        {
            values: nsay2016,
            key: "Expenditure (2016)",
            color: color_year[3]
        }
    ];
}

function drawBrexitLine(chart){
    d3.selectAll("#svgline").remove();
    d3.selectAll("#svgtext").remove();
    var margin = {top: 0, right: 0, bottom: 0, left: 0};
    var xScale = chart.xAxis.scale();
    var xValue = 'Jun';
    svg.append("line")
        .attr("id","svgline")
        .style("stroke", "#000000")
        .attr("x1", xScale(xValue) + margin.left)
        .attr("y1", margin.top)
        .attr("x2", xScale(xValue) + margin.left)
        .attr("y2", height - margin.bottom);
    
    var text = "Brexit"
    d3.select("#chart1 svg")
        .append("text")
        .attr("id","svgtext")
        .style("stroke", "#34A853")
        .attr("x", xScale(xValue) + margin.left)
        .attr("y", margin.top-10)
        .attr("text-anchor", "middle")
        .text(text);
}
/*---Top---*/