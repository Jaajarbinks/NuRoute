//APIS here
let googleAPIKEY = "AIzaSyDClUF1y_PFdn5iZkZs42H6IfXp2_dAEWI";
let fitnessCalcAPIKEY = "";
//Map
"use strict";
  
function initMap() {
  const CONFIGURATION = {
    "ctaTitle": "Checkout",
    "mapOptions": {"center":{"lat":37.4221,"lng":-122.0841},"fullscreenControl":true,"mapTypeControl":false,"streetViewControl":true,"zoom":11,"zoomControl":true,"maxZoom":22},
    "mapsApiKey": "AIzaSyDClUF1y_PFdn5iZkZs42H6IfXp2_dAEWI",
    "capabilities": {"addressAutocompleteControl":true,"mapDisplayControl":true,"ctaControl":true}
  };
  const componentForm = [
    'location',
    'locality',
    'administrative_area_level_1',
    'country',
    'postal_code',
  ];
  const directionsService = new google.maps.DirectionsService();

 
  const getFormInputElement = (component) => document.getElementById(component + '-input');
  
  const map = new google.maps.Map(document.getElementById("gmp-map"), {
    zoom: CONFIGURATION.mapOptions.zoom,
    center: { lat: 37.4221, lng: -122.0841 },
    mapTypeControl: true,
    fullscreenControl: CONFIGURATION.mapOptions.fullscreenControl,
    zoomControl: CONFIGURATION.mapOptions.zoomControl,
    streetViewControl: CONFIGURATION.mapOptions.streetViewControl
  });
  console.log(google.maps)
  const marker = new google.maps.Marker({map: map, draggable: true});
  const markerTwo = new google.maps.Marker({map: map, draggable: true})
  const autocompleteInput = getFormInputElement('location');
  const autocomplete = new google.maps.places.Autocomplete(autocompleteInput, {
    fields: ["address_components", "geometry", "name"],
    types: ["address"],
  });
  //getRunLength is the length that will be between given start point and randomly generated end point.
  let getRunLength = document.getElementById("length-input")
  autocomplete.addListener('place_changed', function () {
    marker.setVisible(false);
    markerTwo.setVisible(false);
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert('No details available for input: \'' + place.name + '\'');
      return;
    }
    console.log(getRunLength.value);
    renderAddress(place);
    fillInAddress(place);
  });

  function fillInAddress(place) {  // optional parameter
    const addressNameFormat = {
      'street_number': 'short_name',
      'route': 'long_name',
      'locality': 'long_name',
      'administrative_area_level_1': 'short_name',
      'country': 'long_name',
      'postal_code': 'short_name',
    };
    const getAddressComp = function (type) {
      for (const component of place.address_components) {
        if (component.types[0] === type) {
          return component[addressNameFormat[type]];
        }
      }
      return '';
    };
    getFormInputElement('location').value = getAddressComp('street_number') + ' '
              + getAddressComp('route');
    for (const component of componentForm) {
      // Location field is handled separately above as it has different logic.
      if (component !== 'location') {
        getFormInputElement(component).value = getAddressComp(component);
      }
    }
  }
  
  function renderAddress(place) {
    map.setCenter(place.geometry.location);
    marker.setPosition(place.geometry.location);
    markerTwo.setPosition(place.geometry.location);
    marker.setVisible(true);
    
    
  }
}
var beginButton = document.querySelector('#start')
var stopButton = document.querySelector('#stop')



function startTimer()
{
  var timer = moment().startOf("day");
    var r = setInterval(function() {
      timer.add(1,'second');
      document.querySelector('#clock').innerHTML = timer.format('HH:mm:ss');
        
    }, 1000);
   
    stopButton.addEventListener('click', function(){
      clearInterval(r); 
    }) 
} 

beginButton.addEventListener('click', function(){
  startTimer()
})





//// ------------------random route code---------------
// function fixedPointRoute(length)
// {

//   //How far is it to your fixed point?
//   var distToFixed = computeDistanceBetween(BaseLocation,fixedPoints[0].marker.getPosition());

//   if(distToFixed/requestedLengthInMeters > 0.5)
//     {
//       alert("The distance requested is less than half the straight line distance to the fixed waypoint.  No way to close a route.");
//     }

//   else
//     {
//       var brngToFixed = getBearing(BaseLocation,fixedPoints[0].marker.getPosition());
//       /* Now, choose a direction in which to head, and go the distance such that the sum of the 3 legs 
// 	 (base to fixed, fixed to next, next to base) add up to the desired distance, length. */
//       var minTurn = 20;  var maxTurn = 160;
//       var direction = Math.random()* (maxTurn-minTurn) + minTurn;
//       var side = Math.floor(2*Math.random());
//       if(side==0) direction = direction;
//       if(side==1) direction = -1* direction;
//       var newBearing = brngToFixed + direction * Math.PI/180;
//       var step = 0;
//       var toHere;
//       var allLegs = 0;
//       while(allLegs < length)
// 	{
// 	  step += 1;  //Move out in steps of 1 meter.
// 	  toHere = getNewPointAlongBearing(fixedPoints[0].marker.getPosition(),step,newBearing);
// 	  allLegs = distToFixed + computeDistanceBetween(fixedPoints[0].marker.getPosition(),toHere) + computeDistanceBetween(toHere,BaseLocation);
// 	}

//       var newBearing2 = newBearing + (1-side*2)*5*Math.PI/180;
//       var toHere2 = getNewPointAlongBearing(fixedPoints[0].marker.getPosition(),step,newBearing2);

//       /*
//       placeMarker(toHere,"");
//       new google.maps.Polyline({path:[BaseLocation,fixedPoints[0].marker.getPosition()],map:map});
//       new google.maps.Polyline({path:[fixedPoints[0].marker.getPosition(),toHere],map:map});
//       new google.maps.Polyline({path:[toHere,BaseLocation],map:map});
//       */
      
//       rlPoints.length=0;
//       rlPoints.push(fixedPoints[0].marker.getPosition());
//       rlPoints.push(toHere);
//       rlPoints.push(toHere2);
//     }

//   return;
// }



