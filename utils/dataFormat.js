module.exports = {
  
  format_time: (date) => {
    
    return date.toLocaleTimeString();
  },
};

// We use the 'toLocaleTimeString()' method to format the time as H:MM:SS AM/PM

// the helper method 'format_time' will take in a timestamp and return a string with only the time
