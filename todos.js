function addTask() {
	const taskInputElement = document.getElementById("task-input");
	let taskName = taskInputElement.value.trim();

	if (!taskName) {
		return;
	}

	const listItem = document.createElement("li");
	const textContent = document.createTextNode(taskName);

	if (document.getElementById(taskName)) {
		while (document.getElementById(taskName + "_" + i)) {
			i++;
		}
		taskName = `${taskName}_${i}`;
	}

	listItem.setAttribute("id", taskName);

	let inputElement = document.createElement("input");
	inputElement.setAttribute("type", "checkbox");
	inputElement.setAttribute("id", "checkbox_" + taskName);

	let deleteButton = document.createElement("button");
	deleteButton.setAttribute("class", "deleteButton");
	deleteButton.addEventListener("click", () => {
		deleteTask(taskName);
	});

	deleteButton.innerText = "🗑";

	const inputAndLabelElement = document.createElement("span");
	inputAndLabelElement.appendChild(inputElement);
	inputAndLabelElement.appendChild(textContent);

	listItem.appendChild(inputAndLabelElement);
	listItem.appendChild(deleteButton);

	const list = document.getElementById("task-list");
	list.insertBefore(listItem, list.firstChild);

	document.getElementById("task-input").value = "";

	let timeAdded = getAndFormatTime();

	tasks.push({
		name: String(taskName),
		timestamp: timeAdded,
		isCompleted: false,
	});

	addListener(taskName);
}

function getAndFormatTime() {
	let currentDate = new Date();
	let hours = currentDate.getHours();
	let minutes = currentDate.getMinutes();

	if (hours < 10) {
		hours = `0${hours}`;
	}

	if (minutes < 10) {
		minutes = `0${minutes}`;
	}

	let timeAdded = `${currentDate} ${hours}:${minutes}`;
	return timeAdded;
}

function iterateTasks(taskName) {
	for (let task of tasks) {
		if (task.name === taskName) {
			return task;
		}
	}
	return null;
}

function checkComplete(task) {
	return task.isCompleted == true;
}

function addListener(taskName) {
	const checkBox = document.getElementById("checkbox_" + taskName);

	checkBox.addEventListener("change", onChange);
	updateOutput();
}

function onChange(e) {
	const checkboxName = e.target.id;

	const currentListItem = document.getElementById(checkboxName).parentElement;
	const taskName = checkboxName.replace("checkbox_", "");
	const currentTaskObj = iterateTasks(taskName);

	if (this.checked) {
		currentListItem.style.textDecoration = "line-through";
		currentTaskObj.isCompleted = true;
	} else {
		currentListItem.style.textDecoration = "none";
		currentTaskObj.isCompleted = false;
	}

	updateOutput();
}

function updateOutput() {
	const outputElement = document.getElementById("output");
	const noTasks = tasks.length;

	const noCompleted = tasks.filter(checkComplete).length;

	outputElement.innerText = ` ${noCompleted} / ${noTasks} completed`;

	let proportionIndex = noTasks > 0 ? noCompleted / noTasks : 0;

	checkAndChangeBackground(proportionIndex);
}

function checkAndChangeBackground(proportionIndex) {
	const root = document.documentElement;

	// The thresholds array contains thresholds where each defines a max value and the corresponding colors for container and body
	const thresholds = [
		{ max: 0.25, containerColor: "#FF6961", bodyColor: "#ff9e99", detailsColor: "#ffe6e5" },
		{ max: 0.5, containerColor: "#fab350", bodyColor: "#ffcc84", detailsColor: "#fce8cf" },
		{ max: 0.75, containerColor: "#F8D66D", bodyColor: "#ffe79f", detailsColor: "#fff4d3" },
		{ max: 1, containerColor: "#8CD47E", bodyColor: "#aeefa1", detailsColor: "#e5ffe0" },
		{ max: Infinity, containerColor: "#e4c9ff", bodyColor: "#C78EFF", detailsColor: "#f6edff" },
	];

	const { containerColor, bodyColor, detailsColor } = thresholds.find((threshold) => proportionIndex <= threshold.max);

	root.style.setProperty("--background-color-container", containerColor);
	root.style.setProperty("--background-color-body", bodyColor);
	root.style.setProperty("--details-color", detailsColor);
}

function deleteTask(taskName) {
	const index = tasks.findIndex((task) => task.name === taskName);
	if (index !== -1) {
		tasks.splice(index, 1);
	}

	const taskElement = document.getElementById(taskName);
	if (taskElement) {
		taskElement.remove();
	}

	updateOutput();
}

const tasks = [];
let i = 1;

// Adding event listeners

document.querySelector(".minimize").addEventListener("click", () => {
	window.electronAPI.minimize();
});
document.querySelector(".maximize").addEventListener("click", () => {
	window.electronAPI.maximize();
});
document.querySelector(".close").addEventListener("click", () => {
	window.electronAPI.close();
});

document.getElementById("submit-button").addEventListener("click", addTask);

document.getElementById("task-input").addEventListener("keypress", function(e) {
	if (e.key === "Enter") {
		addTask();
	}
});
