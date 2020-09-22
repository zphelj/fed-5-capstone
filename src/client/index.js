// Import so webpack knows it exists
import { fetchCords, fetchWeather, fetchPicture } from './js/travel_functions';
import { locationChange, updatePage, clearTrip } from './js/app';

// (S)CSS
import './styles/base.scss';

// Images
import './media/Dog_01.jpg';
import './media/pixabay_logo.svg';

// need to export to the named Output webpack library
export {
  fetchCords,
  fetchWeather,
  fetchPicture,
  locationChange,
  clearTrip,
  updatePage
};

// Event listener to add function to existing HTML DOM element
document.getElementById("change_location_button").addEventListener("click", locationChange);
document.getElementById("clear_location_button").addEventListener("click", clearTrip);

// On first entry try and update the page .. we may have a trip saved already!
updatePage();