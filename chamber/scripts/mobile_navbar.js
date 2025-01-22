document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuButton = document.getElementById('mobile-menu');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function () {
            document.getElementById('mobile-menu-content').classList.toggle('active');
            console.log('clicked');
        });
    }
});
