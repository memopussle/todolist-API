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
  //create a function containing GET request to display all the tasks on the page
  const getAndDisplayAllTasks = function () {
    $.ajax({
      type: "GET",
      url: "https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=377",
      dataType: "json",
      success: function (response, textStatus) {
        $("#todo-list").empty(); //clear out all existing tasks in HTML
        //append task content and delete button in HTML
        //attribute data-id = task.id: task ID of each task
          //input checkbox: to tick when the task is completed
        response.tasks.forEach(function (task) {
          $("#todo-list").append(
            '<div class="row"><p class="col-xs-8">' +
              task.content +
              '</p><button class="delete" data-id="' +
              task.id +
              '">Delete</button><input type="checkbox" class="mark-complete" data-id="' +
              task.id +
              '"' +
              (task.completed ? "checked" : "") +
              ">"
          );
        });
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      },
    }); // see the response logged in the console. an object containing a list of tasks
  };

  //type : "POST" : make a POST request . create a new task
  //contentType:let server know we are sending json data
  //JSON.stringify(): turn our JS object into JSON
  const createTask = () => {
    $.ajax({
      type: "POST",
      url: "https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=377",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify({
        //inject value of #new-task-content into DOM
        task: {
          content: $("#new-task-content").val(),
        },
      }),
      success: function (response, textStatus) {
        $("#new-task-content").val(""); //clear out the input after a new task is pushed to HTML
        getAndDisplayAllTasks();
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

  //REMOVE task using delete request
  //id is task.id of each task
  const deleteTask = (id) => {
    $.ajax({
      type: "DELETE",
      url:
        "https://altcademy-to-do-list-api.herokuapp.com/tasks/" +
        id +
        "?api_key=377",
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      },
    });
  };
  //link deleteTask to all delete buttons
  //because our tasks are dynamically added to the DOM, we cannot add event listeners to the delete buttons themselves
  $(document).on("click", ".delete", function () {
    //this: refer to delete button that fire click event
    deleteTask($(this).data("id"));
  });

 const markTaskComplete = id =>{
   $.ajax({
     type: "PUT",
     url: "https://altcademy-to-do-list-api.herokuapp.com/tasks/" + id + "/mark_complete?api_key=377",
     dataType: "json",
     success: function (response, textStatus) {
          getAndDisplayAllTasks();
     },
     error: function (request, textStatus, errorMessage) {
       console.log(errorMessage);
     },
   });
    } 
    
    //link checkbox to markTaskComplete function
    $(document).on("change", ".mark-complete", function () {
        //this: refer to checkbox input
        //if task is checked
        if (this.checked) {
          markTaskComplete($(this).data("id"));
        }
    })

  //call getAndDisplayAllTasks function after a task is created
  getAndDisplayAllTasks();
});
