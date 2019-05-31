/********************************INITIALIZE MAP*************************************************/
    var time = new Date();
    var trucks = [];
    var visibleTrucks = [];

    setTimeout(function(){initMap();},3000);
/*
    function setTimer() {
        setInterval(function(){ 
	time.setSeconds(time.getSeconds() + 60);
	document.getElementById("time").innerHTML = 'Tue ' + time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});}, 2000);
    }*/

    function initMap() {
 	// Create a new StyledMapType object, passing it an array of styles,
        // and the name to be displayed on the map type control.
        //var styledMapType = new google.maps.StyledMapType(mapStyle,{name: 'Styled Map'});

	//time
	//document.getElementById("time").innerHTML = time.toLocaleTimeString();
	//setTimer();
	//create map
        map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
	    center:{lat:34.0839691475,lng:-118.305004954},
        styles:greyStyle
        });



	//add traffic layer and trasit layer
       /* var trafficLayer = new google.maps.TrafficLayer();
            trafficLayer.setMap(map);
	var transitLayer = new google.maps.TransitLayer();
	    transitLayer.setMap(map);*/



	for(i=0;i<locationdata.length;i++){
	  //locationdata[i]
	  trucks.push({lat:locationdata[i].Trucklocation.lat, lng:locationdata[i].Trucklocation.lng,
			hour:locationdata[i].Trucklocation.start.substring(11,13),
			name:locationdata[i].Restaurant['name'], address:locationdata[i].Trucklocation.location});
	  //console.log(trucks[i].hour);
	  
	}

	markers = {};
	makeMarkers(trucks,markers.trucks=[],'truck.png',false,null,null);

	makeMarkers(serviceRequests,markers.servReq=[],'sr_h.png',false,null,null);
	
	makeMarkers(aqi,markers.aqi=[],{path: google.maps.SymbolPath.CIRCLE,scale:5,strokeColor:'red'},false,"<b>Air Quality<br>Index</b><br>",null);
	makeMarkers(crime,markers.crime=[],'badge_sheriff.png',false,null,null);
	makeMarkers(trafficInc,markers.trafficInc=[],'traffic_inc.png',false,null,null);

	//create markers
	function makeMarkers(array,markers,pinIcon,showing,content,anime){
	  for (var i=0; i<array.length; i++){
	     markers.push({marker : new google.maps.Marker({
				    position: new google.maps.LatLng(array[i].lat, array[i].lng),
				    visible: showing,
				    animation: anime,
				    map: map,
				    icon: pinIcon,
				    opacity:0
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
	setTimeout(function(){setMarkers();},3000);
	//setTimeout(setCr,5000);
    }



/*************************************************SET MARKERS**********************************************/
   
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


    var fadeInArray = function(markers,markerOpacity){
	//console.log(markers.length);
	markerOpacity += 0.05;
	if (markerOpacity <= 1 ){
		for(var i=0; i<markers.length; i++){
		    //console.log(markers);
	  	    markers[i].marker.setOpacity(markerOpacity);
		}
	        setTimeout(function() {
	 	    fadeInArray(markers,markerOpacity);
	            }, 40);	    
        }

    }


    var fadeIn = function(marker,markerOpacity){
	// increment opacity
	markerOpacity += 0.05;
	if (markerOpacity <= 1 ) {
	    marker.setOpacity(markerOpacity);
	    // call this method again
	    setTimeout(function() {
	 	fadeIn(marker,markerOpacity);
	        }, 10);
	 } else {
	 	//marker.marker.setVisible(false);
	   }
    }
   

    function setMarkers(){
	setAqi();
	//setTruckMarkers();
	//setTrafficInc();
	//setSRMarkers(0);
	//setCrime();
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
	  markers.aqi[i].marker.setIcon({path: google.maps.SymbolPath.CIRCLE,scale:5,strokeColor:color});
	  markers.aqi[i].window.setContent(markers.aqi[i].contentString+'<font size="4">'+aqi[i].aqi+'</font>');
	  markers.aqi[i].window.open(map,markers.aqi[i].marker);
	
	}
	setTimeout(function() {
            fadeIn(markers.aqi[0].marker,0);
            },2);
	setTimeout(function() {
            fadeIn(markers.aqi[1].marker,0);
            },2); 
	setTimeout(function(){setTrafficInc();},3000);
    }



    function setTrafficInc(){
      closeLast(markers.aqi);
	var i=0;
	var setIncidents = setInterval(function(){
						if(i<trafficInc.length) {
						    setTMarker(i);
						    i++;
						} 
						else{
							clearInterval(setIncidents); 
							setTimeout(setTruckMarkers,2000);
							//setTimeout(setSR,1000);
							//setTimeout(setCr,1000);
						}
					},200);
    }

    function setTMarker(i){
	markers.trafficInc[i].marker.setOpacity(1.0);
	markers.trafficInc[i].marker.setVisible(true);
	var textString = '<p><b><span style="color:purple">Traffic Incident</span></b><br>'
	    + trafficInc[i].description + '<br>' +'' +'<p><hr>';
	    text = textString + text;
	    document.getElementById("text").innerHTML = text;
    }

    function closeLast(array){
	for(var i=0;i<array.length;i++){
	    array[i].window.close();
	}
    }

    var setTruckMarkers = function(){
	var i=0;
	var setTrucks = setInterval(function(){
						if(i<trucks.length) {
							if(Number(trucks[i].hour)>18){
							    markers.trucks[i].marker.setVisible(true);
							    //markers.trucks[i].marker.setOpacity(1);
							    visibleTrucks.push(markers.trucks[i].marker);
							    textString = '<p><b><span style="color:brown">Food Truck</span></b><br>'
							    + trucks[i]['name'] + '<br>' + trucks[i].address +'<p><hr>';
							    text = textString + text;
							    document.getElementById("text").innerHTML = text;
							    fadeIn(markers.trucks[i].marker,0);
							}
						    i++;
						} 
						else{
							clearInterval(setTrucks); 
							setTimeout(serviceRequestsMarkers,1000);
						}
					},200);

    }


    var sr_requesttypes = ["Bulky Items","Dead Animal Removal","Electronic Waste","Graffiti Removal","Homeless Encampment",
				"Illegal Dumping Pickup","Metal/Household Appliances","Multiple Streetlight Issue",
				"Report Water Waste","Single Streetlight Issue"]


   var serviceRequestsMarkers = function(){
	var j = 0;
	var set = setInterval(function(){
				if(j<sr_requesttypes.length){
					setSRMarkers(j); j++;}
				else {clearInterval(set); setTimeout(setCrime,1000);}
			      },2000);

   }

   var setCrime = function(){
	//var crimeMarkers = []
	for(var i=0;i<markers.crime.length;i++){
	   markers.crime[i].marker.setVisible(true);
	   //crimeMarkers.push(markers.crime[i].marker);
	}

	fadeInArray(markers.crime,0);
	var textString;
	var j = 0;
	var setCRText = setInterval(function(){
				if(j < markers.crime.length){
					textString = '<p><b><span style="color:red">Crime Report</span></b><br><b>'+
					crime[j].crime_category_description+'</b><br>'+ crime[j].station_name +'</p><hr>';
					text = textString + text;
					document.getElementById("text").innerHTML = text;
					j++;
				}else clearInterval(setCRText);		
			},200);

/*
	var i = 0;
	var setSR = setInterval(function(){
	        if(i<markers.crime.length){
	          markers.crime[i].marker.setVisible(true);
	          //markers.crime[i].marker.setOpacity(1);
		  fadeIn(markers.crime[i].marker,0);
		  i++;
	    	}
		else clearInterval(setSR);
	    },100);*/
   }



    var setSRMarkers = function(requesttype){
	var i=0;
	var setSR = setInterval(function(){
						if(i<serviceRequests.length) {

							if(serviceRequests[i].requesttype == sr_requesttypes[requesttype]){

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

							    markers.servReq[i].marker.setVisible(true);
							    //markers.servReq[i].marker.setOpacity(1);
							    var textString = 
							    	'<p><b><span style="color:blue">Service Request</span></b><br><b>' + 									serviceRequests[i].requesttype + '</b><br>' +
								serviceRequests[i].address + '<br>' +
								serviceRequests[i].policeprecinct + '<br>' +
								'' + 
								'</p><hr>'
							    text = textString + text;
							    document.getElementById("text").innerHTML = text;
							    fadeIn(markers.servReq[i].marker,0);
							}
						    i++;
						} 
						else{
							clearInterval(setSR);
							}

					},50);	

    }







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


