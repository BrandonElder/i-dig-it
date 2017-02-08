function ebaycall() {
    url = "http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords";
    url += "?OPERATION-NAME=findItemsAdvanced";
    url += "&SERVICE-VERSION=1.13.0";
    url += "&SECURITY-APPNAME=BrandonE-DigIt-PRD-5cd429718-3d6a116b";
    url += "&GLOBAL-ID=EBAY-US";
    url += "&RESPONSE-DATA-FORMAT=JSON";
    // url += "&callback=callbackfunc"; //optional?
    url += "&REST-PAYLOAD";
    url += "&paginationInput.pageNumber=1";
    url += "&paginationInput.entriesPerPage=10";
    url += "&keywords=rare";
    url += "&sortOrder=StartTimeNewest";

    $.ajax({
        type: "GET",
        url: url,
        dataType: "jsonp",
        success: function(res){
          var items = res.findItemsAdvancedResponse[0].searchResult[0].item;
          var ins = "";
          for (var i = 0; i < items.length; i++){
              ins += "<div>";
              ins += "<img src='" + items[i].galleryURL + "'/>";
              ins += items[i].title + " -  ";
              ins += items[i].sellingStatus[0].currentPrice[0].__value__;
              ins += "</div>";
          };
          $('.results').html(ins);
        }
    });
};