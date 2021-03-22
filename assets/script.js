    
    var tasksToDoEL = document.querySelector("#tasksto")

    var formEL = document.querySelector("#task-form")

    
     
    const createTaskHandler = function(event) {

        event.preventDefault();

        var listItemEL = document.createElement("li");
        listItemEL.className = "task-item";
        listItemEL.textContent = "This is a new task.";
        tasksToDoEL.appendChild(listItemEL);

    };

    formEL.addEventListener("submit", createTaskHandler);