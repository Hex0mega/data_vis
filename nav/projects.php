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
        <h1>Earnings Announcements</h1>
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



    <?php
    //PHPinfo();
    
    // $proxies = array(); // Declaring an array to store the proxy list
    
    // Adding list of proxies to the $proxies array
    // $proxies[] = '159.224.83.100:8080';  // Some proxies require user, password, IP and port number
    // $proxies[] = '88.198.24.108:1080';
    // $proxies[] = '93.190.253.50:80';
    // $proxies[] = '5.228.190.196:8081';  // Some proxies only require IP
    // $proxies[] = '5.9.21.245:3128';// Some proxies require IP and port number
    
    // $user_agent = [
    // 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13',
    // 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36',
    // 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:41.0) Gecko/20100101 Firefox/41.0',
    // 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36',
    // 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36',
    // 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.71 Safari/537.36',
    // 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11) AppleWebKit/601.1.56 (KHTML, like Gecko) Version/9.0 Safari/601.1.56',
    // 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36',
    // 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/601.2.7 (KHTML, like Gecko) Version/9.0.1 Safari/601.2.7',
    // 'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko',
    // 'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko',
    // 'Mozilla/5.0 (compatible, MSIE 11, Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko',
    // 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/5.0)',
    // ];
    
    // $ch = curl_init();
    // // curl_setopt($ch, CURLOPT_PROXY, array_rand($proxies));
    // curl_setopt($ch, CURLOPT_URL, 'https://www.streetinsider.com/ec_earnings.php?q=V');
    // curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 	// return web page
    // curl_setopt($ch, CURLOPT_HEADER, false); 	//return headers in addition to content
    // curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); 	// follow redirects
    // curl_setopt($ch, CURLOPT_ENCODING, "");		// handle all encodings
    // curl_setopt($ch, CURLOPT_AUTOREFERER, true); 	// set referer on redirect
    // curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 120); 		// timeout on connect
    // curl_setopt($ch, CURLOPT_TIMEOUT, 120); 		// timeout on response
    // curl_setopt($ch, CURLOPT_MAXREDIRS, 10);		// stop after 10 redirects
    // curl_setopt($ch, CURLINFO_HEADER_OUT, true);
    // curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); 	// Disabled SSL Cert checks
    // curl_setopt($ch,CURLOPT_SSL_VERIFYHOST, false);
    // curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
    // curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36");
    // curl_setopt($ch, CURLOPT_HTTPPROXYTUNNEL, true);
    
    // $data = curl_exec($ch);

// echo curl_error($ch);
// print_r(curl_getinfo($ch));

    // file_put_contents("text.txt", $data);
    
    // $test= "test";
    // echo $test;
    // echo $data;
    
    // curl_close($ch);
    ?>

      <div id="chart" align="center"></div>
  </body>

  </html>