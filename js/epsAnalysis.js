//helper functions
var HttpClient = function HttpClient() {
    this.get = function (aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open("GET", aUrl, true);
        anHttpRequest.setRequestHeader('Access-Control-Allow-Origin', 'http//localhost:8000')
        anHttpRequest.setRequestHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,DELETE,PUT,HEAD');
        // anHttpRequest.setRequestHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept');
        // anHttpRequest.setRequestHeader('Access-Control-Max-Age', '1728000');
        // anHttpRequest.withCredentials = false;

        anHttpRequest.send(null);
    }
}

var DateFormat = function DateFormat(date) {
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();

    return year + '-' + month + '-' + day;
}

var FormatQuandlUrl = function FormatQuandlUrl(stock, epsDate, daysBefore, daysAfter, order) {

    var startDate = new Date(epsDate);
    startDate.setDate(startDate.getDate() - DAYS_BEFORE);
    var endDate = new Date(epsDate);
    endDate.setDate(endDate.getDate() + DAYS_AFTER);

    var token = 'Hwre8eap-C9y6Yuofwn9'

    var url = 'https://www.quandl.com/api/v3/datasets/WIKI/' + stock + '/data.json?' + 'start_date=' + DateFormat(startDate) +
        '&end_date=' + DateFormat(endDate) + '&order=' + order +
        '&api_key=' + token;

    return url;
}

var FormatSIUrl = function FormatSIUrl(stock, epsDate, daysBefore, daysAfter, order) {

    var url = 'https://www.streetinsider.com/dr/eps-ticker.php?q=' + stock;

    return url;
}

//TODO: Make these settings user accessible
var stock = 'AAPL';

//TODO: Needs to be pulled from other source(e.g. ) that has all epsDates
var epsDate1 = new Date(2010, 10, 18);
order = 'asc';
var DAYS_BEFORE = 10;
var DAYS_AFTER = 10;
var qUrl = FormatQuandlUrl(stock, epsDate1, DAYS_BEFORE, DAYS_AFTER, order)
var siUrl = FormatSIUrl(stock);

var client = new HttpClient();
client.get(siUrl,
    function (response) {
        d3.json(JSON.parse(response), function (error, data) {
            if (error) return console.warn(error);
            graph(data);
        });
    });

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

//graphs open/close/high/low for one EPS announcement date
function graphAll(data) {
    var data1 = JSON.parse(data.response).dataset_data.data;

    var dates = [];
    var opens = [];
    var highs = [];
    var lows = [];
    var closes = [];

    data1.forEach(function (d) {
        dates.push(parseTime(d[0]));
        opens.push(d[1]);
        highs.push(d[2]);
        lows.push(d[3]);
        closes.push(d[4]);
    });

    data2 = [{
        label: "Closes",
        x: dates,
        y: closes
    },
    {
        label: "Opens",
        x: dates,
        y: opens
    },
    {
        label: "Highs",
        x: dates,
        y: highs
    },
    {
        label: "Lows",
        x: dates,
        y: lows
    }
    ];

    var xy_chart = d3_xy_chart()
        .width(960)
        .height(500)
        .xlabel("X Axis")
        .ylabel("Y Axis");
    var svg = d3.select("#chart").append("svg")
        .datum(data2)
        .call(xy_chart);

    function d3_xy_chart() {
        var width = 640,
            height = 480,
            xlabel = "X Axis Label",
            ylabel = "Y Axis Label";

        function chart(selection) {
            selection.each(function (datasets) {
                //
                // Create the plot. 
                //
                var margin = { top: 20, right: 80, bottom: 30, left: 100 },
                    innerwidth = width - margin.left - margin.right,
                    innerheight = height - margin.top - margin.bottom;

                var x_scale = d3.scaleTime()
                    .range([0, innerwidth])
                    .domain([d3.min(datasets, function (d) { return d3.min(d.x); }),
                    d3.max(datasets, function (d) { return d3.max(d.x); })]);

                var y_scale = d3.scaleLinear()
                    .range([innerheight, 0])
                    .domain([d3.min(datasets, function (d) { return d3.min(d.y); }),
                    d3.max(datasets, function (d) { return d3.max(d.y); })]);

                // var color_scale = d3.scale.category10()
                //     .domain(d3.range(datasets.length));

                var color_scale = d3.scaleOrdinal(d3.schemeCategory10)
                    .domain(d3.range(datasets.length));

                // var x_axis = d3.svg.axis()
                //     .scale(x_scale)
                //     .orient("bottom");

                var x_axis = d3.axisBottom(x_scale)

                // var y_axis = d3.svg.axis()
                //     .scale(y_scale)
                //     .orient("left");

                var y_axis = d3.axisLeft(y_scale)

                // var x_grid = d3.svg.axis()
                //     .scale(x_scale)
                //     .orient("bottom")
                //     .tickSize(-innerheight)
                //     .tickFormat("");

                var x_grid = d3.axisBottom(x_scale)
                    .tickSize(-innerheight)
                    .tickFormat("");

                var y_grid = d3.axisLeft(y_scale)
                    .tickSize(-innerwidth)
                    .tickFormat("");

                // var draw_line = d3.svg.line
                //     .interpolate("basis")
                //     .x(function (d) { return x_scale(d[0]); })
                //     .y(function (d) { return y_scale(d[1]); });

                var draw_line = d3.line()
                    .x(function (d) { return x_scale(d[0]); })
                    .y(function (d) { return y_scale(d[1]); });

                // var draw_line = d3.line()
                //     .interpolate("basis")
                //     .x(function (d) { return x_scale(d[0]); })
                //     .y(function (d) { return y_scale(d[1]); });

                var svg = d3.select(this)
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
                    .attr("data-legend", function (d) { return d.name });

                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + innerheight + ")")
                    .call(x_axis.tickFormat(d3.timeFormat("%d-%m-%Y")))
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

                var data_lines = svg.selectAll(".d3_xy_chart_line")
                    .data(datasets.map(function (d) { return d3.zip(d.x, d.y); }))
                    .enter().append("g")
                    .attr("class", "d3_xy_chart_line");

                data_lines.append("path")
                    .attr("class", "line")
                    .attr("d", function (d) { return draw_line(d); })
                    .attr("stroke", function (_, i) { return color_scale(i); });

                data_lines.append("text")
                    .datum(function (d, i) { return { name: datasets[i].label, final: d[d.length - 1] }; })
                    .attr("transform", function (d) {
                        return ("translate(" + x_scale(d.final[0]) + "," +
                            y_scale(d.final[1]) + ")");
                    })
                    .attr("x", 3)
                    .attr("dy", ".35em")
                    .attr("fill", function (_, i) { return color_scale(i); })
                    .text(function (d) { return d.name; });

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

    //graphs all close data for a given stock for all known EPS dates
    //x-axis is standarized as days from EPS announcement date
    function graphClose(data) {
        var blah;
    }


}


