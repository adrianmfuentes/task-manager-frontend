// Converts a timestamp to a readable date format: "HH:MM,DD/MM/YYYY"
export let timestampToDate = (timestamp) => {
    const date = new Date(timestamp);

    // Format date as HH:MM,DD/MM/YYYY
    const outputDate = 
        date.getHours() + ":" + 
        date.getMinutes() + "," + 
        date.getDate() + "/" + 
        (date.getMonth() + 1) + "/" + 
        date.getFullYear();
    
    return outputDate;
}

// Converts a timestamp to ISO-like string format: "YYYY-MM-DDTHH:MM:SS.SSS"
// Pads year, month, day, hours, minutes, seconds, and milliseconds to ensure consistency
export let timestampToString = (timestamp) => {
    const date = new Date(timestamp);

    // Add padding to each component to ensure correct format
    const year = date.getFullYear().toString().padStart(4, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const milliseconds = date.getMilliseconds().toString().padStart(3, "0");

    // Combine into the desired format
    const result = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
    
    return result;
}

// Regular expression to validate email addresses
export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Import lodash for utility functions
export const _ = require('lodash');
