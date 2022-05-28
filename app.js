console.log("js is working today");

/* **************Connecting to the API server**************** */

//I. Make a GET request to get all the tasks belonging to thhe user

//task?api_key=1 : get all the tasks belonging to the user with ID 1
//$.ajax() : accepts an object arguent containing all settings of the request
//$.ajax() : same setup as a regular XHR request. difference:we don't have to handle checking if the request is "DONE"

//type: request type ( GET,POST, PUT, DELETE)
//url: url you expecting, xml, json, script, html
//sucess : the callback function to be called if the request succeeds
//error: the callback function to be called if the request failed

$(document).ready(function () {
  console.log("dom ready");

  $.ajax({
    type: "GET",
    url: "https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=1",
    dataType: "json",
    success: function (response, textStatus) {
      console.log(response);
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    },
  }); // see the response logged in the console. an object containing a list of tasks
});
