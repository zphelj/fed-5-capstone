// Import so webpack knows it exists
import { fetchCords, fetchWeather, fetchPicture, parseDate, toDays, forecastHTML } from './js/travel_functions';
import { locationChange, updatePage, clearTrip } from './js/app';

// (S)CSS
import './styles/resets.scss';
import './styles/mobile.scss';
import './styles/tablet.scss';
import './styles/wide.scss';

// Images
import './media/Dog_01.jpg';
import './media/pixabay_logo.svg';
import './media/favicon.ico';

// need to export to the named Output webpack library
export {
  fetchCords,
  fetchWeather,
  fetchPicture,
  locationChange,
  clearTrip,
  updatePage,
  parseDate,
  toDays,
  forecastHTML
};

// Event listener to add function to existing HTML DOM element
document.getElementById("change-location-button").addEventListener("click", locationChange);
document.getElementById("clear-location-button").addEventListener("click", clearTrip);

// On first entry try and update the page .. we may have a trip saved already!
updatePage();