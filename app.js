"use strict";

const {
  replyMessage,
  sendFacebookMessage
} = require('./utilHelper'); // Import the sendFacebookMessage function
const token = process.env.WHATSAPP_TOKEN;
const axios = require("axios").default;
const express = require("express");
const body_parser = require("body-parser");
const app = express().use(body_parser.json());
const {
  writeData,
  readData
} = require('./dbfunction');
const dbName = './db.json';
const path = require('path'); 
const { handleFormSubmission } = require('./formHandler');


app.use(body_parser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(body_parser.urlencoded({ extended: true }));

// Add this route to serve the product list page
app.get('/product-list', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'product-list.html'));
});


// Route for handling form submissions
app.post('/submit-form', handleFormSubmission);

app.listen(process.env.PORT || 1337, () => console.log("webhook is listening"));

app.post("/webhook", async (req, res) => {
  try {
    if (req.body.object) {
      if (
        req.body.entry &&
        req.body.entry[0].changes &&
        req.body.entry[0].changes[0] &&
        req.body.entry[0].changes[0].value.messages &&
        req.body.entry[0].changes[0].value.messages[0]
      ) {
        let to = req.body.entry[0].changes[0].value.metadata.display_phone_number;
        let from = req.body.entry[0].changes[0].value.messages[0].from;
        let user = req.body.entry[0].changes[0].value.contacts[0].profile.name;
        let message_id = req.body.entry[0].changes[0].value.messages[0].id;

        let msg_body = '';
        if (req.body.entry[0].changes[0].value.messages[0].text) {
          const textMessage = req.body.entry[0].changes[0].value.messages[0].text.body;
          // Call replyMessage and wait for it to complete
          // Example usage
          const newResponse = {
            to_number: to,
            from_number: from,
            user_name: user,
            message_id: message_id,
            message: textMessage,
            timestamp: new Date().toISOString(),
          };

          // Read existing data from the database
          let existingData = readData(dbName);

          // Ensure existingData is an array
          if (!Array.isArray(existingData)) {
            console.error('Data read from the database is not an array:', existingData);
            // Handle this situation, e.g., set existingData to an empty array
            existingData = [];
          }

          // Add the new response to the data
          existingData.push(newResponse);

          // Write the updated data back to the database
          writeData(existingData, dbName);


          await replyMessage(from, textMessage, res);

          // No need to call res.sendStatus(200) here since it's already being done outside the if block
        } else {
          msg_body = req.body.entry[0].changes[0].value.messages[0].button.payload;
          if (req.body.entry[0].changes[0].value.messages[0].button.text == 'No') {
            await replyMessage(from, 'Thank you for your response', res);
          } else if (req.body.entry[0].changes[0].value.messages[0].button.text == 'Yes') {
            await replyMessage(from, 'food order', res);
          } else if (req.body.entry[0].changes[0].value.messages[0].button.text == 'Not interested') {
            await replyMessage(from, 'Not interested', res);
          } else if (req.body.entry[0].changes[0].value.messages[0].button.text == 'Order') {
            await replyMessage(from, 'Order', res);
          } else if (req.body.entry[0].changes[0].value.messages[0].button.text == 'interested') {
            await replyMessage(from, 'interested', res);
          } else if (req.body.entry[0].changes[0].value.messages[0].button.text == 'not interested') {
            await replyMessage(from, 'not interested', res);
          }
          const newResponse = {
            to_number: from,
            from_number: to,
            user_name: user,
            message_id: message_id,
            message: msg_body,
            timestamp: new Date().toISOString(),
          };
          // Read existing data from the database
          let existingData = readData(dbName);
          // Ensure existingData is an array
          if (!Array.isArray(existingData)) {
            console.error('Data read from the database is not an array:', existingData);
            // Handle this situation, e.g., set existingData to an empty array
            existingData = [];
          }
          // Add the new response to the data
          existingData.push(newResponse);
          // Write the updated data back to the database
          writeData(existingData, dbName);
          await sendFacebookMessage({
            messaging_product: "whatsapp",
            to: from,
            text: {
              body: msg_body
            },
          });

        }
      }
      // Send a success response only if it hasn't been sent already
      if (!res.headersSent) {
        res.sendStatus(200);
      }
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error processing webhook request:', error.message);

    // Send an error response only if it hasn't been sent already
    if (!res.headersSent) {
      res.sendStatus(500);
    }
  }
});

app.get("/webhook", (req, res) => {
  const verify_token = process.env.VERIFY_TOKEN;
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === verify_token) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});