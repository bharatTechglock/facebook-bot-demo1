const axios = require('axios');
const {
  getTextMessageInput,
  getTemplatedFoodOrder,
  welcomeMessageTemplate,
  visitWebsite,
  simpleReturn,
  orderConfirm,
  startTemplate,
  productCatalougeTemplate
} = require('./messageTemplateHelper');

const openaiApiKey = process.env.OPENAI_API_KEY || "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";
const openaiEndpoint = process.env.OPENAI_ENDPOINT || 'https://api.openai.com/v1/chat/completions';
const version = process.env.VERSION || 'v17.0';
const phoneNumberId = process.env.PHONE_NUMBER_ID || 194561167073611;
const whatsappToken = process.env.WHATSAPP_TOKEN || 'EAAKIFZCG0RDwBO2Jf57WRc1p388r67x8BfIJkoQCo52LxpwKtIFzMYeQDIv7SL19v65SyoU25Yz1y1BL6XqCIAThwhFFTvu3ehXiGbhvNyIjnMU0C9HV13fwfnj8ZCCvUTj7AZAMgCB8fsMs5xPqE56GZAWGtZBsVZB65xjxZCfWLbhdNMc0ey6cZBJeMPDOMdnghKtZCMa4e9zQOeuZCg8GKrFwla2hqgMEgRd3xi8FCYIGAZD';

const replyMessage = async (senderFromId, reqMessage, res) => {
  try {
    const userQuery = reqMessage;
    const openaiResponse = await sendMessageToOpenAI([{
      role: 'user',
      content: userQuery
    }]);

    // Call replyMessage and wait for it to complete
    let dataReceived = {};
    // if (userQuery == 'Hi' || userQuery == 'Hello') {
    //   dataReceived = await welcomeMessageTemplate(senderFromId);
    // } else if (userQuery == 'food order' || userQuery == 'interested') {
    //   dataReceived = await getTemplatedFoodOrder(senderFromId, '5864');
    // } else if (userQuery == 'Order') {
    //   dataReceived = await orderConfirm(senderFromId);
    // } else if (userQuery == 'Not interested' || userQuery == 'not interested') {
    //   dataReceived = await visitWebsite(senderFromId);
    // } else if (userQuery == 'form submit') {
    //   const dataReceived1 = await startTemplate(senderFromId);
    //   await sendFacebookMessage(dataReceived1);
    // } else {
      dataReceived = await productCatalougeTemplate(senderFromId);
    // }
    // const senderId = senderFromId;
    // const dataReceived = await getTextMessageInput(senderFromId, openaiResponse);

    await sendFacebookMessage(dataReceived);

    if (!res.headersSent) {
      res.sendStatus(200);
    }
  } catch (error) {
    if (!res.headersSent) {
      console.error('Error processing webhook request:', error.message);
      res.sendStatus(500);
    }
  }
};

const sendMessageToOpenAI = async (messages) => {
  try {
    const response = await axios.post(
      openaiEndpoint, {
        messages: messages,
        max_tokens: 100,
        model: 'gpt-3.5-turbo'
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiApiKey}`,
        },
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error communicating with OpenAI:', error.message);
    console.error('OpenAI Response:', error.response ? error.response.data : 'No response data');
    return 'Sorry, I couldn\'t process your request at the moment.';
  }
};

const sendFacebookMessage = async (data) => {
  const config = {
    method: 'post',
    url: `https://graph.facebook.com/${version}/${phoneNumberId}/messages`,
    headers: {
      'Authorization': `Bearer ${whatsappToken}`,
      'Content-Type': 'application/json'
    },
    data: data
  };
  try {
    const response = await axios(config);
    // console.log('Facebook API Response:', response.data);
    return response;
  } catch (error) {
    console.error('Error sending message via Facebook API:', error.message);
    console.error('Facebook API Response:', error.response ? error.response.data : 'No response data');
    throw error; // Rethrow the error to propagate it to the calling function
  }
  // return axios(config);
};

module.exports = {
  replyMessage,
  sendMessageToOpenAI,
  sendFacebookMessage
};