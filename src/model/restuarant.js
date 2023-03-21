/**
 *base file for restuarant module
 */


// dependencies

// module container
const restuarant = {};

restuarant.errorHandler = function (err) {
  const errors = { name: null, position:null, category:null, rating: null};
  Object.keys(err).forEach((e) => {
    errors[e] = err[e].message
})
if (errors.name || errors.position || errors.category || errors.rating) {
    return [true, errors]
} else {
    return [false, errors]
}
};

restuarant.memmory = [];
restuarant.positions = [];

// module defination
restuarant.schema = {
  name: null,
  position: null,
  category: null,
  rating: null,
};

// persisting data to in-memory
restuarant.create = function (restuarantData, callback) {

  //validate incoming data
  var errors = { name: "", position: "", category: "", rating: "" };
  if (restuarantData.name !=null) {

    var name =
      typeof restuarantData.name == "string" &&
      restuarantData.name.trim().length > 0
        ? restuarantData.name
        : false;

    if (!name) {
      errors.name = new Error("name field is required");
    }
  }
  if (restuarantData.position !=null) {
    var position =
      typeof restuarantData.position == "number" &&
      restuarantData.position >= 0 &&
      restuarantData.position <= 200
        ? restuarantData.position
        : false;
    if (!position) {
      errors.position = new Error("Position must be an integer from 0 - 200");
    }
  }
  if (restuarantData.category !=null) {
    var category =
      typeof restuarantData.category == "string" &&
      restuarantData.category.trim().length > 0
        ? restuarantData.category
        : false;
    if (!category) {
      errors.category = new Error("category field is required");
    }
  }
  if (restuarantData.rating !=null) {
    var rating =
      typeof restuarantData.rating == "number" &&
      restuarantData.rating >= 0 &&
      restuarantData.rating <= 5
        ? restuarantData.rating
        : false;
    if (!rating) {
      errors.rating = new Error("rating must be an integer from 0 - 5");
    }
  }
  var error = restuarant.errorHandler(errors)
  console.log(error)
  if (!error[0]) {
    var isDulicatePosition = this.hasDuplicatePosition(position);
    if (isDulicatePosition) {
      callback(400, { message: "Position not available" });
    } else {
      //persist data to memory
      this.memmory.push((this.schema = restuarantData));
      callback(200, this.memmory);
    }
  } else {
    callback(400, { mesage: error[1] });
  }
};

restuarant.get = function (userData, callback) {

  //validate user data
  var position =
    typeof userData.position == "number" &&
    userData.position >= 0 &&
    userData.position <= 200
      ? userData.position
      : false;
  var category =
    typeof userData.category == "string" && userData.category.trim().length > 0
      ? userData.category
      : false;
  var orderPriority =
    typeof userData.orderPriority == "string" &&
    ["distance", "rating"].indexOf(userData.orderPriority) > -1
      ? userData.orderPriority
      : false;
  var distanceLimit =
    typeof userData.distanceLimit == "number" &&
    userData.distanceLimit >= 0 &&
    userData.distanceLimit <= 200
      ? userData.distanceLimit
      : 30;

  if (position && category && orderPriority && distanceLimit) {
    var searchData = { position, category, orderPriority, distanceLimit };
    //find best maching resturant
    this.findBestResturant(searchData, function (result) {
      if (result) {
        callback(200, result);
      } else {
        callback(404, { message: "no maching record found" });
      }
    });
  } else {
    callback(400, { message: "there are missing fields or invalid data" });
  }
};

restuarant.hasDuplicatePosition = function (position) {
  if (this.positions.indexOf(position) > -1) {
    return true;
  } else {
    this.positions.push(position);
    return false;
  }
};

restuarant.findBestResturant = function (searchData, callback) {
  var machingCategoryRestuarants = [];
  this.memmory.forEach((val) => {
    if (val.category == searchData.category) {
      machingCategoryRestuarants.push(val);
    }
  });

  //sort using   specified orderPiority
  machingCategoryRestuarants.sort((a, b) => {
    //sort by  orderpriority
    if (a[searchData.orderPriority] > b[searchData.orderPriority]) {
      return 1;
    } else if (a[searchData.orderPriority] < b[searchData.orderPriority]) {
      return -1;
    } else {
      return 0;
    }
  });
  //finaly return data based on distanceLimit
  bi_dimaentional_result = [
    searchData.position - searchData.distanceLimit,
    searchData.position + searchData.distanceLimit,
  ];
  console.log(bi_dimaentional_result);
  var finalSearchResult = [];
  machingCategoryRestuarants.forEach((val) => {
    if (
      val.position >= bi_dimaentional_result[0] &&
      val.position <= bi_dimaentional_result[1]
    ) {
      finalSearchResult.push(val);
    }
  });

  console.log(finalSearchResult);
  callback(finalSearchResult);
};

restuarant.delete = function (callback) {
  //delete record
  try{
      restuarant.memmory = [];
  callback(204,{message:"all records deleted"})
  }catch(e){
      callback(500,{message:"internal server error"})
  }


}

module.exports = restuarant;
