var HttpClient = function HttpClient() {
    this.get = function (aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open("GET", aUrl, true);
        anHttpRequest.send(null);
    }
}

var DateFormat = function DateFormat(date) {
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();

    return year + '-' + month + '-' + day;
}

var FormatUrl = function FormatUrl(stock, epsDate, daysBefore, daysAfter, frequency) {

    var startDate = new Date(epsDate);
    startDate.setDate(startDate.getDate() - DAYS_BEFORE);
    var endDate = new Date(epsDate);
    endDate.setDate(endDate.getDate() + DAYS_AFTER);

    var url = 'https://www.quandl.com/api/v3/datasets/WIKI/' + stock + '/data.json?' + 'start_date=' + DateFormat(startDate) +
        '&end_date=' + DateFormat(endDate) + '&collapse=' + frequency +
        '&api_key=Hwre8eap-C9y6Yuofwn9';

    return url;
}

//TODO: Make these settings user provided
var stock = 'AAPL';
var DAYS_BEFORE = 7;
var DAYS_AFTER = 3;
var frequency = 'hourly'
//TODO: Needs to be user provided or pulled from other source(e.g. ) that has all epsDates
var epsDate = new Date(2010, 10, 18);
var url = FormatUrl(stock, epsDate, DAYS_BEFORE, DAYS_AFTER, frequency)

var ParseJSON = function ParseJSON(response) {

}

// var client = new HttpClient();
// client.get(url,
//     function (response) {
//         d3.json(JSON.parse(response), function (error, data) {
//             if (error) return console.warn(error);
//             graph(data);
//         });
//     });

d3.request(url, function (error, data) {
    if (error) return console.warn(error);
    graph(data);
});


//d3 stuff

// set the dimensions and margins of the graph
var margin = { top: 20, right: 20, bottom: 30, left: 50 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

//define the line
var parseTime = d3.timeParse("%y-%b-%d");

//set the ranges
var x = d3.scaleTime().rangeRound([0, width]);
var y = d3.scaleTime().rangeRound([height, 0]);

//define the line
var valueline = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

function graph(data) {
    var dParse = JSON.parse(data.response);
    data1 = dParse.dataset_data.data
    data1.forEach(function (d) {
        d.date = parseTime(d[0]);
        d.close = +d[4];
    });

    x.domain(d3.extent(data1, function (d) { return d.date; }));
    y.domain(d3.extent(data1, function (d) { return d.close; }));

    // Add the valueline path.
    svg.append("path")
        .data([data1])
        .attr("class", "line")
        .attr("d", valueline);
    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

}


