/* the following code is by @sindresorhus and can be found at https://github.com/sindresorhus/devtools-detect */
(function () {
	'use strict';

	const devtools = {
		isOpen: false,
		orientation: undefined
	};

	const threshold = 160;

	const emitEvent = (isOpen, orientation) => {
		window.dispatchEvent(new CustomEvent('devtoolschange', {
			detail: {
				isOpen,
				orientation
			}
		}));
	};

	const main = ({ emitEvents = true } = {}) => {
		const widthThreshold = window.outerWidth - window.innerWidth > threshold;
		const heightThreshold = window.outerHeight - window.innerHeight > threshold;
		const orientation = widthThreshold ? 'vertical' : 'horizontal';

		if (
			!(heightThreshold && widthThreshold) &&
			((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)
		) {
			if ((!devtools.isOpen || devtools.orientation !== orientation) && emitEvents) {
				emitEvent(true, orientation);
			}

			devtools.isOpen = true;
			devtools.orientation = orientation;
		} else {
			if (devtools.isOpen && emitEvents) {
				emitEvent(false, undefined);
			}

			devtools.isOpen = false;
			devtools.orientation = undefined;
		}
	};

	main({ emitEvents: false });
	setInterval(main, 500);

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = devtools;
	} else {
		window.devtools = devtools;
	}
})();

/* this is my addition */
document.onkeydown = function(e) {
	if (e.ctrlKey && (e.keyCode === 67 || e.keyCode === 86 || e.keyCode === 85 || e.keyCode === 117)) {//Alt+c, Alt+v will also be disabled sadly.
		alert('not allowed');
	}
	return false;
};
window.addEventListener('devtoolschange', event => {
	window.location.replace("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
});
if (window.devtools.isOpen) {
	window.location.replace("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
}
