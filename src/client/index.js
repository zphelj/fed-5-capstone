// Import so webpack knows it exists
import { fetchCords, fetchWeather, fetchPicture } from './js/travel_functions';
import { locationChange, updatePage } from './js/pageupdate';

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
  updatePage
};