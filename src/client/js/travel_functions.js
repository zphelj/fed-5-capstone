// This module contains helper functions and external API calls use by the main application

// Key's for API's
const geonames__userid = 'zphelj';
const WEATHERBIT_API_KEY='22e6157488974eb7920ef907799afef9';
const PIXABAY_API_KEY='18324887-bfafd27bcc06a34251f07828a';

// Handy functions, with some tweaks I made, from Stack Overflow questions on the topic of date conversion
// s is a String in format y-m-d
// Returns a date object for 00:00:00 local time on the specified date
export function parseDate(s) {
  var b = s.split(/\D/);
  return new Date(b[0], --b[1], b[2], 0);
};

// Convert a date to days (must be in same time zone, ignores daylight savings)
// Returns the number of days (float)
export function toDays(d) {
  d = d || 0;
  return d / 24 / 60 / 60 / 1000;
};

// Generates and returns a Forecast HTML block of code
export function forecastHTML(data) {
  let html = '<div class="forecast">';
  html += `<h3>${data.datetime}</h3>`;
  html += `High: ${data.high_temp}  Low: ${data.low_temp}<br>${data.weather.description}`;
  html += '</div>';
  return html;
};

// Uses the geonames API to get the cordinates matching a location string.
//   http://www.geonames.org/export/web-services.html
//
// Returns the first match as an object with lat & long properties.
export async function fetchCords(location) {
  console.log('In-> fetchCords()'); // DEBUG
  let URIloc = encodeURIComponent(location);
  let geourl = `http://api.geonames.org/searchJSON?username=${geonames__userid}&q=${URIloc}`;
  fetch(geourl);
  let pResponse = await fetch(geourl);
  if (!pResponse.ok) {
    throw new Error(`HTTP error fetching location cordinates! status: ${response.status}`);
  } else {
    let json = await pResponse.json();
    // use first match
    return({'lat': json.geonames[0].lat, 'long': json.geonames[0].lng});
  };
};

// Uses the weatherbit API to obtain the weather for a set of cordinates.
//   https://www.weatherbit.io/api/weather-forecast-16-day
//
// Returns an array of 1 to 16 Weather Forecast entries
export async function fetchWeather(lat, long, days) {
  console.log('In-> fetchWeather()'); // DEBUG
  let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHERBIT_API_KEY}&lang=en&units=I&lat=${lat}&lon=${long}&days=${days}`;
  let pResponse = await fetch(url);
  if (!pResponse.ok) {
    throw new Error(`HTTP error fetching location weather! status: ${response.status}`);
  } else {
    let json = await pResponse.json();
    return(json);
  };
};

// Uses the pixabay API to fetch a travel picture that corespondes to the specified location string
//   https://pixabay.com/api/docs/#api_search_images
//
// Returns a URL to a photo
// If no matches are found we'll use the specified photo that shows a 'searching not found' default
export async function fetchPicture(location) {
  console.log('In-> fetchPicture()'); // DEBUG
  let searchkey = encodeURIComponent(location);
  let url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&lang=en&image_type=photo&category=travel&safesearch=true&q=${searchkey}`;
  let promise = await fetch(url);
  if (!promise.ok) {
    throw new Error(`HTTP error fetching location picture! status: ${response.status}`);
  } else {
    return await promise.json();
  };
};