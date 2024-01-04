const fs = require('fs');

// Function to read data from the database file
function readData(dbName) {
    try {
        let data = fs.readFileSync(dbName, 'utf8');
        // If the file is empty, return an empty array
        if (!data.trim()) {
            return [];
        }
        return JSON.parse(data);
    } catch (error) {
        // Handle the error (e.g., if the file contains invalid JSON)
        console.error('Error reading data from the database file:', error.message);
        return [];
    }
}

// Function to write data to the database file
function writeData(obj, dbName) {
    if (!obj) return console.log('Please provide data to save');
    try {
        fs.writeFileSync(dbName, JSON.stringify(obj));
        fs.chmodSync(dbName, '777');
        console.log('Data written successfully.');
    } catch (error) {
        console.error('Error writing data to the database file:', error.message);
        // Handle the error, e.g., log it or throw it if needed
    }
}

module.exports = { readData, writeData };
