// Function to format a timestamp into a readable date
export const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return isNaN(date) ? "Invalid date" : date.toLocaleDateString(); 
};

// Regular expression to validate email addresses
export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Import lodash for utility functions
export const _ = require('lodash');
