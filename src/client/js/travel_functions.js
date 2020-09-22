//
const geonames__userid = 'zphelj';
const WEATHERBIT_API_KEY='22e6157488974eb7920ef907799afef9';
const PIXABAY_API_KEY='18324887-bfafd27bcc06a34251f07828a';

// Uses the geonames API to get the cordinates matching a location string.
//   May return multiple entries, we'll use the first
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
    console.log('Results = ', json.totalResultsCount); // DEBUG
    // use first match
    console.log(`Lat: ${json.geonames[0].lat}  Long: ${json.geonames[0].lng}`);
    return({'lat': json.geonames[0].lat, 'long': json.geonames[0].lng});
  }
}

// Uses the weatherbit API to obtain the weather for a set of cordinates
export async function fetchWeather(lat, long) {
  console.log('In-> fetchWeather()'); // DEBUG
  let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHERBIT_API_KEY}&lang=en&units=I&lat=${lat}&lon=${long}&days=1`;
  let pResponse = await fetch(url);
  if (!pResponse.ok) {
    throw new Error(`HTTP error fetching location weather! status: ${response.status}`);
  } else {
    let json = await pResponse.json();
    console.log(json.data[0]); // DEBUG
    // use first match
    return(json.data[0]);
  }
}

// Uses the pixabay API to fetch a travel picture that corespondes to the specified location string
//   If no matches are found we'll use the specified photo that shows a 'searching not found' default
export async function fetchPicture(location) {
  console.log('In-> fetchPicture()'); // DEBUG
  let searchkey = encodeURIComponent(location);
  let url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&lang=en&image_type=photo&category=travel&safesearch=true&q=${searchkey}`;
  let promise = await fetch(url);
  if (!promise.ok) {
    throw new Error(`HTTP error fetching location picture! status: ${response.status}`);
  } else {
    return await promise.json();
  }
}