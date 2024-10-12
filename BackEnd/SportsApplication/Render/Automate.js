const logger = require("../log");
const render = require('../Render/sample');
const express = require('express');

const apiUrl = 'https://sportsapplication95763.onrender.com/App/sample'; // You can keep this for reference or logs

function isDisabledHours() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    // Check if the current time is between 2:30 AM and 6:00 AM
    return (hours === 2 && minutes >= 30) || (hours < 5);
}

const triggerApi = async () => {
    if (isDisabledHours()) {
        console.log('API triggering is disabled during this time.');
        return; // Skip the API call if it's within disabled hours
    }

    console.log('Triggering API...');

    // Create mock request and response objects
    const req = { /* Mock request object if needed */ };
    const res = {
        status: (statusCode) => {
            return {
                json: (data) => console.log(`Response status: ${statusCode}, data:`, data),
            };
        },
    };

    try {
        await render(req, res); // Call the route handler directly
        console.log('API triggered successfully.');
    } catch (error) {
        console.error('Error triggering API:', error.message);
    }
};

// Set interval to trigger the API every 5 seconds
setInterval(triggerApi, 600000);

module.exports = triggerApi; 
