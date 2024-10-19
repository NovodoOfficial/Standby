// script.js
function updateClock() {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    // Calculate the rotation of each hand
    const secondDeg = ((seconds / 60) * 360) + 90; // Adding 90 to offset for CSS transform
    const minuteDeg = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90; // 6 degrees per minute + seconds adjustment
    const hourDeg = ((hours % 12) / 12) * 360 + ((minutes / 60) * 30) + 90; // 30 degrees per hour + minutes adjustment

    // Set the rotation of each hand
    document.getElementById('second').style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
    document.getElementById('minute').style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
    document.getElementById('hour').style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initialize the clock immediately
updateClock();
