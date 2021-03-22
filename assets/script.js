    
   var formEl = document.querySelector("#task-form");
   var tasksToDoEl = document.querySelector("#tasks-to-do");
   var taskIdCounter = 0
   var pageContentEl =document.querySelector('#page-content');
   var tasksInProgressEl = document.querySelector("#tasks-in-progress");
   var tasksCompletedEl = document.querySelector("#tasks-completed");

   var taskFormHandler = function (event) {
     event.preventDefault();
     var taskNameInput = document.querySelector("input[name='task-name']")
       .value;
     var taskTypeInput = document.querySelector("select[name='task-type']")
       .value;
     //package up data as an object
     //check if input values are empty strings
     if (!taskNameInput || !taskTypeInput) {
       alert("You Need to fill out the task form!");
       return false;
     }

     formEl.reset();

     var isEdit = formEl.hasAttribute("data-task-id");

     var taskDataObj = {
       name: taskNameInput,
       type: taskTypeInput,
     };

     //sned it as an argument to createTaskEl
     // has data attribute, so get task id and call function to complete edit process
     if (isEdit) {
       var taskId = formEl.getAttribute("data-task-id");
       completeEditTask(taskNameInput, taskTypeInput, taskId);
     }
     // no data attribute, so create object as normal and pass to createTaskEl function
     else {
       var taskDataObj = {
         name: taskNameInput,
         type: taskTypeInput,
       };

       createTaskEl(taskDataObj);
     }
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

   var taskButtonHandler = function(event){

    var targetEl =event.target;
       //console.log(event.target);

       if (targetEl.matches(".edit-btn")){
           var taskId =targetEl.getAttribute("datd-task-id")
           editTask(taskId)
       }
       else if (targetEl.matches (".delete-btn")){
           var taskId = targetEl.getAttribute("data-task-id");
           deleteTask(taskId);
           
       }
   
    }
   var deleteTask = function (taskId){
       if(event.target.matches(".delete-btn")){
           var taskId =event.target.getAttribute("data-task-id");
       }
       var taskSelected = document.querySelector(".task-item[data-task-id='"+taskId+"']" );
    taskSelected.remove();
   }

   var editTask =function (taskId){
       console.log("editing task #" = taskId);

       //get task list element
       var taskSelected =document.querySelector(".task-item[data-task-id='" + taskId + "']");
       var taskName = taskSelected.querySelector("h3.task-name").textContent;
     

       var taskType = taskSelected.querySelector("span.task-type").textContent;
     document.querySelector("input[name='task-name']").value = taskName;
     document.querySelector("select[name='task-type']").value = taskType;
     
     document.querySelector("#save-task").textContent = "Save Task";
     formEl.setAttribute("data-task-id", taskId);
   
   }


   var completeEditTask = function (taskName, taskType, taskId) {
     // find the matching task list item
     var taskSelected = document.querySelector(
       ".task-item[data-task-id='" + taskId + "']"
     );

     // set new values
     taskSelected.querySelector("h3.task-name").textContent = taskName;
     taskSelected.querySelector("span.task-type").textContent = taskType;

     alert("Task Updated!");
     formEl.removeAttribute("data-task-id");
     document.querySelector("#save-task").textContent = "Add Task";
   };

   var taskStatusChangeHandler =function(event){
       //get the task item's id
       var taskId = event.target.getAttribute("data-task-id");

       //get the currenlty selected options value and convert to lowercase/
       var statusValue = event.target.value.toLowerCase();

       //find the parent task item elemnet based id
       var taskSelected - document.querySelector(".task-item[data-task-id='" + taskId + "']"
       
       if (statusValue === "to do") {
  tasksToDoEl.appendChild(taskSelected);
} 
else if (statusValue === "in progress") {
  tasksInProgressEl.appendChild(taskSelected);
} 
else if (statusValue === "completed") {
  tasksCompletedEl.appendChild(taskSelected);
}
   }

   pageContentEl.addEventListener("change", taskStatusChangeHandler)
   
   pageContentEl.addEventListener("click", taskButtonHandler)