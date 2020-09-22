import { fetchWeather } from "./travel_functions";

const serverport = 5010;
const serverURLroot = `http://localhost:${serverport}`;
const pixabay_not_found_pic_default = 'https://cdn.pixabay.com/photo/2016/08/19/15/11/lost-1605501_960_720.jpg';
const pixabay_default_pic = 'https://cdn.pixabay.com/photo/2015/07/11/23/02/plane-841441_960_720.jpg';

let d = new Date();
let currentDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

/* Function to POST data to server */
const postData = async (url='', data = {})=>{
  console.log('POSTING: ', JSON.stringify(data));
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response;
};

export async function updatePage() {
  console.log('In-> updatePage()'); // DEBUG
  // request data from server
  let request = await fetch(`${serverURLroot}/trip`);
  let allData = '';
  // set some defaults
  let pixabay_url = pixabay_default_pic;
  let location = '';
  let start_date = '';
  let end_date = '';
  let weather = {};

  try {
    allData = await request.json();
  }
  catch(error) {
    console.log('ERROR: UpdatePage(): ', error);
    return;
  };
  console.log(allData);
  if (allData.location != '') {
    pixabay_url = allData.pixabay_url;
    location = allData.location;
    start_date = allData.start_date;
    end_date = allData.end_date;
    weather = allData.weather;
  };
  // update Travel Info on Page
  document.getElementById('pixabay_photo').innerHTML =
    `<img src="${pixabay_url}" alt="${location}" width="500" height="500"></img>`;
  document.getElementById('location_input').value = location;
  document.getElementById('date_start_input').value = start_date;
  document.getElementById('date_end_input').value = end_date;

  // update footer
  document.getElementById('myFooter').innerHTML = 'Today is ' + currentDate;
};

export async function clearTrip(event) {
   console.log('In-> clearTrip()'); // DEBUG
  // post empty results to server.js
  let data_to_post = {
    location: "",
    start_date: "",
    end_date: "",
    pixabay_url: "",
    weather: {}
  }
  console.log('Data to Post = ', data_to_post); // DEBUG
  let pResponse = await postData(`${serverURLroot}/add`, data_to_post);
  updatePage();
};

export async function locationChange(event) {
  console.log('In-> locationChange()'); // DEBUG
  // get inputs from page
  let location = document.getElementById('location_input').value;
  let start_date = document.getElementById('date_start_input').value;
  let end_date = document.getElementById('date_end_input').value;

  let pixabay_url = ''; // placeholder

  // test inputs
  if (!location) { // test for (""), null, undefined, false and the numbers 0 and NaN
    alert('You must specify a more specific location');
  };

  // Get Cordinates for Location
  let json = await Client.fetchCords(location);
  // default lat/long = McMurdo base
  let lat =  -77.8500;
  let long = 166.6667;
  let weather = {};

  // CHECK RESPONSE
  console.log(json);
  if (json.totalResultsCount == 0) {
    // no cords were found :-(
    console.log(`Unable to locate cordinates for ${location}`);
  } else {
    lat = json.lat;
    long = json.long;
  }

  json = await Client.fetchWeather(lat, long);
  // CHECK RESPONSE
  if (false) {
    // Not Found ?
  } else {
     weather.high_temp = json.high_temp;
  }

  json = await Client.fetchPicture(location);
  // CHECK RESPONSE
  console.log(json);
  if (json.totalHits == 0) {
    // Pixabay didn't find anything for that location, use stock not found option
    pixabay_url = pixabay_not_found_pic_default;
  } else {
    pixabay_url = json.hits[0].webformatURL;
  }

  // post results to server.js
  let data_to_post = {
    location: location,
    start_date: start_date,
    end_date: end_date,
    pixabay_url: pixabay_url,
    weather: weather
  }
  console.log('Data to Post = ', data_to_post); // DEBUG
  let pResponse = await postData(`${serverURLroot}/add`, data_to_post);

  // update page
  Client.updatePage();
};