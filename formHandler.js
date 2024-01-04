// formHandler.js
const {
  replyMessage
} = require('./utilHelper');
const {
  readData
} = require('./dbfunction');
const axios = require('axios').default;

const dbName = './db.json';

async function handleFormSubmission(req, res) {
  try {
    // Access form data from the request body
    const name = req.body.name;
    const phone = req.body.phone;
    // Read existing data from the database
    let existingData = readData(dbName);
    // Ensure existingData is an array
    if (!Array.isArray(existingData)) {
      existingData = [];
    }
    let phoneNumberExists = false;
    let lastMessage = null;
    if (existingData) {
      for (let i = existingData.length - 1; i >= 0; i--) {
        const message = existingData[i];
        if (message.from_number === phone || message.to_number === phone) {
          lastMessage = message.message;
          phoneNumberExists = true;
          break; // No need to continue checking if the phone number is found
        }
      }
    }
    // The phone number does not exist, so you can send the reply message
    if (!phoneNumberExists) {
      // Call the function to trigger WhatsApp API with name and phone number
      await replyMessage(phone, 'form submit', res);
    } else {
      // You can use this message in replyMessage or any other way you need
      await replyMessage(phone, lastMessage, res);
    }
    // Send a success response
    if (res && res.headersSent !== true) {
      // Send a success response
      res.status(200).json({
        success: true
      });
    }
  } catch (error) {
    console.error('Error processing form submission:', error.message);
    // Send an error response
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

module.exports = {
  handleFormSubmission
};