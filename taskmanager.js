let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("taskInput");
  const dueInput = document.getElementById("dueDate");

  if (!input.value.trim()) {
    return alert("Task cannot be empty");
  }

  if (dueInput.value && new Date(dueInput.value) < new Date().setHours(0,0,0,0)) {
    return alert("Due date cannot be in the past");
  }

  tasks.push({
    text: input.value,
    done: false,
    due: dueInput.value
  });

  input.value = "";
  dueInput.value = "";

  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}