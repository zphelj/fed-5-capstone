# Trip Planner - A Front End Developer Udacity Capstone Project
This is my capstone project for the [Udacity Front End Developer Nanodegree program](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd0011). It's a web app and server in Javascript that stores and shows information when provided a location and date(s) for a future trip.

## Installation
You must have [Node.js](https://nodejs.org/) installed on your machine.

Clone the repository to your machine. As an example the following command will clone the repository under many environments.
````
git clone https://github.com/zphelj/fed-5-capstone
````
Install all NPM dependencies.
```
npm install
```
The default port the server listens to is 5010 and configured in `/src/server/start.js` and `/src/client/js/app.js`. If running the Webpack DevServer the default port for the web-app is 5000 and configured in `/webpack.dev.js`.

## Dependencies
The node dependencies are listed in the `package.json` file.  In addition, there are three external services used by the application. [Webpack](https://webpack.js.org/) is used for building and [Jest](https://jestjs.io/) for testing.  [Sass](https://sass-lang.com/) is used for style sheets. [Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers) are enabled.

### Geonames
The [Geonames API](https://www.geonames.org/export/web-services.html) is used to provide latitude and longitude coordinates for a given location.

### Weatherbit
The [Weatherbit Forecast API](https://www.weatherbit.io/api/weather-forecast-16-day) is used to provide weather information for the latitude and logitude given.

### Pixabay
The [Pixabay API](https://pixabay.com/api/docs/) is used to find a suitable travel themed photo for the selected location.

### Webpack
[Webpack](https://webpack.js.org/) is used for both development and production builds. The following [NPM](https://www.npmjs.com/) scripts are available:
```
build     = This will build the production version of the project.
dev       = This will launch the development server and open a browser to it. (You need to start an instance of the server separately).
start     = Starts an instance of the server.
test      = Runs all configured Jest tests.
testwatch = Runs all the configured Jest tests in Jest's '--watchAll' mode.

Invoke via 'npm run {script}' in a terminal.
```
## Usage
To start a production instance.
```
npm start
```
Then open a browser to [http://localhost:5010](http://localhost:5010).

To run in development mode with webpack's DevServer.
```
Run `npm start` to launch a production server back end on port 5010.
Run `npm run dev` to launch a DevServer which will automatically open a browser window to [http://localhost:5000](http://localhost:5000). This will connect back to the server instance on 5010.
```

The user of the web page must enter a location and a start date. The end date is optional; perhaps they don't want to come back from their trip!  If you fail to enter these an alert message will prompt for this information to proceed.

Once this is entered the system will call Geonames to lookup the coordinates for the location provided, then call Weatherbit to obtain the appropriate weather forecast, the call Pixabay to find an appropriate travel themed picture for that location. The system will always display the number of days until the trip start and the current forecast for that location.
* If the user enters an end date the system will also display the length of trip.
* If the start date is more than 7 days in the future the system will display the next 16 days of forecast information. (This is the limit of the Weatherbit free service)
* If a photo is not found on Pixabay a stock photo indicating searching was not successful is shown.

Trip data is maintained on the server. If a user leaves the site and returns later, the last trip entered will be shown.

A 'Clear Trip' mechanism is provided via button press.

### Responsive
The application has mobile, tablet, and wide presentation and smooth transition between them.

## Key Files
* `/package.json` contains the NPM configuration and dependency information.
* `/webpack.[prod|dev].js` contain the webpack configurations.
* `/src/server/server.js` contains the server code base.
* `/src/client/js/app.js` contains the core web app code base.
* `/src/client/views/index.html` contains the main and only web page.
* `/src/client/media` contains my logo, a favicon and the pixabay logo.
* `/src/client/styles` contains scss style sheets.
* `/__test__` contains Jest test cases.
* `/src/client/js/travel_functions.js` contains helper code and API keys

## Issues
* Deployment to [Heroku](https://dashboard.heroku.com/apps) is not functional at this time. The main branch requires some adjustment and a separate `heroku` branch is being used to pursue that option. For more information on using Node.js applications on Heroku [this tutorial](https://devcenter.heroku.com/articles/getting-started-with-nodejs) is a good place to start.
* The capstone rubric requires the API and user ID's for the dependent services to be encoded in the app.js. As such this is usable as-is with my existing keys as encoded in the file. Please follow the Dependencies links for each API and the instructions there to create your own keys and update `/src/client/js/travel_functions.js`.

## License
This is in the public domain at this time and offered without warranty. It should not be used to cheat on your Udacity Nanodegree!