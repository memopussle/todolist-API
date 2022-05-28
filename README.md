## **To Do List Assignment**
A To Do list web application that is connected to the ATDAPI service. 

It will have persistent data so that every time you visit the page, the list of tasks is the same as you left it. 

Make requests to ATDAPI: https://altcademy-to-do-list-api.herokuapp.com/


### Minimum requirements to fullfill
1. A list of tasks rendered in DOM based on data from the ATDAPI server

2. Each task has a description, a remove button, and mark complete/active button

3. An input element and a button that lets user add a new task

### Steps
I. Connecting to the API server

II. Injecting tasks into the DOM
- Create a div after h2 for housing our to do list. 
- P/s: JavaScript are run based on their order in the HTML file. App.js iis in <head>, therefore, it will run <script> first. Solution: wrap JS code in a jQuery ready function, so our programs only execute when HTML file is ready.
- inject tasks to <p> and then append and concatenate the content of each task with HTML string

III. Checking if API is working by using GET request
- make GET request
-inject default task content from DOM to HTML to make sure it's working

IV. Use method POST to create new task
- make POST request
- new content will be displayed in task { }. 

