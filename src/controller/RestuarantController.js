/**
 *base file for resturant controller
 */

// dependencies
const restuarant = require("../model/restuarant");

//http verb POST for restaurants
module.exports.get = function (req, res) {

  restuarant.get(req.body, function (statusCode, message) {
    if (statusCode == 404) {
      res.status(statusCode).json(message);
    } else {
      res.status(statusCode).json(message);
    }
  });
};

//http verb POST for restaurants
module.exports.post = function (req, res) {
  var data = (restuarant.schema = req.body);
  restuarant.create(data, function (statusCode, message) {
    if (statusCode == 400) {
      res.status(statusCode).json(message);
    } else {
      res.status(statusCode).json(message);
    }
  });
};

// http verb Delete for restaurant
module.exports.delete = function (req, res) {

  restuarant.delete(function (statusCode, message) {
    if (statusCode == 204) {
      res.status(statusCode).json(message);
    } else {
      res.status(statusCode).json(message);
    }
  });
};
