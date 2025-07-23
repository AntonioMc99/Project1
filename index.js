// grab things from the page
const theForm = document.getElementById('ip-form');
const typedIP = document.getElementById('ip-input');

const showIP = document.getElementById('ip');
const showLocation = document.getElementById('location');
const showTime = document.getElementById('timezone');
const showISP = document.getElementById('isp');

// your API kiy
const secretKey = "at_DOOONL0z4blU1RnvDeYjx5DDj5hs0";

// set up map with no location yet
let theMap = L.map('map').setView([20, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(theMap);

let thePin = null;

// when the form is submitted
theForm.addEventListener('submit', (event) => {
  event.preventDefault(); // stop page reload
  let enteredIP = typedIP.value.trim(); // what user typed

  if (!enteredIP) return; // don't do anything if box is empty

  lookUpIP(enteredIP); // go get info about the IP
});

// this talks to the API and updates the page
async function lookUpIP(ipAddress) {
  let webLink = `https://geo.ipify.org/api/v2/country,city?apiKey=${secretKey}&ipAddress=${ipAddress}`;

  try {
    let reply = await fetch(webLink);
    let details = await reply.json();

    // update text on the page
    showIP.textContent = details.ip;
    showLocation.textContent = `${details.location.city}, ${details.location.region}, ${details.location.country}`;
    showTime.textContent = details.location.timezone;
    showISP.textContent = details.isp;

    // update map with pin
    let x = details.location.lat;
    let y = details.location.lng;

    theMap.setView([x, y], 13);
    if (thePin) {
      thePin.setLatLng([x, y]);
    } else {
      thePin = L.marker([x, y]).addTo(theMap);
    }

  } catch (problem) {
    alert("WRONG TRY AGAIN?");
    console.log(problem);
  }
}
