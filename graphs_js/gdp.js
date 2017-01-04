/**
 * Gross Domestic Product.
 */
var json_data = [{'values': [{'x': '2010', 'y': 0.5}, {'x': '2011', 'y': 0.6},
    {'x': '2012', 'y': 0.4}, {'x': '2013', 'y': 0.6}, {'x': '2014', 'y': 0.8},
    {'x': '2015', 'y': 0.3}, {'x': '2016', 'y': 0.4}], 'key': 'Quarter 1 (Jan to Mar)'},
    {'values': [{'x': '2010', 'y': 1.0}, {'x': '2011', 'y': 0.1}, {'x': '2012', 'y': -0.1},
        {'x': '2013', 'y': 0.5}, {'x': '2014', 'y': 0.9}, {'x': '2015', 'y': 0.5},
        {'x': '2016', 'y': 0.7}], 'key': 'Quarter 2 (Apr to June)'}, {'values': [{'x': '2010', 'y': 0.6},
        {'x': '2011', 'y': 0.4}, {'x': '2012', 'y': 1.1}, {'x': '2013', 'y': 0.8}, {'x': '2014', 'y': 0.8},
        {'x': '2015', 'y': 0.3}, {'x': '2016', 'y': 0.5}], 'key': 'Quarter 3 (July to Sept)'},
    {'values': [{'x': '2010', 'y': 0.1}, {'x': '2011', 'y': 0.2}, {'x': '2012', 'y': -0.2},
        {'x': '2013', 'y': 0.5}, {'x': '2014', 'y': 0.8}, {'x': '2015', 'y': 0.7}, {'x': '2016', 'y': 0.0}],
        'key': 'Quarter 4 (Oct to Dec)'}];

var chart;
nv.addGraph(function() {
    chart = nv.models.multiBarChart()
        .barColor(d3.scale.category20().range())
        .duration(300)
        .margin({bottom: 100, left: 70})
        .rotateLabels(45)
        .groupSpacing(0.1)
    ;

    chart.reduceXTicks(false).staggerLabels(true);

    chart.xAxis
        // .axisLabel("Years")
        .axisLabelDistance(35)
        .showMaxMin(false)
        .tickFormat(d3.format(''))
    ;

    chart.yAxis
        .axisLabel("Quarter-on-quarter percentage increase.")
        .axisLabelDistance(-5)
        .tickFormat(function (d){
            return d3.format("+.1%")(d/100);
        })
    ;

    chart.dispatch.on('renderEnd', function(){
        nv.log('Render Complete');
    });

    d3.select('#gdp1 svg')
        .attr("height", "500")
        .datum(json_data)
        .call(chart);

    nv.utils.windowResize(chart.update);

    chart.dispatch.on('stateChange', function(e) {
        nv.log('New State:', JSON.stringify(e));
    });
    chart.state.dispatch.on('change', function(state){
        nv.log('state', JSON.stringify(state));
    });

    return chart;
});