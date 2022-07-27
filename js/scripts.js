// Custom Scripts
//Checking the device
const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows());
	}
};

if (isMobile.any()) {
	document.body.classList.add('_touch');
} else {
	document.body.classList.add('_pc');
}

// Scrolling when clicked

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');// JS будет искать только те объекты с классом menu__link, у которых есть атрибут data-goto. 

if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) { //(проверка заполненности атрибута && проверка на наличие такого дата-атрибута)
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

			if (iconMenu.classList.contains('_active')) {
				document.body.classList.remove('_lock');
				iconMenu.classList.remove('_active');
				menuBody.classList.remove('_active');
			}

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}

// Menu-burger

const iconMenu = document.querySelector('.menu__icon')
const menuBody = document.querySelector('.menu__body')
if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	})
}



// Fullscreen
function ibg() {

	$.each($('.ibg'), function (index, val) {
		if ($(this).find('img').length > 0) {
			$(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
		}
	});
}

ibg();

//Scroll on fullscreen

const collection = document.querySelectorAll('a.goto');

if (collection.length > 0) {
	collection.forEach(link => {
		link.addEventListener("click", onMenuLink);
	});
}
function onMenuLink(e) {
	const href = this.getAttribute('href').substring(1)
	const scrollTarget = document.getElementById(href)
	const topOffset = 0
	const elementPosition = scrollTarget.getBoundingClientRect().top
	const offsetPosition = elementPosition - topOffset

	window.scrollBy({
		top: offsetPosition - document.querySelector('header').offsetHeight,
		behavior: 'smooth'
	})
	e.preventDefault();
}

//Works
const gallery = document.querySelector('.works__gallery');
const buttonContainer = document.querySelector('.works__container');
const button = document.querySelector('.works__column_r');
const body = document.body;
let widthBody;
const stylesBody = getComputedStyle(body);
getWidth = () => {
	widthBody = parseInt(stylesBody.width);
	if (widthBody <= 768) {
		gallery.after(button)
		gallery.style.marginBottom = '50px';
		button.style.cssText = `
			text-align: right;
			margin-right: 25px;
			margin-bottom: 40px;
		`
	} else {
		buttonContainer.append(button);
		button.style.cssText = `
			margin-right: 0;
			margin-bottom: 0;
		`
	}
}
window.addEventListener('resize', getWidth)
window.addEventListener('load', getWidth)

//Diagram
const stripeColor = Array.from(document.querySelectorAll('.diagram__stripe-color'))
const procent = Array.from(document.querySelectorAll('.diagram__procent'))
for (let i = 0; i < stripeColor.length; i++) {
	const text = procent[i].textContent
	stripeColor[i].style.width = `${text}`;
	procent[i].style.marginLeft = `${parseInt(text) - 5}%`
}

//News

const cards = Array.from(document.querySelectorAll('.news__signature'));
setHeight = () => {
	if (widthBody >= 991) {
		let maxHeight = 0;
		for (let i = 0; i < cards.length; i++) {
			let thisHeight = parseInt(getComputedStyle(cards[i]).height);
			if (thisHeight > maxHeight) {
				maxHeight = thisHeight;
			}
		}
		for (let i = 0; i < cards.length; i++) {
			cards[i].style.height = `${maxHeight}px`
		}
	} else {
		return
	}
}


//Footer
const footerTitles = document.body.querySelectorAll('.footer__title');

let footerIcon;
function footerList() {
	widthBody = parseInt(stylesBody.width)
	console.log(widthBody);
	if (footerTitles.length > 0) {
		footerTitles.forEach(footerTitle => {
			footerTitle.addEventListener('click', (e) => {
				if (widthBody < 992) {
					let footerLink = e.target;
					if (footerLink.closest('.footer__title')) {
						const footerItem = footerLink.closest('.footer__item')
						const footerList = footerItem.querySelector('.footer__list')
						if (footerLink.closest('.footer__icon')) {
							footerIcon = footerLink;
						} else {
							footerIcon = footerLink.querySelector('.footer__icon');
						}
						footerList.classList.toggle('_active');
						footerIcon.classList.toggle('_active');
						e.preventDefault();
					}
				} else {
					return;
				}
			})
		})
	}
}
window.addEventListener('DOMContentLoaded', footerList)
window.addEventListener('resize', footerList)


//Remove Header color


let mainscreenHeight
const menu = document.querySelector('.menu')


function getMainscreenHeight() {
	mainscreenHeight = parseInt(getComputedStyle(document.querySelector(".mainscreen")).height);
}



window.addEventListener('DOMContentLoaded', getMainscreenHeight)
window.addEventListener('resize', getMainscreenHeight)


removeHeaderColor = () => {
	let menuLogo = document.querySelector('.menu__logo')
	console.log(mainscreenHeight);
	if (window.scrollY >= mainscreenHeight) {
		menu.classList.add('_black');
		menuLogo.classList.add('_white');
		iconMenu.classList.add('_white');
		menuLinks.forEach(menuLink => {
			menuLink.classList.add('_white');
		});
	} else {
		menu.classList.remove('_black');
		menuLogo.classList.remove('_white');
		iconMenu.classList.remove('_white');
		menuLinks.forEach(menuLink => {
			menuLink.classList.remove('_white');
		})
	}
}
window.addEventListener('scroll', removeHeaderColor);
window.addEventListener('DOMContentLoaded ', removeHeaderColor);

