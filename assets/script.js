    const buttonEl = document.querySelector("#save-task")
    const tasksToDoEl = document.querySelector("#tasks-to-do")

    
     
    const createTaskHandler = () => {
        let listItemEL = document.createElement("li");
        listItemEL.className = "task-item";
        listItemEL.textContent = "This is a new task";
        tasksToDoEl.appendChild(listItemEL);
    }

    buttonEl.addEventListener("click", createTaskHandler
    );