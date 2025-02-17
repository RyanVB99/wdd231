// Get DOM Elements
const reservationInput = document.getElementById("reservationTime");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");
const errorMessage = document.getElementById("errorMessage");

// Disable invalid dates/times
function configureDatePicker() {
    const now = new Date();
    const today = now.toISOString().split("T")[0]; // Get YYYY-MM-DD
    reservationInput.setAttribute("min", today); // Block past dates

    reservationInput.addEventListener("input", validateInput);
}

// Validate on input
function validateInput() {
    const selectedTime = new Date(reservationInput.value);

    if (isNaN(selectedTime)) return;

    const day = selectedTime.getDay(); // 0 = Sunday
    const hours = selectedTime.getHours();

    if (day === 0 || hours < 16 || hours >= 23) {
        errorMessage.classList.remove("hidden");
        submitBtn.disabled = true;
        submitBtn.classList.add("opacity-50", "cursor-not-allowed");
    } else {
        errorMessage.classList.add("hidden");
        submitBtn.disabled = false;
        submitBtn.classList.remove("opacity-50", "cursor-not-allowed");
    }
}

// Submit reservation
function validateReservation() {
    const selectedTime = new Date(reservationInput.value);

    if (isNaN(selectedTime)) {
        message.textContent = "Please select a valid date and time.";
        return;
    }

    message.textContent = "Reservation confirmed!";
    message.classList.add("text-green-500");
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function () {
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
    const submitBtn = document.getElementById('submitBtn');
    const errorMessage = document.getElementById('errorMessage');
    const message = document.getElementById('message');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    dateInput.addEventListener('input', function () {
        const date = new Date(dateInput.value);
        const day = date.getUTCDay();
        if (day === 0) {
            dateInput.setCustomValidity('Reservations are not available on Sundays.');
            dateInput.reportValidity();
            dateInput.value = '';
        } else {
            dateInput.setCustomValidity('');
        }
    });

    timeInput.addEventListener('focus', function () {
        timeInput.setAttribute('min', '16:00');
        timeInput.setAttribute('max', '23:00');
    });

    timeInput.addEventListener('input', function () {
        const time = timeInput.value;
        const [hours, minutes] = time.split(':').map(Number);
        if (hours < 16 || hours > 23) {
            timeInput.setCustomValidity('Reservations are available only between 4 PM and 11 PM.');
            timeInput.reportValidity();
            timeInput.value = '';
        } else {
            timeInput.setCustomValidity('');
        }
    });

    submitBtn.addEventListener('click', function (event) {
        event.preventDefault();
        const selectedTime = new Date(`${dateInput.value}T${timeInput.value}`);
        if (isNaN(selectedTime)) {
            message.textContent = "Please select a valid date and time.";
            message.classList.remove("text-green-500");
            message.classList.add("text-red-500");
        } else {
            message.textContent = "Reservation confirmed!";
            message.classList.remove("text-red-500");
            message.classList.add("text-green-500");
        }
    });
});
