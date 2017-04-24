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
 
 var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}

var client = new HttpClient();
client.get('https://www.quandl.com/api/v3/datasets/WIKI/FB/data.json?api_key=Hwre8eap-C9y6Yuofwn9',function(response){
  alert(response);
});

 </script>

  </html>