const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const liveRegion = document.getElementById("liveRegion");

let tasks = [];


/* Screen reader announcement */

function announce(message) {

    liveRegion.textContent = "";

    setTimeout(() => {
        liveRegion.textContent = message;
    }, 50);
}


/* Update task count */

function updateTaskCount() {

    const count = tasks.length;

    if (count === 0) {
        taskCount.textContent = "0 tasks";
    }
    else if (count === 1) {
        taskCount.textContent = "1 task";
    }
    else {
        taskCount.textContent = `${count} tasks`;
    }
}


/* Display tasks */

function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const listItem = document.createElement("li");

        listItem.className = "task-item";


        /* Task content */

        const taskContent = document.createElement("div");

        taskContent.className = "task-content";


        /* Checkbox */

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked = task.completed;

        checkbox.id = `task-${index}`;

        checkbox.setAttribute(
            "aria-label",
            `Mark ${task.text} as ${
                task.completed ? "incomplete" : "complete"
            }`
        );


        checkbox.addEventListener("change", () => {

            task.completed = checkbox.checked;

            renderTasks();

            if (task.completed) {

                announce(
                    `Task ${task.text} marked as complete.`
                );

            } else {

                announce(
                    `Task ${task.text} marked as incomplete.`
                );
            }
        });


        /* Task text */

        const taskText = document.createElement("span");

        taskText.className = "task-text";

        taskText.textContent = task.text;

        if (task.completed) {
            taskText.classList.add("completed");
        }


        taskContent.appendChild(checkbox);

        taskContent.appendChild(taskText);


        /* Delete button */

        const deleteButton = document.createElement("button");

        deleteButton.type = "button";

        deleteButton.className = "delete-button";

        deleteButton.textContent = "Delete";

        deleteButton.setAttribute(
            "aria-label",
            `Delete task ${task.text}`
        );


        deleteButton.addEventListener("click", () => {

            const deletedTask = task.text;

            tasks.splice(index, 1);

            renderTasks();

            announce(
                `Task ${deletedTask} deleted.`
            );
        });


        listItem.appendChild(taskContent);

        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);
    });

    updateTaskCount();
}


/* Add task */

taskForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === "") {

        announce("Please enter a task.");

        taskInput.focus();

        return;
    }


    tasks.push({
        text: taskText,
        completed: false
    });


    renderTasks();

    announce(
        `Task ${taskText} added successfully.`
    );


    taskInput.value = "";

    taskInput.focus();
});


/* Initial display */

renderTasks();