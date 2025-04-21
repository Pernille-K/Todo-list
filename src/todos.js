function addTask() {
	const taskInputElement = document.getElementById("task-input");
	let taskName = taskInputElement.value.trim();

	if (!taskName) {
		return;
	}

	const listItem = document.createElement("li");
	const textSpan = document.createElement("span");
	textSpan.classList.add("breakable-text");
	textSpan.textContent = taskName;

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
	inputAndLabelElement.appendChild(textSpan);

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

	checkAndChangeBackground(noTasks, noCompleted);
}

function checkAndChangeBackground(noTasks, noCompleted) {
	const root = document.documentElement;

	const purple = {
		container: "#C78EFF",
		body: "#e4c9ff",
		details: "#f6edff",
	};

	// The thresholds array contains thresholds where each defines
	// a max value and the corresponding colors for container and body
	const thresholds = [
		{ max: 0.25, colors: { container: "#FF6961", body: "#ff9e99", details: "#ffe6e5" } }, // rød
		{ max: 0.5, colors: { container: "#fab350", body: "#ffcc84", details: "#fce8cf" } }, // oransje
		{ max: 0.75, colors: { container: "#F8D66D", body: "#ffe79f", details: "#fff4d3" } }, // gul
		{ max: 1, colors: { container: "#6FCF97", body: "#b3ebc9", details: "#e4fcef" } }, // grønn
	];

	let colors;

	if (noTasks === 0) {
		colors = purple;
	} else {
		const proportion = noCompleted / noTasks;
		colors = thresholds.find((threshold) => proportion <= threshold.max).colors;
	}

	const { container, body, details } = colors;

	root.style.setProperty("--background-color-container", container);
	root.style.setProperty("--background-color-body", body);
	root.style.setProperty("--details-color", details);
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

document.getElementById("task-input").addEventListener("keypress", function (e) {
	if (e.key === "Enter") {
		addTask();
	}
});
