    
   var formEl = document.querySelector("#task-form");
   var tasksToDoEl = document.querySelector("#tasks-to-do");
   var taskIdCounter = 0

   var taskFormHandler = function (event) {
     event.preventDefault();
     var taskNameInput = document.querySelector("input[name='task-name']")
       .value;
     var taskTypeInput = document.querySelector("select[name='task-type']")
       .value;
       //package up data as an object
       //check if input values are empty strings
       if (!taskNameInput || !taskTypeInput ){
           alert ("You Need to fill out the task form!")
           return false;
       }

       formEl.reset()
       
       var taskDataObj = {
           name: taskNameInput,
           type: taskTypeInput
       };

     //sned it as an argument to createTaskEl
     createTaskEl (taskDataObj)
   };

   var createTaskEl = function(taskDataObj) {
       var listItemEl = document.createElement("li");
     listItemEl.className = "task-item";

     // create div to hold task info and add to list item
     
     listItemEl.setAttribute("data-task-id", taskIdCounter); 
     // add HTML content to div
     
     var taskInfoEl = document.createElement("div");
     taskInfoEl.className = "task-info";

     taskInfoEl.innerHTML =
       "<h3 class='task-name'>" +
       taskDataObj.name+
       "</h3><span class='task-type'>" +
       taskDataObj.type+
       "</span>";
     listItemEl.appendChild(taskInfoEl);


     var taskActionsEl = createTaskActions(taskIdCounter)
    
     listItemEl.appendChild(taskActionsEl); 
     // add entire list item to list
     tasksToDoEl.appendChild(listItemEl);

     //increase task counter
     taskIdCounter++
   };

   formEl.addEventListener("submit" , taskFormHandler);


   var createTaskActions = function(taskId) {

    var acttionContainerEl = document.createElement("div");
    acttionContainerEl.className = "task-actions";

    //create edi button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit"
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    acttionContainerEl.appendChild(editButtonEl)


    //create delete button

    var deleteButtonEl = document.createElement("button")
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn"
    deleteButtonEl.setAttribute("data-task-id", taskId);

    acttionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change")
    statusSelectEl.setAttribute("data-task-id", taskId)

    acttionContainerEl.appendChild(statusSelectEl)

    var statusChoices = ["To Do", "In Progress", "Completed"]
    for (var i = 0; i < statusChoices.length; i++){
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices [i];
        statusOptionEl.setAttribute ("value", statusChoices[i]);

        //append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    return acttionContainerEl

   }; 