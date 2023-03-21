/**
 * base file for app .js
 */

// dependencies
const express = require("express");
const config = require("./src/lib/config");
const routes = require("./src/routes/routes");
// initiliaze express app
const app = express();

// set up middlewares
app.use(express.json());
app.use(routes);

//start server on
app.listen(config.Port, () => {
  console.log(`serveris up and listening on port ${config.Port}`);
});

module.exports = app;
