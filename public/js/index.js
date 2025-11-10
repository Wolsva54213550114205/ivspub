document.addEventListener('DOMContentLoaded', () => {
const header = document.querySelector('.header');
const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => {
    header.classList.toggle('expanded');
});
});
window.addEventListener('load', () => {
    const popup = document.getElementById('discordPopup');
    const closeBtn = document.getElementById('closePopup');
    popup.classList.add('active');

    closeBtn.addEventListener('click', () => {
        popup.classList.remove('active');
    });

    popup.addEventListener('click', (e) => {
        if(e.target === popup) {
            popup.classList.remove('active');
        }
    });
});