// Global variables
var API_KEY = `QIxxSC2TM4HbAEH3zLwO6CDoFGUDsjYXaa7z4kCq`;

var AUTO_SUGGEST = "https://ndb.nal.usda.gov/ndb/search/autosuggest?manu=&amp;ingred=&amp;ds=Standard+Reference&amp;fgcd=&term=";
// var LIST_URL = `https://api.nal.usda.gov/ndb/list?format=json&lt=g&sort=n&api_key=${API_KEY}`;

var SEARCH_URL = `https://api.nal.usda.gov/ndb/search/?format=json&sort=n&max=25&ds=Standard+Reference&offset=0&api_key=${API_KEY}&q=`;
var SPECIFIC_FOOD_SEARCH = `https://api.nal.usda.gov/ndb/reports/?&type=b&format=json&api_key=${API_KEY}&ndbno=`;

$(document).ready(function() {
  // $('#fetch').on('click', function() {
  //   console.log("Button clicked")
  // })
  $('#searchItem, #fetch').on('click, keyup', function(e) {

    // ------------------- AUTO SUGGEST TEST --------------------
    // var searchTerm = $('#searchItem').val();

    // $.ajax({
    //   type: "GET",
    //   url: AUTO_SUGGEST + searchTerm,
    //   success: function(data) {
    //     console.log(data)
    //     $('li').remove();
    //     data.forEach(function(item) {
    //       $('#results').append("<li>" + item.name+ "</li>")
    //       console.log(item.name)
    //     })
    //   },
    //   error: function(jqXHR) {
    //     $('li').remove();
    //     $("#results").append("<li>" + jqXHR.responseText + "</li>");
    //   }
    // });

    // -------------------------- END --------------------------


    if (e.which == 13) {
      var searchTerm = $('#searchItem').val();

      $.ajax({
        type: "GET",
        url: SEARCH_URL + searchTerm,
        success: function(data) {
          var ndbno = data.list.item[0].ndbno;

          $.ajax({
            type: "GET",
            url: SPECIFIC_FOOD_SEARCH + ndbno,
            success: function(data) {
              console.log(data)
              console.log("Success!")

              var nutrients_object = data.report.food.nutrients;
              var name = data.report.food.name;
              var carbs = nutrients_object[4].value;

              // carbs
              // console.log(`Total carbs: ${nutrients_object[4].value}${nutrients_object[4].unit}`);
              // console.log("per 100g")

              // <tr>
              //    <td>January</td>
              //    <td>$100</td>
              // </tr>
              // <tr>
              //     <td>February</td>
              //     <td>$80</td>
              // </tr>

              $('tbody > tr').remove();
              $('#results').append("<tr><td>" + name + "</td><td>" + carbs + "</td></tr>");


              // for (item in nutrients_object) {
              //   if (nutrients_object[item].name == "Protein") {
              //     console.log(`Total protein: ${nutrients_object[item].value}${nutrients_object[item].unit}`)
              //   }
              // }



              // $('li').remove();
              // data.forEach(function(item) {
              //   $('#results').append("<li>" + item.name+ "</li>")
              //   console.log(item.name)
              // })
            },
            error: function(jqXHR) {
              console.log("Error in second AJAX call.")
              // $('li').remove();
              // $("#results").append("<li>" + jqXHR.responseText + "</li>");
            }
          });

          // $('li').remove();
          // data.forEach(function(item) {
          //   $('#results').append("<li>" + item.name+ "</li>")
          //   console.log(item.name)
          // })
        },
        error: function(jqXHR) {
          console.log("something went wrong.")
          // $('li').remove();
          // $("#results").append("<li>" + jqXHR.responseText + "</li>");
        }
      });

    }
  });
})
