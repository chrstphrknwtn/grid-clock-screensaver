/* global document */

'use strict';

const allNodeList = document.querySelectorAll('*');
const allElements = Array.prototype.slice.call(allNodeList, 0);

const prefixElements = document.querySelectorAll('.prefix');
const suffixElements = document.querySelectorAll('.suffix');

function el(selector) {
	return document.querySelector(selector);
}

function setClockElOn(selector) {
	el(selector).classList.add('on');
}

function setPrefixElOn(number) {
	prefixElements[number - 1].classList.add('on');
}

function setSuffixElOn(number) {
	if (parseInt(number, 10) === 13) {
		number = 1;
	}
	suffixElements[number - 1].classList.add('on');
}

function setMinutes(minutes) {
	minutes = minutes.toString().split('');

	switch (parseInt(minutes[0], 10)) { // eslint-disable-line default-case
		case 2:
			setClockElOn('.twenty-minutes');
			break;
		case 3:
			setClockElOn('.thirty-minutes');
			break;
		case 4:
			setClockElOn('.forty-minutes');
			break;
		case 5:
			setClockElOn('.fifty-minutes');
			break;
	}

	if (minutes % 10 !== 0) {
		setSuffixElOn(parseInt(minutes[1], 10));
	}
}

function clearClock() {
	allElements.forEach(element => {
		element.classList.remove('on');
	});
}

/** Main / Update Clock
----------------------------------------------------------------------------- */
function updateClock() {
	const date = new Date();
	let hour = date.getHours();
	const minutes = date.getMinutes();

	// Convert 24 hour time to 12 hour
	if (hour >= 13) {
		hour -= 12;
	}
	if (parseInt(hour, 10) === 0) {
		hour = 12;
	}

	// 'Turn off' all clock elements
	clearClock();

	// One minute past [hour]
	if (parseInt(minutes, 10) === 1) {
		setClockElOn('.one');
		setClockElOn('.minute');
		setClockElOn('.past');
		setSuffixElOn(hour);
		return;
	}

	// [minutes] past [hour]
	if (minutes <= 12 && minutes >= 2) {
		setPrefixElOn(minutes);
		setClockElOn('.minutes');
		setClockElOn('.past');
		setSuffixElOn(hour);
		return;
	}

	switch (minutes) { // eslint-disable-line default-case
		// [hour] o'clock
		case 0:
			setPrefixElOn(hour);
			setClockElOn('.oclock');
			return;
		// [hour] [minutes]
		case 13:
			setPrefixElOn(hour);
			setClockElOn('.thirteen');
			return;
		case 14:
			setPrefixElOn(hour);
			setClockElOn('.fourteen');
			return;
		case 16:
			setPrefixElOn(hour);
			setClockElOn('.sixteen');
			return;
		case 17:
			setPrefixElOn(hour);
			setClockElOn('.seventeen');
			return;
		case 18:
			setPrefixElOn(hour);
			setClockElOn('.eighteen');
			return;
		case 19:
			setPrefixElOn(hour);
			setClockElOn('.nineteen');
			return;
		// Quarter past [hour]
		case 15:
			setClockElOn('.quarter');
			setClockElOn('.past');
			setSuffixElOn(hour);
			return;
		// Twenty past [hour]
		case 20:
			setClockElOn('.twenty');
			setClockElOn('.past');
			setSuffixElOn(hour);
			return;
		// Half past [hour]
		case 30:
			setClockElOn('.half');
			setClockElOn('.past');
			setSuffixElOn(hour);
			return;
		// Half to [next hour]
		case 40:
			setClockElOn('.twenty');
			setClockElOn('.to');
			setSuffixElOn(hour + 1);
			return;
		// Quarter to [next hour]
		case 45:
			setClockElOn('.quarter');
			setClockElOn('.to');
			setSuffixElOn(hour + 1);
			return;
		// Ten to [next hour]
		case 50:
			setClockElOn('.ten');
			setClockElOn('.to');
			setSuffixElOn(hour + 1);
			return;
		// Five to [next hour]
		case 55:
			setClockElOn('.five');
			setClockElOn('.to');
			setSuffixElOn(hour + 1);
			return;
	}

	// [hour] [minutes]
	setPrefixElOn(hour);
	setMinutes(minutes);
}

/** Tick / init
----------------------------------------------------------------------------- */
setInterval(updateClock, 1000);
updateClock();
