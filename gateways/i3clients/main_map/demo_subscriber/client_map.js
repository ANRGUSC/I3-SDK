/********************************INITIALIZE MAP*************************************************/
    function setTimer() {
        setInterval(function(){ 
	time.setSeconds(time.getSeconds() + 60);
	document.getElementById("time").innerHTML = time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});}, 500);
    }



    function initMap() {
 	// Create a new StyledMapType object, passing it an array of styles,
        // and the name to be displayed on the map type control.
        //var styledMapType = new google.maps.StyledMapType(mapStyle,{name: 'Styled Map'});


	//time
	document.getElementById("time").innerHTML = time.toLocaleTimeString();
	setTimer();
	//create map
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: {lat: 34.0522, lng: -118.2437},
	  mapTypeControlOptions: {
          	//mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']  }
		mapTypeIds: ['terrain']  }
        });

        //Associate the styled map with the MapTypeId and set it to display.
        //map.mapTypes.set('styled_map', styledMapType);
        //map.setMapTypeId('styled_map');

	//add traffic layer and trasit layer
        var trafficLayer = new google.maps.TrafficLayer();
            trafficLayer.setMap(map);
	var transitLayer = new google.maps.TransitLayer();
	    transitLayer.setMap(map);

	markers = {};
	makeMarkers(500,markers.servReq=[],pinIconH,false,null,google.maps.Animation.DROP);
	
	makeMarkers(2,markers.aqi=[],{path: google.maps.SymbolPath.CIRCLE,scale:5,strokeColor:'red'},false,"<b>Air Quality<br>Index</b><br>",null);
	makeMarkers(500,markers.crime=[],sheriffIcon,false,null,google.maps.Animation.DROP);
	makeMarkers(500,markers.trafficInc=[],'traffic_inc.png',false,null,null);

	//create markers
	function makeMarkers(num,markers,pinIcon,showing,content,anime){
	  for (var i=0; i<num; i++){
	     markers.push({marker : new google.maps.Marker({
				    position: new google.maps.LatLng(34.0522, -118.2437),
				    visible: showing,
				    animation: anime,
				    map: map,
				    icon: pinIcon
				    }),
			   window : new google.maps.InfoWindow(),
			   contentString : content,
			   loaded : false
		});

	     var infowindow = markers[i].window;
	     google.maps.event.addListener(markers[i].marker, 'click', (function (infowindow) {
                    return function () {infowindow.open(map, this);}
                })(infowindow));

	  }
	  return markers
        }

	// Connect the client, providing an onConnect callback
	client.connect({
	    onSuccess: onConnect,
    	    userName : 'la_buyer',
    	    password : '90hsi1'

	});
    }

