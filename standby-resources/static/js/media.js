document.getElementById('playPauseBtn').addEventListener('click', () => {
    fetch('/playpause');
});

document.getElementById('previousBtn').addEventListener('click', () => {
    fetch('/previous');
});

document.getElementById('nextBtn').addEventListener('click', () => {
    fetch('/next');
});

document.getElementById('volumeUpBtn').addEventListener('click', () => {
    fetch('/volumeup');
});

document.getElementById('volumeDownBtn').addEventListener('click', () => {
    fetch('/volumedown');
});