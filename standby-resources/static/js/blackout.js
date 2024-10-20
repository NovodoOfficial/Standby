// Get references to the clock and blackout elements
const clockElement = document.querySelector('.clock');
const blackoutElement = document.getElementById('blackoutElement');

// Event listener for the .clock element click to show the blackout element
clockElement.addEventListener('click', function(event) {
  blackoutElement.style.opacity = 1;
  blackoutElement.style.pointerEvents = "all";
  event.stopPropagation(); // Prevent body click events
});

// Event listener for the blackout element click to hide itself
blackoutElement.addEventListener('click', function(event) {
  event.stopPropagation(); // Prevent body click event from triggering
  blackoutElement.style.opacity = 0;
  blackoutElement.style.pointerEvents = "none";
});