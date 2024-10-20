document.addEventListener("DOMContentLoaded", () => {
    const errorMessage = document.getElementById('error-message'); // Get the error message element

    function updateGauge(name, type, value) {
        console.log(`Updating gauge - Name: ${name}, Type: ${type}, Value: ${value}`);

        const gaugeValue = document.querySelector(`.gauge-value[data-name="${name}"]`);
        if (gaugeValue) {
            console.log(`Gauge element found for name: ${name}`);
        } else {
            console.error(`Gauge element NOT found for name: ${name}`);
        }

        const gaugeOuter = gaugeValue ? gaugeValue.closest('.gauge').querySelector('.gauge-outer') : null;

        if (gaugeValue && gaugeOuter) {
            let valueSpan = document.createElement('span');
            let unitSpan = document.createElement('span');
            
            valueSpan.textContent = value; // Value part (number)
            
            if (type === 'temp') {
                unitSpan.textContent = '°C'; 
                gaugeOuter.style.setProperty('--value', value / 2);
            } else if (type === 'usage') {
                unitSpan.textContent = '%'; 
                gaugeOuter.style.setProperty('--value', value);
            } else if (type === 'rpm') {
                unitSpan.textContent = 'RPM'; 
                gaugeOuter.style.setProperty('--value', value / 15);
            } else if (type === 'power') {
                unitSpan.textContent = 'W'; 
                gaugeOuter.style.setProperty('--value', value);
            }
            
            // Clear existing content and append new spans
            gaugeValue.innerHTML = ''; // Clear existing content
            gaugeValue.appendChild(valueSpan); // Add value
            gaugeValue.appendChild(unitSpan);  // Add unit
        } else {
            console.error(`Gauge or outer element for ${name} not found`);
        }
    }

    function cleanString(input) {
        return input
            .replace(/°C|W|RPM|MHz|%/g, '') 
            .replace(/\s+/g, ' ')
            .trim();                       
    }

    function determineType(subdevice) {
        if (subdevice.includes('temp') || subdevice.includes('sensor')) {
            return 'temp';  // For temperature-related values
        } else if (subdevice.includes('load') || subdevice.includes('usage')) {
            return 'usage'; // For usage-related values (percentage)
        } else if (subdevice.includes('fan')) {
            return 'rpm';   // For fan speed (RPM)
        } else if (subdevice.includes('power')) {
            return 'power'; // For power values (W)
        } else {
            return 'unknown'; // Default if type isn't recognized
        }
    }

    async function fetchDeviceData() {
        try {
            const response = await fetch('/device-data');
            if (!response.ok) {
                throw new Error(`Failed to fetch device data: ${response.statusText}`);
            }

            const deviceData = await response.json();

            // Hide error message if data fetch is successful
            errorMessage.style.display = 'none';

            for (let device in deviceData) {
                for (let subdevice in deviceData[device]) {
                    const value = deviceData[device][subdevice];
                    if (value !== null) {
                        const cleanedValue = cleanString(value);
                        const type = determineType(subdevice);

                        if (type !== 'unknown') {
                            updateGauge(`${device} ${subdevice}`, type, cleanedValue);
                        } else {
                            console.error(`Unknown type for ${device} ${subdevice}`);
                        }
                    } else {
                        console.error(`No value for ${device} ${subdevice}`);
                    }
                }
            }
        } catch (error) {
            console.error(`Error fetching device data: ${error.message}`);
            // Show error message when fetch fails
            errorMessage.style.display = 'block';
        }
    }

    // Fetch data every 1 second
    fetchDeviceData();  // Initial call
    setInterval(fetchDeviceData, 1000);  // Repeat every 1 second (1000 milliseconds)
});
