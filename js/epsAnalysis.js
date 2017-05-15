//helper functions
var HttpClient = function HttpClient() {
    this.get = function (aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open("GET", aUrl, true);
        // anHttpRequest.setRequestHeader('Access-Control-Allow-Origin', '*')
        anHttpRequest.send(null);
    }
}

var DateFormat = function DateFormat(date) {
    var day = date.getDate();
    //months in javascript are 0-11
    var month = date.getMonth();
    var year = date.getFullYear();

    return year + '-' + month + '-' + day;
}

var FormatQuandlUrl = function FormatQuandlUrl(stock, epsDate, daysBefore, daysAfter) {

    var dateSplit = epsDate().split("-");

    var startDate = new Date(dateSplit[2], dateSplit[0], dateSplit[1]);
    startDate.setDate(startDate.getDate() - daysBefore());
    var endDate =  new Date(dateSplit[2], dateSplit[0], dateSplit[1]);
    endDate.setDate(endDate.getDate() + daysAfter());

    var token = 'Hwre8eap-C9y6Yuofwn9';
    var order = 'asc';

    var url = 'https://www.quandl.com/api/v3/datasets/WIKI/' + stock() + '/data.json?' + 'start_date=' + DateFormat(startDate) +
        '&end_date=' + DateFormat(endDate) + '&order=' + order +
        '&api_key=' + token;

    return url;
}

var FormatSIUrl = function FormatSIUrl(stock) {

    var url = 'https://www.streetinsider.com/dr/eps-ticker.php?q=' + stock;

    return url;
}

//data binding
function observable(value) {
    var listeners = [];

    function notify(newValue) {
        listeners.forEach(function (listener) { listener(newValue); });
    }

    function accessor(newValue) {
        if (arguments.length && newValue !== value) {
            value = newValue;
            notify(newValue);
        }
        return value;
    }

    accessor.subscribe = function (listener) { listeners.push(listener); };

    return accessor;
}

function bindValue(input, observable) {
    var initial = observable();
    input.value = initial;
    observable.subscribe(function () { input.value = observable(); });

    var converter = function (v) { return v; }
    if (typeof initial == 'number') {
        converter = function (n) { return isNaN(n = parseFloat(n)) ? 0 : n; };
    }

    input.addEventListener('input', function () {
        observable(converter(input.value));
    });
}

var stockText = document.getElementById('inputs').querySelector('#stock');
var epsText = document.getElementById('inputs').querySelector('#eps');
var beforeEPSText = document.getElementById('inputs').querySelector('#beforeEPS');
var afterEPSText = document.getElementById('inputs').querySelector('#afterEPS');

var stock = observable('AAPL');
//mm-dd-yyyy
var epsDate = observable('10-18-2010');
var daysBeforeEPS = observable(10);
var daysAfterEPS = observable(10);

bindValue(stockText, stock);
bindValue(epsText, epsDate);
bindValue(beforeEPSText, daysBeforeEPS);
bindValue(afterEPSText, daysAfterEPS);

//TODO: Needs to be pulled from other source that has epsDates
var qUrl = FormatQuandlUrl(stock, epsDate, daysBeforeEPS, daysAfterEPS);
// var siUrl = FormatSIUrl(stock);

// var client = new HttpClient();
// client.get(fcUrl,
//     function (response) {
//         d3.json(JSON.parse(response), function (error, data) {
//             if (error) return console.warn(error);
//             graphAll(data);
//         });
//     });

//d3 stuff
// d3.request(siUrl, function (error, data) {
//     if (error) return console.warn(error);
//     graphAll(data);
// })

d3.request(qUrl, function (error, data) {
    if (error) return console.warn(error);
    graphAll(data);
});

var parseTime = d3.timeParse("%Y-%m-%d");

function parseQuandlData(raw_data) {
    var data1 = JSON.parse(raw_data.response).dataset_data.data;
    var dates = [];
    var opens = [];
    var highs = [];
    var lows = [];
    var closes = [];
    // var epsDates = [];

    data1.forEach(function (d) {
        // epsDates.push(window.epsDate);
        //unadjusted
        // opens.push(d[1]);
        // highs.push(d[2]);
        // lows.push(d[3]);
        // closes.push(d[4]);
        //adjusted
        dates.push(parseTime(d[0]));
        opens.push(d[8]);
        highs.push(d[9]);
        lows.push(d[10]);
        closes.push(d[11]);
    });
    // var eps = [];
    // eps.push(Math.max.apply(Math, highs));
    // eps.push(Math.min.apply(Math, lows));

    dataArray = [{
        label: " Adj. Close",
        x: dates,
        y: closes
    },
    {
        label: "Adj. Open",
        x: dates,
        y: opens
    },
    {
        label: "Adj. High",
        x: dates,
        y: highs
    },
    {
        label: "Adj. Low",
        x: dates,
        y: lows
    }/*,
    {
        label: "EPS Date",
        x: epsDates,
        y: eps
    }*/
    ];
    return dataArray;
}

var width = 970,
    height = 500;
var margin = { top: 20, right: 80, bottom: 30, left: 100 },
    innerwidth = width - margin.left - margin.right,
    innerheight = height - margin.top - margin.bottom;

