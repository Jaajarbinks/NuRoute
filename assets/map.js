//APIS here
let googleAPIKEY = "AIzaSyDClUF1y_PFdn5iZkZs42H6IfXp2_dAEWI";
//Map
("use strict");

let routeBtn = document.getElementById("gen-route-btn");

initMap = () => {
  const CONFIGURATION = {
    ctaTitle: "Checkout",
    mapOptions: {
      center: { lat: 37.4221, lng: -122.0841 },
      fullscreenControl: true,
      mapTypeControl: false,
      streetViewControl: true,
      zoom: 11,
      zoomControl: true,
      maxZoom: 22,
    },
    mapsApiKey: "AIzaSyDClUF1y_PFdn5iZkZs42H6IfXp2_dAEWI",
    capabilities: {
      addressAutocompleteControl: true,
      mapDisplayControl: true,
      ctaControl: true,
    },
  };
  const componentForm = [
    "location",
    "locality",
    "administrative_area_level_1",
    "country",
    "postal_code",
  ];
  const directionsService = new google.maps.DirectionsService();

  const getFormInputElement = (component) =>
    document.getElementById(component + "-input");

  const map = new google.maps.Map(document.getElementById("gmp-map"), {
    zoom: CONFIGURATION.mapOptions.zoom,
    center: { lat: 37.4221, lng: -122.0841 },
    mapTypeControl: true,
    fullscreenControl: CONFIGURATION.mapOptions.fullscreenControl,
    zoomControl: CONFIGURATION.mapOptions.zoomControl,
    streetViewControl: CONFIGURATION.mapOptions.streetViewControl,
  });
  console.log(google.maps);
  const marker = new google.maps.Marker({ map: map, draggable: true });
  const markerTwo = new google.maps.Marker({ map: map, draggable: true });
  const autocompleteInput = getFormInputElement("location");
  const autocomplete = new google.maps.places.Autocomplete(autocompleteInput, {
    fields: ["address_components", "geometry", "name"],
    types: ["address"],
  });
  //getRunLength is the length that will be between given start point and randomly generated end point.
  let getRunLength = document.getElementById("length-input");
  // routeBtn.addEventListener("click", renderAddress(place));
  routeBtn.addEventListener("click", () => {
    marker.setVisible(true);
    markerTwo.setVisible(true);
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }
    if (!getRunLength.value) {
      // user did not enter a run length
      window.alert("Please enter a run length. ");
      return;
    }

    renderAddress(place);
    fillInAddress(place);
  });

  fillInAddress = (place) => {
    // optional parameter
    const addressNameFormat = {
      street_number: "short_name",
      route: "long_name",
      locality: "long_name",
      administrative_area_level_1: "short_name",
      country: "long_name",
      postal_code: "short_name",
    };
    const getAddressComp = function (type) {
      for (const component of place.address_components) {
        if (component.types[0] === type) {
          return component[addressNameFormat[type]];
        }
      }
      return "";
    };
    getFormInputElement("location").value =
      getAddressComp("street_number") + " " + getAddressComp("route");
    for (const component of componentForm) {
      // Location field is handled separately above as it has different logic.
      if (component !== "location") {
        getFormInputElement(component).value = getAddressComp(component);
      }
    }
  };

  ////using render address to log data of objects and test random lat lon and marker tracking
  renderAddress = (place) => {
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
    let lat1 = marker.getPosition().lat();
    console.log("MarkOne lat:", lat1);
    let lng1 = marker.getPosition().lng();
    console.log("MarkOne lng:", lng1);
    let lat2 = markerTwo.getPosition().lat();
    console.log("MarkTwo lat:", lat2);
    let lng2 = markerTwo.getPosition().lng();
    console.log("MarkTwo lng:", lng2);

    //function randomly generates a lat or lng value
    generateRandomLat = () => {
      var num = getNonZeroRandomNumber();

      //changing value in if statement will increase or decrease mark position. computes within range 90% of time
      if (num > getRunLength.value / 170) {
        let newNum = num - getRunLength.value / 170;

        num = num - newNum;
      }
      if (num < -getRunLength.value / 170) {
        let newNum = num + getRunLength.value / 170;

        num = num - newNum;
      }

      num = num + lat1;
      console.log("randomlatfun:", num);
      return num;
    };

    generateRandomLng = () => {
      var num = getNonZeroRandomNumber();

      if (num > getRunLength.value / 170) {
        let newNum = num - getRunLength.value / 170;

        num = num - newNum;
      }
      if (num < -getRunLength.value / 170) {
        let newNum = num + getRunLength.value / 170;

        num = num - newNum;
      }
      num = num + lng1;
      console.log("randomlngfun:", num);
      return num;
    };

    getNonZeroRandomNumber = () => {
      // checks if pos or neg
      var posorNeg = Math.random() < 0.5 ? -1 : 1;

      let random = Math.random();
      if (posorNeg == -1) {
        random = -Math.abs(random);
      }
      return random;
    };

    makeMarkerPosition = (marker) => {
      var latlng = new google.maps.LatLng(
        generateRandomLat(),
        generateRandomLng()
      );
      marker.setPosition(latlng);
    };

    makeMarkerPosition(markerTwo);
    // gets values to lat2 a and lng2 current position after random position generation
    lat2 = markerTwo.getPosition().lat();
    lng2 = markerTwo.getPosition().lng();
    console.log("lat2 position:", lat2, "lng2 positoon:", lng2);
    console.log("lat1 position:", lat1, "lng1 positoon:", lng1);

    // measures distance in miles between two points
    //Haversine Formula
    const R = 6371e3; // metres
    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c;
    console.log("total meters:", d);
    const f = d * 3.28084;
    const m = 5280;
    let mileage = f / m;

    console.log("feet:", f);
    console.log("total milage:", mileage);
  };
};

// --------Moment Timer. Start/Stop/Reset Timer.-----------
var beginButton = document.querySelector("#start");
var stopButton = document.querySelector("#stop");
var resetButton = document.querySelector("#reset");
var saveButton = document.querySelector("#save");
var timer = moment().startOf("day");
document.querySelector("#clock").innerHTML = "00:00:00";
startTimer = () => {
  var r = setInterval(() => {
    timer.add(1, "second");
    document.querySelector("#clock").innerHTML = timer.format("HH:mm:ss");
  }, 1000);
  //.set will access a new object and reset the values in that object to "0"
  resetButton.addEventListener("click", () => {
    document.querySelector("#clock").innerHTML = timer.set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });
    document.querySelector("#clock").innerHTML = "00:00:00";
  });
  stopButton.addEventListener("click", () => {
    clearInterval(r);
  });
};

saveTime = () => {
  let time = document.querySelector("#clock").innerHTML;
  localStorage.setItem("savedTime", time);
};

saveButton.addEventListener("click", () => {
  saveTime();
});

beginButton.addEventListener("click", () => {
  startTimer(timer);
});
