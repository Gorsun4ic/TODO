import TODO from "./files/todo";

window.addEventListener("DOMContentLoaded", () => {

	"use strict";

	new TODO({
		"list": ".todo__list",
		"item": ".todo__item",
		"addButton": ".todo__button",
		"number": ".todo__number",
		"input": ".todo__input",
		"controlList": ".todo__controls",
		"submit": ".check",
		"edit": ".edit",
		"deleteControl": ".delete"
	}).render();

});