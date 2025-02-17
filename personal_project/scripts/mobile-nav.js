document.addEventListener('DOMContentLoaded', function () {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mobileNav = document.querySelector('.mobile-nav');

    hamburgerBtn.addEventListener('click', function () {
        mobileNav.style.display = mobileNav.style.display === 'flex' ? 'none' : 'flex';
    });
});
