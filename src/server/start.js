// start.js - starts the server
// updated from:
// https://stackoverflow.com/questions/15693192/heroku-node-js-error-web-process-failed-to-bind-to-port-within-60-seconds-of
const serverport = 5010;
const app = require('../server/server');
app.listen(listen(process.env.PORT || serverport));
console.log(`Travel App Server serving ${__dirname} and listening on port ${serverport} ...`);