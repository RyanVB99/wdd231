document.addEventListener('DOMContentLoaded', function () {
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
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
});
