$(function() {

  // invoke click event
  $("[data-filter]").off();
  $("[data-filter]").on("click", function() {
    let $this = $(this);
    let data = $this.data();
    // toggle value
    if (data.value == false) {
      $(this).data("value", true);
    } else {
      $(this).data("value", false);
    }

    // create class
    let url = new buildfindCompletedItemsUrl();

    // get the sort order
    url.getSortOrder();

    // build the url
    let ajaxUrl = url.build();

    // get the results
    GetFilteredResults(ajaxUrl, function(results) {
      $("body").append($("<p />", {
        text: results
      }));
    });
  });
});

// class with contructor
function buildfindCompletedItemsUrl() {
  this.url = "https://svcs.ebay.com/services/search/FindingService/v1";
  this.defaultUrlParams = {
    "OPERATION-NAME": "findCompletedItems",
    "SERVICE-VERSION": "1.13.0",
    "SERVICE-NAME": "FindingService",
    "SECURITY-APPNAME": "BrandonE-DigIt-PRD-5cd429718-3d6a116b",
    "GLOBAL-ID": "EBAY-US",
    "RESPONSE-DATA-FORMAT": "JSON",
    "REST-PAYLOAD": "",
    "itemFilter(0).name": "MinPrice",
    "itemFilter(0).value": "7.00",
    "itemFilter(0).paramName": "Currency",
    "itemFilter(0).paramValue": "USD",
    "paginationInput.pageNumber": "1",
    "sortOrder": "EndTimeSoonest",
    "paginationInput.entriesPerPage": "50",
    "categoryId": "176985"
  };
  return this;
}

// looks at the dom and fills the sortOrderParam
buildfindCompletedItemsUrl.prototype.getSortOrder = function() {
  var $filters = $("[data-filter]");
  let param = this.defaultUrlParams["sortOrder"];
  let _ = this;
  $.each($filters, function(i, f) {
    let $filter = $(f);
    let data = $filter.data();
    let val = data.value;
    if (val == true) {
      if (_.defaultUrlParams["sortOrder"] == "") {
        _.defaultUrlParams["sortOrder"] += data.filter;
      } else {
        _.defaultUrlParams["sortOrder"] += "," + data.filter;
      }
    }
  });
};

// builds the full url for the ajax call
buildfindCompletedItemsUrl.prototype.build = function() {
  let _url = this.url;
  let keys = Object.keys(this.defaultUrlParams);
  let length = keys.length;
  for (let i = 0; i < length; i++) {
    let key = keys[i];
    let val = this.defaultUrlParams[key];
    if (i == 0) {
      _url += `?${key}=${val}`;
    } else {
      _url += `&${key}=${val}`;
    }
  }
  return _url;
};


// get your results and return them
function GetFilteredResults(url, callback) {
  // do ajax here 
  return callback(url);
}