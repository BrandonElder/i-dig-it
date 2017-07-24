$(window).load(function() {
  $('form[role="search"]').submit(function(ev)  {
    ev.preventDefault();
    // get the input value with:
    var searchstring = $('input[type="text"]', this).val();
    //console.log(searchstring);
    // your ajax request, using the variable above
    var url = "https://svcs.ebay.com/services/search/FindingService/v1";
    url += "?OPERATION-NAME=findCompletedItems";
    url += "&SERVICE-VERSION=1.13.0";
    url += "&SERVICE-NAME=FindingService";
    url += "&SECURITY-APPNAME=BrandonE-DigIt-PRD-5cd429718-3d6a116b";
    url += "&GLOBAL-ID=EBAY-US";
    url += "&RESPONSE-DATA-FORMAT=JSON";
    url += "&REST-PAYLOAD";
    url += "&itemFilter(0).name=MinPrice";
    url += "&itemFilter(0).value=7.00";
    url += "&itemFilter(0).paramName=Currency";
    url += "&itemFilter(0).paramValue=USD";
    url += "&paginationInput.pageNumber=1";
    url += "&paginationInput.entriesPerPage=50";
    url += "&keywords=" + searchstring;
    url += "&sortOrder=EndTimeSoonest";
    url += "&categoryId=176985";

    $.ajax({
      type: "GET",
      url: url,
      dataType: "jsonp",
      success: function(res){
        console.log(res);
        var items = res.findCompletedItemsResponse[0].searchResult[0].item;
        var ins = "";
        for (var i = 0; i < items.length; i++){
          ins += "<div>";
          ins += "<img src='" + items[i].galleryURL + "  '/>";
          ins += "  " + items[i].title + " - ";
          ins += "Sold for $" + items[i].sellingStatus[0].currentPrice[0].__value__;
          ins += "</div><br />";
        };
        $('.results').html(ins);
      }
    });
  });
});
