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

init_lat = 42.99;
init_lon = -71.48;
range = .02;
trackPoints = [];

var start;
var randCoord;
var lat_long;

function findCoordinates(lat, long, range)


{
    // How many points do we want? (should probably be function param..)
    var numberOfPoints = 16;
    var degreesPerPoint = 360 / numberOfPoints;

    // Keep track of the angle from centre to radius
    var currentAngle = 0;

    // The points on the radius will be lat+x2, long+y2
    var x2;
    var y2;
    // Track the points we generate to return at the end

    for(var i=0; i < numberOfPoints; i++)
    {
        // X2 point will be cosine of angle * radius (range)
        x2 = Math.cos(currentAngle) * range;
        // Y2 point will be sin * range
        y2 = Math.sin(currentAngle) * range;

        // Assuming here you're using points for each x,y..             
        newLat = lat+x2;
        newLong = long+y2;
        lat_long = new google.maps.LatLng(newLat,newLong);          
        trackPoints[i] = lat_long;  


        // Shift our angle around for the next point
        currentAngle += degreesPerPoint;
    }
    // Return the points we've generated
    //gets random coordinate from our array of coords
  
    randCoord = trackPoints[Math.floor(Math.random() * trackPoints.length)];
    /*
    document.getElementById('randCoord').innerHTML = randCoord;
    document.getElementById('points').innerHTML = trackPoints;
    */
}

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  var mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(42.99, -71.48)
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
  directionsDisplay.setMap(map);
}

function calcRoute() {
  //Fires up random coordinate generation based upon distance input
  findCoordinates(init_lat,init_lon,range);  
  //Displays start and chosen random coordinate - for debugging only
  document.getElementById('buttonClick').innerHTML = lat_long + randCoord;  
  //Get's value from doc to use for start value
  //var start = document.getElementById('start').value;

  var request = {
      origin:lat_long,
      destination:randCoord,
      travelMode: google.maps.TravelMode.DRIVING
  };  

  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      alert('You broke it.');
   } 
  });
}


google.maps.event.addDomListener(window, 'load', initialize);



// --------Moment Timer. Start/Stop/Reset Timer.-----------
var beginButton = document.querySelector('#start')
var stopButton = document.querySelector('#stop')
var resetButton = document.querySelector('#reset')
var timer = moment().startOf("day");


startTimer = () =>
{
  
    var r = setInterval(() => {
      timer.add(1,'second');
      document.querySelector('#clock').innerHTML = timer.format('HH:mm:ss');
        
    }, 1000);
    //.set will access a new object and reset the values in that object to "0" 
    resetButton.addEventListener('click', () => {
      document.querySelector('#clock').innerHTML = timer.set({ hour: 0, minute: 0, second: 0, millisecond: 0, });
      //****try commenting out line 116 to see its original return.*******
      document.querySelector('#clock').innerHTML = "00:00:00";
    });
    stopButton.addEventListener('click', () => {
      clearInterval(r);
     
    }) ;
   
} 

beginButton.addEventListener('click',()=> {
  startTimer(timer);
})

// --------Moment Timer. Start/Stop/Reset Timer.-----------
var beginButton = document.querySelector('#start')
var stopButton = document.querySelector('#stop')
var resetButton = document.querySelector('#reset')
var saveButton = document.querySelector('#save')
var timer = moment().startOf("day");


startTimer = () =>
{
  
    var r = setInterval(() => {
      timer.add(1,'second');
      document.querySelector('#clock').innerHTML = timer.format('HH:mm:ss');
        
    }, 1000);
    //.set will access a new object and reset the values in that object to "0" 
    resetButton.addEventListener('click', () => {
      document.querySelector('#clock').innerHTML = timer.set({ hour: 0, minute: 0, second: 0, millisecond: 0, });
      //****try commenting out line 116 to see its original return.*******
      document.querySelector('#clock').innerHTML = "00:00:00";
    });
    stopButton.addEventListener('click', () => {
      clearInterval(r);
     
    }) ;
   
} 

saveTime = () => {
  let time = document.querySelector('#clock').innerHTML
  localStorage.setItem('savedTime', time ) 

}

saveButton.addEventListener('click', () => {
saveTime();
})

beginButton.addEventListener('click',()=> {
  startTimer(timer);
})









