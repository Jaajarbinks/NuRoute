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
    marker.setVisible(true);
    markerTwo.setVisible(true);
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert('No details available for input: \'' + place.name + '\'');
      return;
    }
    
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
  
  ////using render address to log data of objects and test random lat lon and marker tracking
  function renderAddress(place) {
    map.setCenter(place.geometry.location);
    marker.setPosition(place.geometry.location);
    markerTwo.setPosition(place.geometry.location);
    marker.setVisible(true);
    console.log(getRunLength.value);
    console.log(place.geometry);
    //marker of searched location with lat lon values
    console.log(place.geometry.viewport.Ab);
    console.log(place.geometry.viewport.Ua);
    //get markerTwo lat long value can set position with setPosition(x,y,z)
    // markerTwo.setPosition(39.5287555197085,-104.7884510697085)
    
    //function randomly generates a lat or lng value 
    function generateRandomLat()
{
    var num = Math.random()*180;
    var latlngNum = Math.floor(Math.random());
    if (latlngNum == 0)
    {
        num = num * -1;
    }
    return num;
}
function generateRandomLng()
{
    var num = Math.random()*180;
    var latlngNum = Math.floor(Math.random());
    if (latlngNum == 0)
    {
        num = num * -1;
    }
    return num;
}
  console.log(generateRandomLat())
  console.log(generateRandomLng())
  

   changeMarkerPosition = (marker) => {
     
      var latlng = new google.maps.LatLng(39.5287555197085, -104.7884510697085);
      marker.setPosition(latlng);
  }
// user this while loop to pass the lat, lng values to change marker position

    // while(computedDistance >= getRunLength.value){
    //   let lat = generateRandomLat();
    //   let lng = generateRandomLng();
    //   generateRandomLng();
    //   generatedRandomLat();
    //   if(computedDistance == getRunLength.value){
    //     lat = 
    //       break;

    //   }
    // }

  changeMarkerPosition(markerTwo);
    console.log(markerTwo.getPosition().lat())
    console.log(markerTwo.getPosition().lng())
    
  }

	
// first. randomize coordinates. test coordinates are within given user param. 

//if coordinates are .5 miles of given range then compute

  // const R = 6371e3; // metres
  // const φ1 = lat1 * Math.PI/180; // φ, λ in radians
  // const φ2 = lat2 * Math.PI/180;
  // const Δφ = (lat2-lat1) * Math.PI/180;
  // const Δλ = (lon2-lon1) * Math.PI/180;
  
  // const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
  //           Math.cos(φ1) * Math.cos(φ2) *
  //           Math.sin(Δλ/2) * Math.sin(Δλ/2);
  // const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  
  // const d = R * c;


}

// let lat = place.geometry.location.
// randomCoord = ()=> {


// }

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









