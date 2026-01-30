// Date And Time
let date = document.querySelector(".date")
let time = document.querySelector(".time")
// Input
let addInput = document.querySelector(".add-input") 
let addBtn = document.querySelector(".btn-add")

// To Do Tasks
let taskList = document.querySelector(".task-list")
// Completed Tasks
let taskCompleted = document.querySelector(".task-completed")

// public 


// Function call area
updateClock()
setInterval(updateClock,1000)
addOldTasks();

// To Update Time And Date
function updateClock() {
    const now = new Date();
    // Set Time format
    time.textContent = now.toLocaleTimeString("en",{
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });
    // Set DAte format
    date.textContent = now.toLocaleDateString("en",{
        year: "numeric",
        month: "short",
        day: "numeric",
        weekday: "short"
    });
};
// Get Value Listner
addBtn.addEventListener("click", addTask)
// To Get Value And Send To Create Item
function addTask() {
    const tittle = addInput.value.trim();
    if (tittle === "") return;
    // Get Json File
    let Tasks = JSON.parse(localStorage.getItem("Tasks")) || {};
    // Add New object
    let id = Date.now();
    console.log(id + " from btn")
    Tasks[id] = {
    tittle: tittle,
    completed: false
    };
    // Save To LocalStorage
    localStorage.setItem("Tasks", JSON.stringify(Tasks));
    // Gat All Tasks
    let AllTasks = JSON.parse(localStorage.getItem("Tasks"));
    // Sent To Create Task Function
    creatTask(AllTasks[id].tittle, id );
    // show success toast
    // showSuccessToast("Task created successfully");
    addInput.value = "";
}
function creatTask (taskText, id) {
    // li Item llist
    let taskItem = document.createElement("li");
    taskItem.classList.add("task-item");
    // check icon 
    let checkIcon = document.createElement("i");
    checkIcon.classList.add("fa-regular","fa-circle-check");
    taskItem.appendChild(checkIcon);
    // Span For Task Text
    let span = document.createElement("span");
    span.classList.add("task-text");
    span.textContent = taskText;
    taskItem.appendChild(span);
    // Div To Conteanir Buttons
    let div = document.createElement("div");
    div.classList.add("actions");
    taskItem.appendChild(div);
    // delete-btn
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn","btn-icon");
    div.appendChild(deleteBtn);
    // deleteicon 
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-regular","fa-trash-can","btn-delete");
    deleteBtn.appendChild(deleteIcon);
    // Edit Button
    let editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn","btn-icon");
    div.appendChild(editBtn);
    // Edit icon 
    let editIcon = document.createElement("i");
    editIcon.classList.add("fa-regular","fa-pen-to-square");
    editBtn.appendChild(editIcon);
    // Add To Task List
    taskList.appendChild(taskItem)
    // Button Event Listner 
    // Delete Button 
    deleteBtn.addEventListener("click", () => {
        const nextItem = taskItem.nextElementSibling;
        if (nextItem?.classList.contains("task-edit-item")) {
            nextItem.remove();
        }
        console.log(id + " from btn")
        deleteTask(id);
        taskItem.remove();
    });
    // Edit Button 
    editIcon.addEventListener("click", () => {
        editTask(taskText,taskItem,id,span)
    })
    checkIcon.addEventListener("click", () => {
        completed(id)
        taskItem.remove();
    })
}
// For Delete Tasks
function deleteTask(id) {
    let Tasks = JSON.parse(localStorage.getItem("Tasks")) || {};
    delete Tasks[id];
    localStorage.setItem("Tasks", JSON.stringify(Tasks));
}
// For Edit Task
function editTask(taskText,item, id,itemText) {
    // li Task Edit
    let taskEdit = document.createElement("li");
    taskEdit.classList.add("task-edit-item")
    // Input Text For Edit Task
    let editInput = document.createElement("input");
    editInput.classList.add("edit-input");
    editInput.setAttribute("type","text")
    editInput.setAttribute("value",taskText)
    taskEdit.appendChild(editInput);
    // Div To Conteanir Buttons
    let div = document.createElement("div");
    div.classList.add("actions");
    taskEdit.appendChild(div);
    //Save Button
    let saveButten = document.createElement("button");
    saveButten.classList.add("save-btn");
    div.appendChild(saveButten);
    // Save icon 
    let saveIcon = document.createElement("i");
    saveIcon.classList.add("fa-solid","fa-floppy-disk");
    saveButten.appendChild(saveIcon);
    // Span 
    let span = document.createElement("span");
    span.textContent = "Save"
    saveButten.appendChild(span);
    // Cansel Button
    let cancelBtn = document.createElement("button");
    cancelBtn.classList.add("cancel-btn");
    div.appendChild(cancelBtn);
    // Cansel icon 
    let canselIcon = document.createElement("i");
    canselIcon.classList.add("fa-solid","fa-xmark");
    cancelBtn.appendChild(canselIcon);
    item.after(taskEdit)
    // cancel Edit And remove li
    cancelBtn.addEventListener("click", () => {
        taskEdit.remove()
    })
    // Event save button to save new value (with validation)
    saveButten.addEventListener("click", () => {
        const value = editInput.value.trim();
        if (value === "") {
            // show error message and highlight input
            showEditError(taskEdit, "Please write something ✏️");
            editInput.classList.add("input-error");
            setTimeout(() => editInput.classList.remove("input-error"), 1200);
            return;
        }
        itemText.textContent = value;
        editOldTask(value, id);
        taskEdit.remove();
    })
}
// Show temporary validation message for edit inputs
function showEditError(parent, message) {
    const existing = parent.querySelector(".edit-error");
    if (existing) existing.remove();
    const err = document.createElement("div");
    err.className = "edit-error";
    err.textContent = message;
    parent.appendChild(err);
    // animate in
    requestAnimationFrame(() => err.classList.add("visible"));
    // remove after a while
    setTimeout(() => {
        err.classList.remove("visible");
        setTimeout(() => err.remove(), 350);
    }, 2600);
}
// show success toast (temporary) when a new task is added
// function showSuccessToast(message) {
//     const container = document.querySelector('.container') || document.body;
//     const existing = container.querySelector('.toast-success');
//     if (existing) existing.remove();