/****************************MQTT FUNCTIONS************************************************/
	// Create a client instance: Broker, Port, Websocket Path, Client ID
	//client = new Paho.MQTT.Client("iot.eclipse.org", Number(80),'/ws',"");
	client = new Paho.MQTT.Client("broker.hivemq.com", Number(8000),"");

	// Called when the connection is made
	function onConnect(){
	    console.log('Connected!');
	    client.subscribe('la');
	    client.subscribe('aqi_main');
	    client.subscribe('aqi_reseda');
	    client.subscribe('traffic_incidents')
	    client.subscribe('Crime');
	    client.subscribe('Bulky Items');
	    client.subscribe('la/dead_animal_removal')
	    client.subscribe('Electronic Waste')
	    client.subscribe('Graffiti Removal')
	    client.subscribe('Homeless Encampment')
	    client.subscribe('Illegal Dumping Pickup')
	    client.subscribe('Metal/Household Appliances')
	    client.subscribe('Multiple Streetlight Issue')
	    client.subscribe('Report Water Waste')
	    client.subscribe('Single Streetlight Issue')
	}
	 
	// set callback handlers
	client.onConnectionLost = function (responseObject) {
	    console.log("Connection Lost: "+responseObject.errorMessage);
	}
	 
	client.onMessageArrived = function (message) {
	  //console.log("Message Arrived: "+message.payloadString);  

	  if(message.destinationName == 'aqi_main'){
	    setAqi(JSON.parse(message.payloadString),markers.aqi[0]);
	  }

	  else if(message.destinationName == 'aqi_reseda'){
	    setAqi(JSON.parse(message.payloadString),markers.aqi[1]);
	  }

	  else if(message.destinationName == 'Crime'){
	    setCrimeMarker(JSON.parse(message.payloadString),markers.crime);
	  }

	  else if(message.destinationName == 'traffic_incidents'){
	    console.log('traffic');
	    setTrafficMarkers(JSON.parse(message.payloadString),markers.trafficInc);
	  }

	  else {
	    setMarker(JSON.parse(message.payloadString),markers.servReq);
	  }
	

	  /*
	  if(message.destinationName == 'Bulky Items'){
		setMarker(JSON.parse(message.payloadString));
	  }
	  else if(message.destinationName == 'Dead Animal Removal'){
		setMarker(JSON.parse(message.payloadString));
	  }
	  else if(message.destinationName == 'Electronic Waste'){
		setMarker(JSON.parse(message.payloadString));
	  }
	  else if(message.destinationName == 'Graffiti Removal'){
		setMarker(JSON.parse(message.payloadString));
	  }
	  else if(message.destinationName == 'Homeless Encampment'){
		setMarker(JSON.parse(message.payloadString));
	  }
	  else if(message.destinationName == 'Illegal Dumping Pickup'){
		setMarker(JSON.parse(message.payloadString));
	  }
	  else if(message.destinationName == 'Metal/Household Appliances'){
		setMarker(JSON.parse(message.payloadString));
	  }
	  else if(message.destinationName == 'Multiple Streetlight Issue'){
		setMarker(JSON.parse(message.payloadString));
	  }
	  else if(message.destinationName == 'Report Water Waste'){
		setMarker(JSON.parse(message.payloadString));
	  }
	  else if(message.destinationName == 'Single Streetlight Issue'){
		setMarker(JSON.parse(message.payloadString));
	  }*/
	}

