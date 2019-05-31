/********************************INITIALIZE MAP*************************************************/


    setTimeout(function(){initMap();},3000);

    function setTimer() {
        setInterval(function(){ 
	time.setSeconds(time.getSeconds() + 60);
	document.getElementById("time").innerHTML = 'Tue ' + time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});}, 2000);
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
	    center:{lat:34.0839691475,lng:-118.305004954},
        styles:greyStyle
          //center: {lat: 34.0522, lng: -118.2437},
	  //mapTypeControlOptions: {
          	//mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']  }
		//mapTypeIds: ['terrain']  }
        });

        //Associate the styled map with the MapTypeId and set it to display.
        //map.mapTypes.set('styled_map', styledMapType);
        //map.setMapTypeId('styled_map');

	//add traffic layer and trasit layer
       /* var trafficLayer = new google.maps.TrafficLayer();
            trafficLayer.setMap(map);
	var transitLayer = new google.maps.TransitLayer();
	    transitLayer.setMap(map);*/


	var trucks = [];
	for(i=0;i<locationdata.length;i++){
	  trucks.push({lat:locationdata[i].Trucklocation.lat, lng:locationdata[i].Trucklocation.lng});
	}

	markers = {};
	makeMarkers(serviceRequests,markers.trucks=[],'truck.png',true,null,google.maps.Animation.DROP);

	makeMarkers(serviceRequests,markers.servReq=[],'sr_h.png',false,null,google.maps.Animation.DROP);
	
	makeMarkers(aqi,markers.aqi=[],{path: google.maps.SymbolPath.CIRCLE,scale:5,strokeColor:'red'},false,"<b>Air Quality<br>Index</b><br>",null);
	makeMarkers(crime,markers.crime=[],sheriffIcon,false,null,google.maps.Animation.DROP);
	makeMarkers(trafficInc,markers.trafficInc=[],'traffic_inc.png',false,null,null);

	//create markers
	function makeMarkers(array,markers,pinIcon,showing,content,anime){
	  for (var i=0; i<array.length; i++){
	     markers.push({marker : new google.maps.Marker({
				    position: new google.maps.LatLng(array[i].lat, array[i].lng),
				    visible: showing,
				    animation: anime,
				    map: map,
				    icon: pinIcon
				    }),
			   window : new google.maps.InfoWindow({disableAutoPan:true}),
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
	setTimeout(function(){setMarkers();},8000);
	//setTimeout(setCr,5000);
    }


/*********************************SET MARKER FUNCTIONS*******************************************************/

    function setMarkers(){
	setAqi();
	//setTrafficInc();
	//var sr = setServReq();
	//setTimeout(setSR,1000);
	//setTimeout(setCr,1500);
    }

    function setAqi(){
	var color;
	for(i=0;i<2;i++){
	  if(aqi[i].aqi <=50) color = 'green';
	  else if(aqi[i].aqi <= 100) color = 'yellow';
	  else if(aqi[i].aqi <= 150) color = 'orange';
	  else if(aqi[i].aqi <= 200) color = 'red';
	  markers.aqi[i].marker.setVisible(true);
	  markers.aqi[i].marker.setPosition(new google.maps.LatLng(aqi[i].lat,aqi[i].lng));
	  markers.aqi[i].marker.setIcon({path: google.maps.SymbolPath.CIRCLE,scale:5,strokeColor:color});
	  markers.aqi[i].window.setContent(markers.aqi[i].contentString+'<font size="4">'+aqi[i].aqi+'</font>');
	  markers.aqi[i].window.open(map,markers.aqi[i].marker);	
	}
	setTimeout(function(){setTrafficInc();},3000);
    }

    var setCr = function(){
	console.log(serviceRequests.length);
	var i=0;
	var setC = setInterval(function(){
						if(i<serviceRequests.length) {
						    setCrime(i);
						    i++;
						} 
						else clearInterval(setC); 
					},(2000*60/crime.length));
    }



    //var cp = 0;
    var setCrime = function(cp){
	//console.log(markers.crime.length);
	//markers.crime[cp].marker.setPosition(new google.maps.LatLng(crime[cp].lat,crime[cp].lng));
	markers.crime[cp].marker.setOpacity(1.0);
	markers.crime[cp].marker.setVisible(true);
	var last = cp-1;
	//if(last < 0) last = 499;
        /*setTimeout(function() {
            fadeOutMarker(markers.crime[last],1.0);
        },7000,last); */
	markers.crime[cp].contentString = 
	'<p><b><span style="color:red">Crime Report</span></b><br><b>' + 
	crime[cp].crime_category_description + '</b><br>' +
	crime[cp].station_name +'<br><hr>'
	time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + '</p>'

	markers.crime[cp].window.setContent('<p><b><span style="color:red">Crime Report</span></b><br><b>'+crime[cp].crime_category_description+'</b><br>'
        + time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) +'</p>');
	markers.crime[cp].window.open(map,markers.crime[cp].marker);
	if(last>=0)markers.crime[last].window.close();
	markers.crime[cp].loaded = true;
	text = markers.crime[cp].contentString + text;
	document.getElementById("text").innerHTML = text;
    }


    function setTrafficInc(){
	var i=0;
	var setIncidents = setInterval(function(){
						if(i<trafficInc.length) {
						    setTMarker(i);
						    i++;
						} 
						else{
							clearInterval(setIncidents); 

							setTimeout(setSR,1000);
							setTimeout(setCr,1000);
						}
					},200);
    }

    function setTMarker(i){
	markers.trafficInc[i].marker.setPosition(new google.maps.LatLng(trafficInc[i].lat,trafficInc[i].lng));
	markers.trafficInc[i].marker.setOpacity(1.0);
	markers.trafficInc[i].marker.setVisible(true);
	markers.trafficInc[i].marker.setIcon('traffic_inc.png')
	var textString = '<p><b><span style="color:purple">Traffic Incident</span></b><br>'
	    + trafficInc[i].description + '<br>' + time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) +'<p><hr>';
	    text = textString + text;
	    document.getElementById("text").innerHTML = text;
	//markers.trafficInc[i].window.setContent(textString);
	//markers.trafficInc[i].window.open(map,markers.trafficInc[i].marker);
	//if(i>0)markers.trafficInc[i-1].window.close();	
    }

    function closeAqi(){
	for(i=0; i<markers.aqi.length; i++){
	     markers.aqi[i].window.close();
        }
    }

    var setSR = function(){
	console.log(serviceRequests.length);
	var i=0;
	var setSR = setInterval(function(){
					    closeAqi();
					    if(i<serviceRequests.length) {
					        setMarker(i);
					        i++;
					       } 
					    else clearInterval(setSR); 
			        },(2000*60/serviceRequests.length));
    }

    function setMarker(i){
	  console.log(serviceRequests[i].requesttype);
      markers.servReq[i].marker.setPosition(new google.maps.LatLng(serviceRequests[i].lat,serviceRequests[i].lng));
	  var pinIcon;
	  var openWindow = true;
        
      //markers.servReq[i].marker.setIcon('truck.png');
      markers.servReq[i].marker.setIcon({path: google.maps.SymbolPath.CIRCLE,scale:3,strokeColor:'#F6F16'});
        
        
        /*
	  if(serviceRequests[i].requesttype == 'Bulky Items') markers.servReq[i].marker.setIcon('sr_b.png');
	  else if(serviceRequests[i].requesttype == 'Dead Animal Removal') markers.servReq[i].marker.setIcon('sr_d.png');
	  else if(serviceRequests[i].requesttype == 'Electronic Waste') markers.servReq[i].marker.setIcon('sr_e.png');
	  else if(serviceRequests[i].requesttype == 'Graffiti Removal') markers.servReq[i].marker.setIcon('sr_g.png');
	  else if(serviceRequests[i].requesttype == 'Homeless Encampment') markers.servReq[i].marker.setIcon('sr_h.png');
	  else if(serviceRequests[i].requesttype == 'Illegal Dumping Pickup') markers.servReq[i].marker.setIcon('sr_i.png');
	  else if(serviceRequests[i].requesttype == 'Metal/Household Appliances') markers.servReq[i].marker.setIcon('sr_m.png');
	  else if(serviceRequests[i].requesttype == 'Multiple Streetlight Issue') markers.servReq[i].marker.setIcon('sr_ms.png');
	  else if(serviceRequests[i].requesttype == 'Report Water Waste') markers.servReq[i].marker.setIcon('sr_w.png');
	  else if(serviceRequests[i].requesttype == 'Single Streetlight Issue') markers.servReq[i].marker.setIcon('sr_ss.png');	
	  else {openWindow=false;}*/
	markers.servReq[i].marker.setOpacity(1.0);
	markers.servReq[i].marker.setVisible(true);
	var last = i-1;
	//if(last < 0) last = 499;
	/*setTimeout(function() {
	    fadeOutMarker(markers.servReq[last],1.0);
	},5000,last); */  
	markers.servReq[i].contentString = 
	'<p><b><span style="color:blue">Service Request</span></b><br><b>' + serviceRequests[i].requesttype + '</b><br>' +
	serviceRequests[i].address + '<br>' +
	serviceRequests[i].policeprecinct + '<br>' +
	time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + 
	'</p><hr>'
	markers.servReq[i].window.setContent('<p><b><span style="color:blue">Service Request</span></b><br><b>'+serviceRequests[i].requesttype+'</b><br>'
	+ time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + '<p>')
	markers.servReq[i].window.open(map,markers.servReq[i].marker)
	if(last>=0)markers.servReq[last].window.close();
	markers.servReq[i].loaded = true;
	text = markers.servReq[i].contentString + text;
	document.getElementById("text").innerHTML = text;

	i = i+1; 
	if(i == markers.servReq.length) i = 0;
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

	var time = new Date();

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




var greyStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]



var nightStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
]













