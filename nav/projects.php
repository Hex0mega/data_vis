<!DOCTYPE html>

<?php include_once($_SERVER["DOCUMENT_ROOT"]."/nav/nav.php");?>

  <html>

  <head>
    <link href="/css/projects.css" rel=stylesheet type="text/css">
    <script src="https://d3js.org/d3.v4.min.js"></script>
    <script type="text/javascript" src="../node_modules/d3-svg-legend/d3-legend.js"></script>

    <title>Projects</title>
  </head>

  <body>
    <div class="container">
      <p class="text-justify">
        <h1>EPS ANNOUNCEMENT DATE</h1>
      </p>
    </div>

    <div class="inputs" id="inputs">
      <label for="stock">Stock Symbol</label>
      <input id="stock" type="text" style="text-transform:uppercase">

      <label for="eps">EPS Date</label>
      <input id="eps" type="text">

      <label for="beforeEPS">Days Before EPS</label>
      <input id="beforeEPS" type="text">

      <label for="afterEPS">Days After EPS</label>
      <input id="afterEPS" type="text">
      <button id="update">Update</button>
    </div>

    <script type="text/javascript" src="../js/epsAnalysis.js"></script>

    <div id="chart" align="center"></div>
  </body>

  </html>