/*********************************SET MARKER FUNCTIONS*******************************************************/
    var cp = 0;


    function setAqi(data,marker){
	//determine aqi color
	var color;
	if(data.aqi <=50) color = 'green';
	else if(data.aqi <= 100) color = 'yellow';
	else if(data.aqi <= 150) color = 'orange';
	else if(data.aqi <= 200) color = 'red';

	marker.marker.setVisible(true);
	marker.marker.setPosition(new google.maps.LatLng(data.lat,data.lng));
	marker.marker.setIcon({path: google.maps.SymbolPath.CIRCLE,scale:5,strokeColor:color})

	marker.window.setContent(marker.contentString+'<font size="4">'+data.aqi+'</font>');
	marker.window.open(map,marker.marker);	
    }

    function closeSR(){
	markers.servReq[mp-1].window.close();
    }

    function setCrimeMarker(data,markers){
	closeAqi();
	if(mp>0)closeSR();
	markers[cp].marker.setPosition(new google.maps.LatLng(data.lat,data.lng));
	markers[cp].marker.setOpacity(1.0);
	markers[cp].marker.setVisible(true);
	var last = cp-1;
	if(last < 0) last = 499;
        setTimeout(function() {
            fadeOutMarker(markers[last],1.0);
        },7000,last); // random delay to make sure you see the fade 
  
	markers[cp].contentString = 
	'<p><b>crime:  </b>' + data.crime_category_description + '<br>' +
	'<b>crime date:  </b>' + time.toLocaleTimeString() + '<br>' +
	'<b>station name:  </b>' + data.station_name +'</p>'
	markers[cp].window.setContent('<p><b><span style="color:red">Crime Report</span></b><br><b>'+data.crime_category_description+'</b><br>'
        + data.station_name +'</p>');
	markers[cp].window.open(map,markers[cp].marker);
	markers[last].window.close();
	markers[cp].loaded = true;
	text = markers[cp].contentString + text;
	document.getElementById("text").innerHTML = text;
	cp = cp+1; 
	if(cp == markers.length) cp = 0;
    }


    function setTrafficMarkers(data,markers){
	for(i=0; i<markers.aqi.length; i++){
	    markers.aqi[i].window.close();
	}
	var i=0;
	var setIncidents = setInterval(function(){
						if(data[i.toString()]) {
						    setTMarker(data[i.toString()],i);
						    i++;
						} 
						else clearInterval(setIncidents); 
					},100);
    }


    function setTMarker(data,i){
	markers.trafficInc[i].marker.setPosition(new google.maps.LatLng(data.lat,data.lng));
	markers.trafficInc[i].marker.setOpacity(1.0);
	markers.trafficInc[i].marker.setVisible(true);
	markers.trafficInc[i].marker.setIcon('traffic_inc.png')
	var textString = '<p class="textBox"><b><span style="color:purple">Traffic Incident</span></b><br>'
	    + data.description + '<br>' + time.toLocaleTimeString() +'<p>';
	    text = textString + text;
	    document.getElementById("text").innerHTML = text;	
    }

    function closeAqi(){
	for(i=0; i<markers.aqi.length; i++){
	    markers.aqi[i].window.close();
	}
    }

    function closeCrime(){
	markers.crime[cp-1].window.close();
	console.log(cp);
    }

    function setMarker(data,markers){
	closeCrime();
	markers[mp].marker.setPosition(new google.maps.LatLng(data.lat,data.lng));
	markers[mp].marker.setOpacity(1.0);
	markers[mp].marker.setVisible(true);

	var pinIcon;
	if(data.requesttype == 'Bulky Items') pinIcon = sr_b.png;
	else if(data.requesttype == 'Dead Animal Removal') pinIcon = sr_d.png;
	else if(data.requesttype == 'Electronic Waste') pinIcon = sr_e.png;
	else if(data.requesttype == 'Graffiti Removal') pinIcon = sr_g.png;
	else if(data.requesttype == 'Homeless Encampment') pinIcon = sr_h.png;
	else if(data.requesttype == 'Illegal Dumping Pickup') pinIcon = sr_i.png;
	else if(data.requesttype == 'Metal/Household Appliances') pinIcon = sr_m.png;
	else if(data.requesttype == 'Multiple Streetlight Issue') pinIcon = sr_ms.png;
	else if(data.requesttype == 'Report Water Waste') pinIcon = sr_w.png;
	else if(data.requesttype == 'Single Streetlight Issue') pinIcon = sr_ss.png;	
	markers[mp].marker.setIcon(pinIcon);

	var last = mp-1;
	if(last < 0) last = 499;
        setTimeout(function() {
            fadeOutMarker(markers[last],1.0);
        },7000,last); // random delay to make sure you see the fade    
	markers[mp].contentString = 
	'<p><b>request type:  </b>' + data.requesttype + '<br>' +
	'<b>address:  </b>' + data.address + '<br>' +
	'<b>police precinct:  </b>' + data.policeprecinct + '<br>' +
	'<b>createddate:  </b>' + data.createddate + '<br>' +
	'<b>action taken:  </b>' + data.actiontaken +'</p>'
	markers[mp].window.setContent('<p><b><span style="color:blue">Service Request</span></b><br><b>'+data.requesttype+'</b><br>'
	+ data.policeprecinct + '<br>' + time.toLocaleTimeString() + '<p>')
	markers[mp].window.open(map,markers[mp].marker);
	markers[last].window.close();
	markers[mp].loaded = true;
	text = markers[mp].contentString + text;
	document.getElementById("text").innerHTML = text;
	mp = mp+1; 
	if(mp == markers.length) mp = 0;
    }

    var fadeOutMarker = function(marker,markerOpacity) {
	// increment opacity
	markerOpacity -= 0.05;
	if (markerOpacity >= 0) {
	    marker.marker.setOpacity(markerOpacity);
	    // call this method again
	    setTimeout(function() {
	 	fadeOutMarker(marker,markerOpacity);
	        }, 40);
	 } else {
	 	marker.marker.setVisible(false);
	   }
    }

