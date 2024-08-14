export default class TODO {
	constructor(
		{
			list = null,
			item = null,
			addButton = null,
			number = null,
			input = null,
			controlList = null,
			submit = null,
			edit = null,
			deleteControl = null,
		} = null
	) {
		this.todoList = document.querySelector(list);
		this.todoItem = item;
		this.todoAddButton = document.querySelector(addButton);
		this.todoInput = input;
		this.todoNumber = number;
		this.todoControlList = controlList;
		this.todoControlSubmit = submit;
		this.todoControlEdit = edit;
		this.todoControlDelete = deleteControl;
		this.initialize();
	}

	initialize() {
		this.loadTasks();
		this.setupAddTaskListener();
	}

	// Handle click on add new task button
	setupAddTaskListener() {
		this.todoAddButton.addEventListener("click", () => this.createNewTask());
		this.getInputElements();
	}

	setTaskNumber() {
		Array.from(this.todoList.querySelectorAll(this.todoItem)).forEach(
			(item, i) => {
				item.querySelector(this.todoNumber).innerText = `${i + 1}.`;
			}
		);
	}

	// Get the closest item element for a given input
	getItemElement(input) {
		return input.closest(this.todoItem);
	}

	// Update visibility of controls based on input value
	updateControlVisability(input) {
		const controlList = this.getItemElement(input).querySelector(
			this.todoControlList
		);
		controlList.classList.toggle("active", input.value.length > 0);
	}

	updateInputState(input) {
		if (input.value.length > 0) {
			if (input.value.length > 0) {
				input.setAttribute("value", input.value);
				input.setAttribute("readonly", "");
			} else {
				input.removeAttribute("readonly");
				input.removeAttribute("value");
			}
			this.updateControlVisability(input);
		}
	}

	// Handle input changes by updating controls and attributes
	handleInputChanges(input) {
		input.addEventListener("blur", () => this.updateInputState(input));
		input.addEventListener("keypress", (e) => {
			if (e.key === "Enter") {
				this.updateInputState(input);
			}
		});
	}

	// Handle task deletion
	handleTaskDeletion(input, trigger) {
		trigger.addEventListener("click", () => {
			const item = this.getItemElement(input);
			if (this.todoList.querySelectorAll(this.todoInput).length > 1) {
				item.remove();
			} else {
				this.resetTask(input, item);
			}
			this.setTaskNumber();
			this.saveTasks();
		});
	}

	resetTask(input, item) {
		input.value = "";
		input.setAttribute("value", "");
		this.updateControlVisability(input);
		input.removeAttribute("readonly");
		if (this.checkTaskStatus(input)) {
			item.classList.remove("done");
		}
	}

	// Handle task submission (mark as done or undone) {
	handleTaskSubmission(trigger, item) {
		trigger.addEventListener("click", () => {
			const controls = this.getControl(item, "submit").parentElement;
			item.classList.toggle("done");
			Array.from(controls).forEach((control) => {
				if (control !== trigger) {
					control.style.display = this.checkTaskStatus(item) ? "none" : "block";
				}
			});
			this.saveTasks();
		});
	}

	// Get control button element from an item
	getControl(item, buttonType) {
		switch (buttonType) {
			case "submit":
				return item.querySelector(this.todoControlSubmit);
			case "edit":
				return item.querySelector(this.todoControlEdit);
			case "delete":
				return item.querySelector(this.todoControlDelete);
			default:
				throw new Error("Invalid button type");
		}
	}

	// Handle editing of an input fieldd
	handleEdit(trigger, input) {
		if (trigger.tagName === "INPUT") {
			input = trigger;
		}
		trigger.addEventListener("click", () => {
			if (!this.checkTaskStatus(input)) {
				if (trigger === document.querySelector(this.todoControlEdit)) {
					input.focus();
					input.setSelectionRange(input.value.length, input.value.length);
				}
				if (
					input.getAttribute("readonly") !== "" ||
					input.getAttribute("value") !== ""
				) {
					input.removeAttribute("readonly");
					input.setAttribute("value", "");
				}
			}
		});
	}

	itemHTML() {
		return `
            <p class="todo__number"></p>
            <label>
                <input type="text" placeholder="Type something..." class="todo__input">
            </label>
            <div class="todo__controls">
                <button class="todo__control check" title="Submit"></button>
                <button class="todo__control edit" title="Edit"></button>
                <button class="todo__control delete" title="Delete"></button>
            </div>
        `;
	}

	setValue(input, eventName) {
		input.addEventListener(eventName, (e) => {
			if (e.type === "blur" || (e.type === "keypress" && e.key === "Enter")) {
				if (input.value.length > 0) {
					input.setAttribute("value", input.value);
					input.setAttribute("readonly", "");
				}
			}
		});
	}

	checkTaskStatus(input) {
		const isDone = this.getItemElement(input).classList.contains("done");
		return isDone;
	}

	// Get all input elements and initialize their event handlers
	getInputElements() {
		this.todoList.querySelectorAll(this.todoItem).forEach((item) => {
			const inputs = item.querySelectorAll(this.todoInput);
			inputs.forEach((input) => {
				this.handleInputChanges(input);
				this.handleEdit(this.getControl(item, "edit"), input);
				this.handleTaskDeletion(input, this.getControl(item, "delete"));
				this.handleTaskSubmission(this.getControl(item, "submit"), item);
				this.setTaskNumber();
			});
		});
	}

	// Create a new task item and add it to the list
	createNewTask() {
		const newItem = document.createElement("li");
		newItem.classList.add("todo__item");
		newItem.innerHTML = this.itemHTML();
		this.todoList.appendChild(newItem);
		this.getInputElements();
		this.saveTasks();
	}

	render() {
		this.getInputElements(); // Ensure inputs are updated with correct event listeners
	}

	saveTasks() {
		const tasks = Array.from(this.todoList.querySelectorAll(this.todoItem)).map(
			(item) => {
				const input = item.querySelector(this.todoInput);
				return {
					text: input.value,
					done: item.classList.contains("done"),
				};
			}
		);
		localStorage.setItem("tasks", JSON.stringify(tasks));
		console.log("Tasks saved:", tasks);
	}

	loadTasks() {
		const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
		tasks.forEach((task) => {
			const newItem = document.createElement("li");
			newItem.classList.add("todo__item");
			newItem.innerHTML = this.itemHTML();
			this.todoList.appendChild(newItem);

			const input = newItem.querySelector(this.todoInput);
			input.value = task.text;
			if (task.done) {
				newItem.classList.add("done");
			}

			this.getInputElements();
		});
		console.log("Tasks loaded:", tasks);
	}
}
