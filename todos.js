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


	const inputAndLabelElement = document.createElement("span");
	inputAndLabelElement.appendChild(inputElement);
	inputAndLabelElement.appendChild(textContent);

	listItem.appendChild(inputAndLabelElement);

	const list = document.getElementById("task-list");
	list.insertBefore(listItem, list.firstChild);

	document.getElementById("task-input").value = "";


	tasks.push({
		name: String(taskName),
	});

	addListener(taskName);
}


function iterateTasks(taskName) {
	for (let task of tasks) {
		console.log(task);
		if (task.name === taskName) {
			console.log("taskname = taskname" + task);
			return task;
		}
	}
	return null;
}

function addListener(taskName) {
	const checkBox = document.getElementById("checkbox_" + taskName);

	checkBox.addEventListener("change", onChange);
}
function onChange(e) {
	const checkboxName = e.target.id;

	const currentListItem = document.getElementById(checkboxName).parentElement;
	const taskName = checkboxName.replace("checkbox_", "");
	const currentTaskObj = iterateTasks(taskName);

	if (this.checked) {
		currentListItem.style.textDecoration = "line-through";
	} else {
		currentListItem.style.textDecoration = "none";
	}

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
