/*
# Copyright (C) 2023 techkev
# 
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published
# by the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program. If not, see <https://www.gnu.org/licenses/>.
*/

function initUpdateCountdownItemModal() {
	const modalElement = document.querySelector('#updateCountdownItemmodal');
	const modalInstance = M.Modal.init(modalElement);
	const speichernButton = document.querySelector('.modal-footer .countdown_save_button');
	speichernButton.addEventListener('click', updateCountdownItem);

	const inputFieldTitle = document.getElementById('countdown_titel');
	inputFieldTitle.addEventListener('keydown', function(event) {
		if (event.key === 'Enter') {
			updateCountdownItem(event);
		}
	})

	const inputFieldDate = document.getElementById('countdown_datum');
	inputFieldDate.addEventListener('keydown', function(event) {
		if (event.key === 'Enter') {
			updateCountdownItem(event);
		}
	})
}

async function updateCountdownItem(event) {
	event.preventDefault();

	const title = document.getElementById('countdown_titel').value;
	const dateInput = document.getElementById('countdown_datum').value;

	if (title.trim() === '') {
		callToast('error', LCenterTitle);
		return false;
	}

	if (dateInput.trim() === '') {
		callToast('error', LCenterDate);
		return false;
	}

	const inputDate = new Date(dateInput);
	const formattedDate = inputDate.toISOString().split('T')[0] + ' 00:00:00';


	const formdata = new FormData();
	formdata.append('option', 'countdown');
	formdata.append('value', title);
	formdata.append('specialvalue', formattedDate);

	fetch(API_ENDPOINTS.settings + "/countdown", {
			method: "PUT",
			body: formdata
		})
		.then(response => response.json())
		.then(data => {
			const status = data.status;

			if (status === "success") {

				location.reload();
			}
		})
		.catch(error => {
			const errmessage = error + "! " + LCcheckConsole;
			callToast('error', errmessage);
			console.error(error);
			reject(false);
		});
}

function initUpdateCountdownItemModal() {
	const modalElement = document.querySelector('#updateCountdownItemmodal');
	const modalInstance = M.Modal.init(modalElement);
	const speichernButton = document.querySelector('.modal-footer .countdown_save_button');
	speichernButton.addEventListener('click', updateCountdownItem);

	const inputFieldTitle = document.getElementById('countdown_titel');
	inputFieldTitle.addEventListener('keydown', function(event) {
		if (event.key === 'Enter') {
			updateCountdownItem(event);
		}
	})

	const inputFieldDate = document.getElementById('countdown_datum');
	inputFieldDate.addEventListener('keydown', function(event) {
		if (event.key === 'Enter') {
			updateCountdownItem(event);
		}
	})
}

// Countdown Timer
$(document).ready(function() {
	(function(e) {
		e.fn.countdown = function(t, n) {
			function i() {
				eventDate = Date.parse(r.date) / 1e3;
				currentDate = Math.floor(e.now() / 1e3);

				if (eventDate <= currentDate) {
					return //Stoppt das Script, wenn das heutige Datum größer als das EventDatum ist
				}

				seconds = eventDate - currentDate;
				days = Math.floor(seconds / 86400);
				seconds -= days * 60 * 60 * 24;
				hours = Math.floor(seconds / 3600);
				seconds -= hours * 60 * 60;
				minutes = Math.floor(seconds / 60);
				seconds -= minutes * 60;
				/*
				days == 1 ? thisEl.find(".timeRefDays").text("Tag") : thisEl.find(".timeRefDays").text("Tage");
				hours == 1 ? thisEl.find(".timeRefHours").
				thisEl.find(".timeRefHours").text("Stunde"):
				   minutes == 1 ? thisEl.find(".timeRefMinutes").text("Minute") : thisEl.find(".timeRefMinutes").text("Minuten");
				seconds == 1 ? thisEl.find(".timeRefSeconds").text("Sekunde") : thisEl.find(".timeRefSeconds").text("Sekunden");
				*/

				if (r["format"] == "on") {
					days = String(days).length >= 2 ? days : "0" + days;
					hours = String(hours).length >= 2 ? hours : "0" + hours;
					minutes = String(minutes).length >= 2 ? minutes : "0" + minutes;
					seconds = String(seconds).length >= 2 ? seconds : "0" + seconds
				}
				//
				if (!isNaN(eventDate)) {
					thisEl.find(".days").text(days);
					thisEl.find(".hours").text(hours);
					thisEl.find(".minutes").text(minutes);
					thisEl.find(".seconds").text(seconds)
				} else {
					errorMessage = LCinvalidDate + ". " + LCexample + ": 2023-06-31 00:00:00";
					alert(errorMessage);
					console.log(errorMessage);
					clearInterval(interval)
				}
			}
			//
			var thisEl = e(this);
			var r = {
				date: null,
				format: null
			};
			//
			t && e.extend(r, t);
			i();
			interval = setInterval(i, 1e3)
		}
	})(jQuery);
	//
	$(document).ready(function() {
		function e() {
			var e = new Date;
			e.setDate(e.getDate() + 60);
			dd = e.getDate();
			mm = e.getMonth() + 1;
			y = e.getFullYear();
			futureFormattedDate = mm + "/" + dd + "/" + y;
			return futureFormattedDate
		}

		fetch(API_ENDPOINTS.settings + '/countdown', {
				method: 'GET',

			})
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error(response.status + ": " + LCloadCountdownError + LCcheckConsole);
				}
			})
			.then(data => {
				if (data.status === 'success') {

					const countdownDate = data.data.specialvalue;
					const title = data.data.value;

					// use the countdownDate and title values to initialize the countdown timer and update the title
					if (countdownDate) {
						$("#countdown").countdown({
							date: countdownDate,
							format: "on"
						});
					}
					if (title) {
						$(".countdown-title").text(title);
					}

					/*
                //Zeigt das Countdown Datum auf der Countdown Karte an
            
                if (countdownObj && countdownObj.inhalt) {
                    const date = new Date(countdownObj.inhalt);
                    const day = date.getDate().toString().padStart(2, '0');
                    const month = (date.getMonth() + 1).toString().padStart(2, '0');
                    const year = date.getFullYear().toString();
                    const formattedDate = `${day}.${month}.${year}`;
                    $("#countdown-date").text(formattedDate);
                }
                */


				} else if (data.status === 'error') {

					const errmessage = data.message;
					callToast('error', errmessage);
				}
			})
			.catch(error => {
				var errmessage = LCloadCountdownError + LCcheckConsole;
				callToast('error', errmessage);
				console.error(error);
			});
	})
})