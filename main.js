// Get Element Siblings
function getSiblings(elem) {
	var siblings = [];
	var sibling = elem.parentNode.firstChild;
	while (sibling) {
		if (sibling.nodeType === 1 && sibling !== elem) {
			siblings.push(sibling);
		}
		sibling = sibling.nextSibling;
	}
	return siblings;
};

// Slide Up Effect

function slideUp(element, duration = 500) {
	return new Promise(function (resolve, reject) {
		element.style.height = element.offsetHeight + 'px';
		element.style.transitionProperty = `height, margin, padding`;
		element.style.transitionDuration = duration + 'ms';
		element.offsetHeight;
		element.style.overflow = 'hidden';
		element.style.height = 0;
		element.style.paddingTop = 0;
		element.style.paddingBottom = 0;
		element.style.marginTop = 0;
		element.style.marginBottom = 0;
		window.setTimeout(function () {
			element.style.display = 'none';
			element.style.removeProperty('height');
			element.style.removeProperty('padding-top');
			element.style.removeProperty('padding-bottom');
			element.style.removeProperty('margin-top');
			element.style.removeProperty('margin-bottom');
			element.style.removeProperty('overflow');
			element.style.removeProperty('transition-duration');
			element.style.removeProperty('transition-property');
			resolve(false);
		}, duration)
	})
}

// Slide Down Effect
function slideDown(element, duration = 500) {

	return new Promise(function (resolve, reject) {

		element.style.removeProperty('display');
		let display = window.getComputedStyle(element).display;

		if (display === 'none')
			display = 'block';

		element.style.display = display;
		let height = element.offsetHeight;
		element.style.overflow = 'hidden';
		element.style.height = 0;
		element.style.paddingTop = 0;
		element.style.paddingBottom = 0;
		element.style.marginTop = 0;
		element.style.marginBottom = 0;
		element.offsetHeight;
		element.style.transitionProperty = `height, margin, padding`;
		element.style.transitionDuration = duration + 'ms';
		element.style.height = height + 'px';
		element.style.removeProperty('padding-top');
		element.style.removeProperty('padding-bottom');
		element.style.removeProperty('margin-top');
		element.style.removeProperty('margin-bottom');
		window.setTimeout(function () {
			element.style.removeProperty('height');
			element.style.removeProperty('overflow');
			element.style.removeProperty('transition-duration');
			element.style.removeProperty('transition-property');
		}, duration)
	})
}

// Accordion JS

var accBtn = document.querySelectorAll('.accordion__btn');
if (accBtn.length) {
	Array.from(accBtn, btn => {
		const content = btn.nextElementSibling;
		const parent = btn.parentElement;
		const parentSiblings = getSiblings(parent);
		btn.addEventListener('click', function (e) {
			Array.from(parentSiblings, el => {
				Array.from(el.children, child => {
					if (child.className === 'accordion__content') {
						slideUp(child, 500)
					}
				});
				setTimeout(() => el.classList.remove('active'), 500);
			});
			if (parent.classList.contains('active')) {
				parent.classList.remove('active');
				slideUp(content);
			} else {
				parent.classList.add('active');
				slideDown(content);
			}
		})
	})
}
