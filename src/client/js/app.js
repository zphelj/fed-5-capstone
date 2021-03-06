const serverport = 5010;
const serverURLroot = `http://localhost:${serverport}`;
const pixabay_not_found_pic_default = 'https://cdn.pixabay.com/photo/2016/08/19/15/11/lost-1605501_960_720.jpg';
const pixabay_default_pic = 'https://cdn.pixabay.com/photo/2015/07/11/23/02/plane-841441_960_720.jpg';

let dateCurrent = new Date();
let currentDate = (1+dateCurrent.getMonth())+'.'+ dateCurrent.getDate()+'.'+ dateCurrent.getFullYear(); // Javascript month is zero based (Doh!)

/* Function to POST data to server */
const postData = async (url='', data = {})=>{
  //console.log('POSTING: ', JSON.stringify(data)); // DEBUG
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

  // set some defaults
  let pixabay_url = pixabay_default_pic;
  let location = '';
  let start_date = '';
  let end_date = '';
  let weather = {};

  let allData = '';
  try {
    allData = await request.json();
  }
  catch(error) {
    console.log('ERROR: UpdatePage(): ', error);
    return;
  };

  if (allData.location != '') {
    pixabay_url = allData.pixabay_url;
    location = allData.location;
    start_date = allData.start_date;
    end_date = allData.end_date;
    weather = allData.weather;
  };

  // update Travel Info on Page
  document.getElementById('pixabay-photo').innerHTML =
    `<img class="pixabay-photo" src="${pixabay_url}" alt="${location}"></img><img class="pixabay-logo" src="./media/pixabay_logo.svg" alt="Photo by Pixabay">`;
  // populate input fields
  document.getElementById('location-input').value = location;
  document.getElementById('date-start-input').value = start_date;
  document.getElementById('date-end-input').value = end_date;

  // calculate days to start of trip
  let dateStart = Client.parseDate(start_date);
  let daysToStart = Math.ceil(Client.toDays(dateStart) - Client.toDays(dateCurrent)); // .ceil = round up
  let dateEnd = Client.parseDate(end_date);


  // Update summary
  let summaryHTML = '';
  if (start_date == '') {
    summaryHTML += 'Travel details will be available once you create your trip';
  } else {
    summaryHTML += `Your trip departs in ${daysToStart} days`;
    if (!(isNaN(dateEnd.getMonth()))) { // END date specified
      let daysToEnd = Math.ceil(Client.toDays(dateEnd) - Client.toDays(dateCurrent)); // .ceil = round up
      summaryHTML += ` and will last ${daysToEnd - daysToStart + 1} days`;
    }
  };
  document.getElementById('travel-summary').innerHTML = summaryHTML;

  // Update weather
  let weatherHTML = '';
  let weatherType = '';
  if (start_date == '') {
    weatherHTML = '<div>'; // no trip selected yet
  } else if (!(weather.data)) { // if no weather data ...
    weatherType = 'There is no forecast information available for your trip';
  } else if (weather.data.length == 1) {
    // current days forecast only
    weatherType += `<div>Today's Forecast for ${location} is</div>`;
    weatherHTML += Client.forecastHTML(weather.data[0]);
  } else {
    // array of forecasts by day starting from current day
    weatherType += `<div>${weather.data.length} Day Forecast for ${location}</div>`;
    weather.data.forEach(val => {
      weatherHTML += Client.forecastHTML(val);
    });
  }
  weatherHTML += '</div>'; // closing DIV
  document.getElementById('forecast-type').innerHTML = weatherType;
  document.getElementById('forecast-details').innerHTML = weatherHTML;

  // update footer
  document.getElementById('myfooter').innerHTML = '&#169; Jay Phelps ' + currentDate;
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
  //console.log('Data to Post = ', data_to_post); // DEBUG
  let pResponse = await postData(`${serverURLroot}/add`, data_to_post);
  updatePage();
};

export async function locationChange(event) {
  console.log('In-> locationChange()'); // DEBUG
  // get inputs from page
  let location = document.getElementById('location-input').value;
  let start_date = document.getElementById('date-start-input').value;
  let end_date = document.getElementById('date-end-input').value;
  let pixabay_url = ''; // placeholder

  // test inputs
  if (!location) { // test for (""), null, undefined, false and the numbers 0 and NaN
    alert('You must specify a more specific location');
    return;
  };
  if (!(start_date)) {
    alert('You must specify a trip start date');
    return;
  };
  if (end_date) {
    // check that end is not before start!
    let sd = Client.toDays(Client.parseDate(start_date));
    let ed = Client.toDays(Client.parseDate(end_date));
    if (ed < sd) {
      alert(`The end date can't be before you leave!`);
      return;
    };
  };

  // Get Cordinates for Location
  let json = await Client.fetchCords(location);
  // default lat/long = McMurdo base
  let lat =  -77.8500;
  let long = 166.6667;
  let weather = {};

  // CHECK RESPONSE
  if (json.totalResultsCount == 0) {
    // no cords were found :-(
    console.log(`Unable to locate cordinates for ${location}`);
  } else {
    lat = json.lat;
    long = json.long;
  }

  let days = 1;
  // check for 7+ days in future
  let dateStart = Client.parseDate(start_date);
  if(Client.toDays(dateStart) - Client.toDays(dateCurrent) > 7) {
    //console.log('Start date is more than 7 days in the future'); // DEBUG
    days = 16;
  }
  json = await Client.fetchWeather(lat, long, days);
  // CHECK RESPONSE
  if (false) {
    // Not Found ?
  } else {
    weather.data = json.data; // save it all
  }

  json = await Client.fetchPicture(location);
  // CHECK RESPONSE
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
  //console.log('Data to Post = ', data_to_post); // DEBUG
  let pResponse = await postData(`${serverURLroot}/add`, data_to_post);

  // update page
  Client.updatePage();
};