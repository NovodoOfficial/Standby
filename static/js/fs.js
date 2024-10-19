function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

function updateFullscreenButton() {
    const btn = document.getElementById('fullscreen-btn');
    if (document.fullscreenElement) {
        btn.style.display = 'none'; // Hide the button in fullscreen
    } else {
        btn.style.display = 'block'; // Show the button when not in fullscreen
    }
}

// Add event listeners for fullscreen changes
document.addEventListener('fullscreenchange', updateFullscreenButton);
document.addEventListener('webkitfullscreenchange', updateFullscreenButton); // For Safari
document.addEventListener('mozfullscreenchange', updateFullscreenButton); // For Firefox
document.addEventListener('MSFullscreenChange', updateFullscreenButton); // For IE/Edge

document.getElementById('fullscreen-btn').addEventListener('click', toggleFullscreen);