//     const toast = document.createElement('div');
//     toast.className = 'toast-success';
//     toast.setAttribute('role','status');
//     toast.innerHTML = `<i class="fa-solid fa-circle-check"></i><span>${message}</span>`;
//     container.appendChild(toast);
//     requestAnimationFrame(() => toast.classList.add('visible'));
//     setTimeout(() => {
//         toast.classList.remove('visible');
//         setTimeout(() => toast.remove(), 320);
//     }, 2200);
//     toast.addEventListener('click', () => {
//         toast.classList.remove('visible');
//         setTimeout(() => toast.remove(), 160);
//     });
// }

function editOldTask(newText,id) {
    let Tasks = JSON.parse(localStorage.getItem("Tasks")) || {};
    Tasks[id].tittle = newText;
    localStorage.setItem("Tasks", JSON.stringify(Tasks));
}
// Loop for all old tasks and send to creattask function 
function addOldTasks(){
    let Tasks = JSON.parse(localStorage.getItem("Tasks"));
    Tasks.tittle
    for (const key in Tasks) {
        if (!Object.hasOwn(Tasks, key)) continue;
        const element = Tasks[key];
        if(element.completed)
        {
            createCompleted(element.tittle, key)
        }else{
            creatTask(element.tittle, key)
        }
    }
}
// Create Completed item
function createCompleted(Text,id) {
    // li Item llist
    let completedItem = document.createElement("li");
    completedItem.classList.add("task-item","completed-item");
    // Div To Conteanir
    let div = document.createElement("div");
    completedItem.appendChild(div);
    // check icon 
    let checkIcon = document.createElement("i");
    checkIcon.classList.add("fa-solid","fa-circle-check","check-icon");
    div.appendChild(checkIcon);

    // Span For Task Text
    let span = document.createElement("span");
    span.classList.add("task-text");
    span.textContent = Text;
    div.appendChild(span);

    // delete-btn
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    completedItem.appendChild(deleteBtn);
    // check icon 
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-regular","fa-trash-can","btn-delete");
    deleteBtn.appendChild(deleteIcon);
    taskCompleted.appendChild(completedItem)
    // Event to delete
    deleteBtn.addEventListener("click",() => {
        completedItem.remove()
        deleteTask(id)
    })
}
function completed(id) {
let Tasks = JSON.parse(localStorage.getItem("Tasks"));
Tasks[id].completed = true
localStorage.setItem("Tasks",JSON.stringify(Tasks));
createCompleted(Tasks[id].tittle, id)
}