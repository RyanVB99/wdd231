document.addEventListener('DOMContentLoaded', function () {
    const lastVisit = localStorage.getItem('lastVisit');
    const firstVisit = localStorage.getItem('firstVisit');
    const now = new Date();
    let message = '';

    if (!firstVisit) {
        localStorage.setItem('firstVisit', now.toISOString());
    }

    if (!lastVisit) {
        message = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = new Date(lastVisit);
        const timeDifference = now - lastVisitDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (daysDifference < 1) {
            message = "Back so soon! Awesome!";
        } else if (daysDifference === 1) {
            message = "You last visited 1 day ago.";
        } else {
            message = `You last visited ${daysDifference} days ago.`;
        }
    }

    // Display first visit and most recent visit times
    const firstVisitDate = new Date(firstVisit);
    message += `\nFirst visit: ${firstVisitDate.toLocaleString()}`;
    message += `\nMost recent visit: ${now.toLocaleString()}`;

    alert(message);
    localStorage.setItem('lastVisit', now.toISOString());
});
