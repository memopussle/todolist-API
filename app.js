console.log("js is working today");

/* **************Connecting to the API server**************** */

//I. Make a GET request to get all the tasks belonging to thhe user

//task?api_key=1 : get all the tasks belonging to the user with ID 1
//$.ajax() : accepts an object arguent containing all settings of the request
//$.ajax() : same setup as a regular XHR request. difference:we don't have to handle checking if the request is "DONE"

//type: request type ( GET,POST, PUT, DELETE)
//url: API url including user id
//sucess : the callback function to be called if the request succeeds
//error: the callback function to be called if the request failed

$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=1",
    dataType: "json",
    success: function (response, textStatus) {
      //   forEach: iterate through each individual tasks of response.tasks
      response.tasks.forEach(function (task) {
        //append task into HTML
        $("#todo-list").append("<p>" + task.content + "</p>");
      });
    },

    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    },
  }); // see the response logged in the console. an object containing a list of tasks

  //type : "POST" : make a POST request . create a new task
  //contentType:let server know we are sending json data
  //JSON.stringify(): turn our JS object into JSON
  const createTask = () => {
    $.ajax({
      type: "POST",
      url: "https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=375",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify({
        //inject value of #new-task-content into DOM
        task: {
          content: $("#new-task-content").val(),
        },
      }),
      success: function (response, textStatus) {
        console.log(response);
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      },
    });
  };

  //when button is clicked, fire createTask
  //default behavior: when a form fires the submit event, is to reload the page. e.preventDefault() will prevent it
  $("#create-task").on("submit", function (e) {
    e.preventDefault();
    createTask();
  });
});
