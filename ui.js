function renderTasks(filter = "all") {
  const list = document.getElementById("taskList");
  const searchText = document.getElementById("search").value.toLowerCase();

  list.innerHTML = "";

  let filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.done;
    if (filter === "pending") return !task.done;
    return true;
  });

  filteredTasks = filteredTasks.filter(task =>
    task.text.toLowerCase().includes(searchText)
  );

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");

    const isOverdue = task.due && new Date(task.due) < new Date() && !task.done;
    if (isOverdue) li.style.borderLeft = "5px solid red";

    li.innerHTML = `
      <span onclick="toggleTask(${index})" class="${task.done ? 'completed' : ''}">
        ${task.text}
        <small>(${task.due || "No due"})</small>
      </span>
      <button onclick="deleteTask(${index})">X</button>
    `;

    list.appendChild(li);
  });

  updateStats();
}

function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.done).length;
  const pending = total - completed;

  document.getElementById("stats").innerHTML =
    `Total: ${total} | Completed: ${completed} | Pending: ${pending}`;
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

document.getElementById("taskInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") addTask();
});

renderTasks();