/************************************MAP ATTRIBUTES********************************************/

	var map;
	//var d = new Date();
	//var n = d.toLocaleTimeString();
	

	var time = new Date();
	

	var pinIconH = 'http://www.googlemapsmarkers.com/v1/H/ADFF2F/';
	var pinIconG = 'http://www.googlemapsmarkers.com/v1/G/009900/';
	var pinIconD = 'http://www.googlemapsmarkers.com/v1/D/ffff00/';
	var pinIconI = 'http://www.googlemapsmarkers.com/v1/I/0000ff/';
	var pinIconE = 'http://www.googlemapsmarkers.com/v1/E/ffa500/';
	var pinIconB = 'http://www.googlemapsmarkers.com/v1/B/ff69b4/';
	var pinIconM = 'http://www.googlemapsmarkers.com/v1/M/ee00ee/';
	var pinIconW = 'http://www.googlemapsmarkers.com/v1/W/87ceeb/';
	var pinIconSS = 'http://www.googlemapsmarkers.com/v1/SS/c0c0c0/';
	var pinIconMS = 'http://www.googlemapsmarkers.com/v1/MS/d2b48c/';
	var pinIconC = 'http://www.googlemapsmarkers.com/v1/C/ff0000/';
	var sheriffIcon = 'badge_sheriff.png';

	var text = "";
	var markers;
	var aqi, aqir;
	var mp = 0;
	var sheriff_markers = [];

    var sheriff_locs = [
	{"station":"Altadena","lat":34.1896138,"lng":-118.1325341},
	{"station":"Avalon","lat":33.34311,"lng":-118.327168},
	{"station":"Carson","lat":33.8344355,"lng":-118.2630437},
	{"station":"Century","lat":33.9283408,"lng":-118.2287569},
	{"station":"Compton","lat":33.8940121,"lng":-118.2246516},
	{"station":"Cerritos","lat":33.8662065,"lng":-118.065961},
	{"station":"Crescenta Valley","lat":34.221141,"lng":-118.2303951},
	{"station":"East Los Angeles","lat":34.0343921,"lng":-118.1577683},
	{"station":"Industry","lat":34.0249698,"lng":-117.9587948},
	{"station":"Lakewood","lat":33.8512171,"lng":-118.1331075},
	{"station":"Lancaster","lat":34.6988793,"lng":-118.1377853},
	{"station":"Lomita","lat":33.7856262,"lng":-118.3207155},
	{"station":"Malibu/Lost Hills","lat":34.13744,"lng":-118.7146327},
	{"station":"Marina DelRey","lat":33.9708427,"lng":-118.4457239},
	{"station":"Norwalk","lat":33.9142193,"lng":-118.0693806},
	{"station":"Palmdale","lat":34.5861624,"lng":-118.1170673},	
	{"station":"Pico Rivera","lat":33.9817133,"lng":-118.0887905},
	{"station":"San Dimas","lat":34.1047702,"lng":-117.8021421},
	{"station":"Santa Clarita","lat":34.4155084,"lng":-118.5510359},
	{"station":"South Los Angeles","lat":33.9298751,"lng":-118.2983812},
	{"station":"Temple","lat":34.1030474,"lng":-118.0758157},
	{"station":"Walnut Diamond Bar","lat":34.0289283,"lng":-117.8343212},
	{"station":"West Hollywood","lat":34.0843995,"lng":-118.3833709}];


