function scaleX(data) {
    return d3.scaleTime()
        .range([0, innerwidth])
        .domain([d3.min(data, function (d) { return d3.min(d.x); }),
        d3.max(data, function (d) { return d3.max(d.x); })]);
}

function scaleY(data) {
    return d3.scaleLinear()
        .range([innerheight, 0])
        .domain([d3.min(data, function (d) { return d3.min(d.y); }),
        d3.max(data, function (d) { return d3.max(d.y); })]);
}

function color_scalef(data) {
    return d3.scaleOrdinal(d3.schemeCategory10)
        .domain(d3.range(data.length));
}

function drawline(svg, data, x_scale, y_scale, color_scale) {

    var draw_line = d3.line()
        .x(function (d) { return x_scale(d[0]); })
        .y(function (d) { return y_scale(d[1]); });

    var data_lines = svg.selectAll(".d3_xy_chart_line")
        .data(data.map(function (d) { return d3.zip(d.x, d.y); }))
        .enter().append("g")
        .attr("class", "d3_xy_chart_line");

    var color_scale = color_scalef(data);
    var line_thickness = ["2px", "2px", "2px", "2px", "5px"];
    var dash_array = [0, 0, 0, 0, 2];

    data_lines.append("path")
        .attr("class", "line")
        .attr("d", function (d) { return draw_line(d); })
        .attr("stroke", function (_, i) { return color_scale(i); })
        .attr("stroke-width", function (_, i) { return line_thickness[i] })
        .attr("stroke-dasharray", function (_, i) { return dash_array[i] });

    return data_lines;

}

function makeSVG(obj, data) {

    var xlabel = "X Axis Label",
        ylabel = "Y Axis Label";

    var x_scale = scaleX(data);
    var y_scale = scaleY(data);

    var x_axis = d3.axisBottom(x_scale)
    var y_axis = d3.axisLeft(y_scale)

    var x_grid = d3.axisBottom(x_scale)
        .tickSize(-innerheight)
        .tickFormat("");

    var y_grid = d3.axisLeft(y_scale)
        .tickSize(-innerwidth)
        .tickFormat("");

    var svg = d3.select(obj)
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("class", "x grid")
        .attr("transform", "translate(0," + innerheight + ")")
        .call(x_grid);

    svg.append("g")
        .attr("class", "y grid")
        .call(y_grid);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + innerheight + ")")
        .call(x_axis.tickFormat(d3.timeFormat("%m-%d-%Y")))
        .append("text")
        .attr("dy", "-.71em")
        .attr("x", innerwidth)
        .style("text-anchor", "end")
        .text(xlabel);

    svg.append("g")
        .attr("class", "y axis")
        .call(y_axis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .style("text-anchor", "end")
        .text(ylabel);

    return svg;
}

//graphs open/close/high/low for one EPS announcement date
function graphAll(data) {

    var data2 = parseQuandlData(data);

    var xy_chart = d3_xy_chart()
        .width(970)
        .height(500)
        .xlabel("X Axis")
        .ylabel("Y Axis");

    d3.select("svg").remove();

    var svg = d3.select("#chart").append("svg")
        .datum(data2)
        .call(xy_chart);

    function d3_xy_chart() {

        function chart(selection) {
            selection.each(function (datasets) {

                // Create the plot. 
                var x_scale = scaleX(datasets);
                var y_scale = scaleY(datasets);

                svg = makeSVG(this, datasets);

                //add lines to chart
                drawline(svg, datasets, x_scale, y_scale);

                //using susie lu's d3-legend.js
                var color_scale = color_scalef(datasets);
                var labels = [];
                var colors = [];
                datasets.forEach(function (d, i) {
                    labels.push(d.label);
                    colors.push(color_scale(i))
                });

                var ordinal = d3.scaleOrdinal()
                    .domain(labels)
                    .range(colors);

                var svg = d3.select("svg");

                svg.append("g")
                    .attr("class", "legendOrdinal")
                    .attr("transform", "translate(900,25)");

                var legendOrdinal = d3.legendColor()
                    .shape("path", d3.symbol().type(d3.symbolSquare).size(150)())
                    .shapePadding(10)
                    //use cellFilter to hide the "e" cell
                    .cellFilter(function (d) { return d.label !== "e" })
                    .scale(ordinal);

                svg.select(".legendOrdinal")
                    .call(legendOrdinal);
            });

        }

        chart.width = function (value) {
            if (!arguments.length) return width;
            width = value;
            return chart;
        };

        chart.height = function (value) {
            if (!arguments.length) return height;
            height = value;
            return chart;
        };

        chart.xlabel = function (value) {
            if (!arguments.length) return xlabel;
            xlabel = value;
            return chart;
        };

        chart.ylabel = function (value) {
            if (!arguments.length) return ylabel;
            ylabel = value;
            return chart;
        };

        return chart;
    }

    document.getElementById('inputs').querySelector('#update').addEventListener("click", refreshGraph, false);
}

function refreshGraph() {

    var qUrl = FormatQuandlUrl(stock, epsDate, daysBeforeEPS, daysAfterEPS);
    d3.request(qUrl, function (error, data) {
        if (error) return console.warn(error);
        graphAll(data);
    });

}

//graphs all close data for a given stock for all known EPS dates
//x-axis is standarized as days from EPS announcement date
function graphClose(data) {
}



