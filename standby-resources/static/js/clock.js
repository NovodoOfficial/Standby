function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // Convert to 12-hour format
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12; // Convert to 12-hour format
    hours = hours ? String(hours).padStart(2, '0') : '12'; // Adjust for 0 hour

    updateDigit('hours', hours);
    updateDigit('minutes', minutes);
    updateDigit('seconds', seconds);
    updateAMPM(ampm);
}

function updateDigit(id, newValue) {
    const digitElement = document.getElementById(id);
    const span = digitElement.querySelector('span');
    const currentValue = span.innerText;

    if (currentValue !== newValue) {
        // Step 1: Move down by 100% with ease-in
        span.style.transform = 'translateY(100%)';

        // Wait for the first animation to finish
        setTimeout(() => {
            // Step 2: Instantly update the digit and move up by 200%
            span.innerText = newValue; // Update the digit
            span.style.transition = 'none'; // Disable transition for instant movement
            span.style.transform = 'translateY(-200%)';

            // Wait for a moment before moving down
            setTimeout(() => {
                // Step 3: Move down by 100% with ease-out
                span.style.transition = 'transform 0.15s ease-out'; // Re-enable transition
                span.style.transform = 'translateY(0)'; // Move down to original position
            }, 50); // Small delay to see the move up
        }, 150); // Time for the first downward move (now 0.15s)
    }
}

function updateAMPM(newValue) {
    const ampmElement = document.getElementById('ampm');
    const currentValue = ampmElement.innerText;

    // Rotate the AM/PM element by 90 degrees
    ampmElement.style.transition = 'transform 0.15s ease-in'; // Add initial transition
    ampmElement.style.transform = 'rotate(90deg)';

    if (currentValue !== newValue) {
        // Step 1: Move down by 100% with ease-in while keeping the 90-degree rotation
        ampmElement.style.transition = 'transform 0.15s ease-in'; // Add initial transition
        ampmElement.style.transform = 'translateX(-100%) rotate(90deg)';

        // Wait for the first animation to finish
        setTimeout(() => {
            // Step 2: Instantly update the AM/PM and move up by 200%
            ampmElement.innerText = newValue; // Update the AM/PM
            ampmElement.style.transition = 'none'; // Disable transition for instant movement
            ampmElement.style.transform = 'translateX(200%) rotate(90deg)'; // Keep the 90-degree rotation

            // Wait for a moment before moving down
            setTimeout(() => {
                // Step 3: Move down by 100% with ease-out while keeping the rotation
                ampmElement.style.transition = 'transform 0.15s ease-out'; // Re-enable transition
                ampmElement.style.transform = 'translateX(0) rotate(90deg)'; // Move down to original position with rotation
            }, 50); // Small delay to see the move up
        }, 150); // Time for the first downward move (now 0.15s)
    }
}

setInterval(updateClock, 1000);
updateClock(); // Initial call to set the time immediately
