<!DOCTYPE html>

<?php include_once($_SERVER["DOCUMENT_ROOT"]."/nav/nav.php"); ?>

  <html>

  <head>
    <link href="/css/page.css" rel=stylesheet type="text/css">
    <title>Projects</title>
  </head>

  <body>
    <div class="container">
      <p class="text-justify">
        <h1>PROJECTS</h1>
      </p>
    </div>
  </body>

  <script>
    var DateFormat = function(date) {
      var day = date.getDate();
      var month = date.getMonth();
      var year = date.getFullYear();

      return year + '-' + month + '-' + day;
    }

    var HttpClient = function() {
      this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() {
          if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
            aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open("GET", aUrl, true);
        anHttpRequest.send(null);
      }
    }

    var stock = 'AAPL';
    var DAYS_BEFORE = 7;
    var DAYS_AFTER = 3;
    var epsDate = new Date(2010, 10, 18);
    var startDate = new Date(epsDate);
    startDate.setDate(startDate.getDate() - DAYS_BEFORE);
    var endDate = new Date(epsDate);
    endDate.setDate(endDate.getDate() + DAYS_AFTER);
    var client = new HttpClient();
    var url = 'https://www.quandl.com/api/v3/datasets/WIKI/' + stock + '/data.json?' + 'start_date=' + DateFormat(startDate) +
      '&end_date=' + DateFormat(endDate) +
      '&api_key=Hwre8eap-C9y6Yuofwn9'


    client.get(url,
      function(response) {
        alert(response);
      });
  </script>

  </html>