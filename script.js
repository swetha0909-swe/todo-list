// =============================
// Elements
// =============================

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");

const filterButtons = document.querySelectorAll(".filter-btn");
const themeBtn = document.getElementById("themeBtn");

// =============================
// Data
// =============================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// =============================
// Save Tasks
// =============================

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// =============================
// Display Tasks
// =============================

function displayTasks(){

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if(currentFilter === "active"){
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if(currentFilter === "completed"){
        filteredTasks = tasks.filter(task => task.completed);
    }

    if(filteredTasks.length === 0){
        emptyState.style.display = "block";
    }else{
        emptyState.style.display = "none";
    }

    filteredTasks.forEach((task,index)=>{

        const li = document.createElement("li");

        li.className = "task";

        li.innerHTML = `

        <div class="task-left">

            <input type="checkbox"
                   ${task.completed ? "checked":""}
                   onclick="toggleTask(${index})">

            <span class="${task.completed ? "completed":""}">
                ${task.text}
            </span>

        </div>

        <div class="task-right">

            <button onclick="editTask(${index})">
                ✏️
            </button>

            <button onclick="deleteTask(${index})">
                🗑️
            </button>

        </div>

        `;

        taskList.appendChild(li);

    });

}

// =============================
// Add Task
// =============================

addTaskBtn.addEventListener("click",()=>{

    const text = taskInput.value.trim();

    if(text===""){
        alert("Please enter a task.");
        return;
    }

    tasks.push({
        text:text,
        completed:false
    });

    taskInput.value="";

    saveTasks();

    displayTasks();

});

// =============================
// Delete
// =============================

function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();

    displayTasks();

}

// =============================
// Complete
// =============================

function toggleTask(index){

    tasks[index].completed=!tasks[index].completed;

    saveTasks();

    displayTasks();

}

// =============================
// Edit
// =============================

function editTask(index){

    const updated = prompt("Edit Task",tasks[index].text);

    if(updated!==null && updated.trim()!==""){

        tasks[index].text = updated;

        saveTasks();

        displayTasks();

    }

}

// =============================
// Filter
// =============================

filterButtons.forEach(button=>{

button.addEventListener("click",()=>{

currentFilter = button.dataset.filter;

filterButtons.forEach(btn=>btn.classList.remove("active"));

button.classList.add("active");

displayTasks();

});

});

// =============================
// Theme
// =============================

if(localStorage.getItem("theme")==="light"){

document.body.classList.add("light-mode");

themeBtn.innerHTML="☀️";

}

themeBtn.addEventListener("click",()=>{

document.body.classList.toggle("light-mode");

if(document.body.classList.contains("light-mode")){

themeBtn.innerHTML="☀️";

localStorage.setItem("theme","light");

}
else{

themeBtn.innerHTML="🌙";

localStorage.setItem("theme","dark");

}

});

// =============================
// Initial Load
// =============================

displayTasks();