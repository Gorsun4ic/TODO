'use strict'

// Body lock
export let bodyLockStatus = true
export let bodyLockToggle = (delay = 500) => {
	if (document.documentElement.classList.contains('lock')) {
		bodyUnlock(delay)
	} else {
		bodyLock(delay)
	}
}
export let bodyUnlock = (delay = 500) => {
	let body = document.querySelector('body')
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll('[data-lp]')
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index]
				el.style.paddingRight = '0px'
			}
			body.style.paddingRight = '0px'
			document.documentElement.classList.remove('lock')
		}, delay)
		bodyLockStatus = false
		setTimeout(function () {
			bodyLockStatus = true
		}, delay)
	}
}
export let bodyLock = (delay = 500) => {
	let body = document.querySelector('body')
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll('[data-lp]')
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index]
			el.style.paddingRight =
				window.innerWidth -
				document.querySelector('.wrapper').offsetWidth +
				'px'
		}
		body.style.paddingRight =
			window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'
		document.documentElement.classList.add('lock')

		bodyLockStatus = false
		setTimeout(function () {
			bodyLockStatus = true
		}, delay)
	}
}

// Burger menu
export function burger() {
	const burger = document.querySelector('.burger')
	if (burger) {
		const menu = document.querySelector('.menu')
		burger.addEventListener('click', function (e) {
			document.body.classList.toggle('_lock')
			burger.classList.toggle('_active')
			menu.classList.toggle('_active')
			document.documentElement.classList.toggle('menu-open')
		})
	}
}
export function menuOpen() {
	bodyLock()
	document.documentElement.classList.add('menu-open')
}
export function menuClose() {
	bodyUnlock()
	document.documentElement.classList.remove('menu-open')
}

// Popup
export function popup() {
	const popupButton = document.querySelectorAll('[data-popup]')
	const popupCloseButton = document.querySelectorAll('[data-close]')
	// Call this function to open popup
	function popupOpen(popup) {
		document.body.classList.add('_lock') // Activate lock styles
		document.body.classList.add('popup-show')
		popup.classList.add('popup-show')
		popup.setAttribute('data-popup', '')
		bodyLock() // Activate lock script
	}
	// Call this function to close popup
	function popupClose(popup) {
		document.body.classList.remove('popup-show')
		document.body.classList.remove('_lock')
		popup.classList.remove('popup-show')
		bodyUnlock()
	}
	popupButton.forEach(function (element) {
		const popup = document.getElementById(element.getAttribute('data-popup'))
		element.addEventListener('click', function (e) {
			popupOpen(popup)
			if (popup.classList.contains('popup-show')) {
				document.addEventListener('keydown', function (event) {
					// If user will press escape button or q button popup will close
					if (event.key === 'Escape' || event.key === 'q') {
						popupClose(popup)
					}
				})
				document.addEventListener('click', function (e) {
					// If the user is pressed on some area except for Popup (body), popup will close
					if (e.target === document.body) {
						popupClose(popup)
					}
				})
				popupCloseButton.forEach(function (element) {
					element.addEventListener('click', function (e) {
						popupClose(popup)
					})
				})
			}
		})
	})
}

// Phone mask
export function phoneMask() {
	const mask = (selector, pattern) => {
		function createMask() {
			let matrix = pattern,
				i = 0,
				def = matrix.replace(/\D/g, ''),
				val = this.value.replace(/\D/g, '')
			if (def.length >= val.length) val = def
			this.value = matrix.replace(/./g, function (a) {
				return /[_\d]/.test(a) && i < val.length
					? val.charAt(i++)
					: i >= val.length
					? ''
					: a
			})
		}
		let inputs = document.querySelectorAll(selector)
		inputs.forEach(input => {
			input.addEventListener('input', createMask)
			input.addEventListener('focus', createMask)
			input.addEventListener('blur', createMask)
		})
	}
	// First argument - input class name, second argument - mask
	mask('.phone-mask', '+380 (__) ___  __ __')
}
// Tabs
export function tabs() {
	const tabsButtons = document.querySelectorAll('.tabs__button')
	const tabsContents = document.querySelectorAll('.tabs__content')

	tabsButtons.forEach((tab, index) => {
		tab.addEventListener('click', () => {
			tabsButtons.forEach(tab => {
				tab.classList.remove('active')
			})
			tab.classList.add('active')

			tabsContents.forEach(content => {
				content.classList.remove('active')
			})
			tabsContents[index].classList.add('active')
		})
	})
}

// Accordions
export function accordions() {
	const accordion = document.querySelectorAll('.accordion__item')

	accordion.forEach((item, index) => {
		let label = item.querySelector('.accordion__label')
		label.addEventListener('click', () => {
			item.classList.toggle('active')
			let content = item.querySelector('.accordion__content')
			if (item.classList.contains('active')) {
				content.style.height = `${content.scrollHeight}px` //scrollHeight property returns the height of an element including padding , but excluding borders, scrollbar or margin
			} else {
				content.style.height = '0px'
			} //calling the funtion and also passing the index number of the clicked header
			removeOpen(index)
		})
	})

	function removeOpen(index1) {
		accordion.forEach((item2, index2) => {
			if (index1 != index2) {
				item2.classList.remove('active')

				let content = item2.querySelector('.accordion__content')
				content.style.height = '0px'
			}
		})
	}
}
