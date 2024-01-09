const axios = require('axios');
const {
  getTextMessageInput,
  getTemplatedFoodOrder,
  welcomeMessageTemplate,
  visitWebsite,
  simpleReturn,
  orderConfirm,
  startTemplate,
  productCatalougeTemplate,
  list_product_item,
  consumer_product,
  item_pepsico,
  orderPdfInvoice
} = require('./messageTemplateHelper');
const {
  getProductDetails,
  formatProductMessage,
  getAllProducts
} = require('./productHelper');

const openaiApiKey = process.env.OPENAI_API_KEY || "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";
const openaiEndpoint = process.env.OPENAI_ENDPOINT || 'https://api.openai.com/v1/chat/completions';
const version = process.env.VERSION || 'v17.0';
const phoneNumberId = process.env.PHONE_NUMBER_ID || 194561167073611;
const whatsappToken = process.env.WHATSAPP_TOKEN || 'EAAKIFZCG0RDwBOZBV4H7DASfoNhjEGf5WHuOSOjvduchW5ljvp69QvaGqCUZAb49EBTzuGa0JcJkECA58BXFynYMMKZCGYZCKs9fZCpBRZAvOGmZAnxCBLy6TOc6NaX0LN8aZAFFCNfhQlJoglXzbWJBWPjHWjR6XgeOCKT1kUU1UKS9ErXQwKZBsoyleDnztNeoT0MOErgKW6PrDPysjj1TDs1LmxZCHnwRpTg2ZBBKp7ZAu2KQZD';
const whatsappBusinessAccountId = process.env.WhatsApp_Business_Account_ID || 192701530594620;


const replyMessage = async (senderFromId, reqMessage, res) => {
  try {
    const userQuery = reqMessage;
    // console.log(reqMessage); return false;
    // const openaiResponse = await sendMessageToOpenAI([{
    //   role: 'user',
    //   content: userQuery
    // }]);
    // const fetWABAS = await getFacebookAnalytics();
    // console.log(fetWABAS);
    // return false;
    const productDetails = await getProductDetails("1");
    // console.log(productDetails);

    // const product = await formatProductMessage(productDetails);
    // const getAllProductList = await getAllProducts();
    // const getAllProductList = await getAllProducts();
    // console.log(getAllProductList); return false;

    // const products = [productDetails];

    // Fetch product details and accumulate them into the 'products' array
    // for (const eachProduct of getAllProductList) {
    //   const product = await formatProductMessage(eachProduct);
    //   products.push(product);
    // }
    // console.log(`${products}`); return false;

    // Assuming you have a function to format product details for WhatsApp
    // const formattedMessage = formatProductMessage(getAllProductList);
    // Call replyMessage and wait for it to complete
    let dataReceived = {};
    dataReceived = await item_pepsico(senderFromId, productDetails);
    // console.log(dataReceived.template.components[2]); return false;

    // if (userQuery == 'Hi' || userQuery == 'Hello') {
    //   dataReceived = await welcomeMessageTemplate(senderFromId);
    // } else if (userQuery == 'food order') {
    //   dataReceived = await getTemplatedFoodOrder(senderFromId, '5864');
    // } else if (userQuery == 'Pepsico') {
    //   dataReceived = await item_pepsico(senderFromId, '0025');
    // } else if (userQuery == 'interested') {
    //   dataReceived = await list_product_item(senderFromId);
    // } else if (userQuery == 'consumer' || userQuery == 1) {
    //   dataReceived = await consumer_product(senderFromId);
    // } else if (userQuery == 'Order') {
    //   dataReceived = await orderConfirm(senderFromId);
    // } else if (userQuery == 'Not interested' || userQuery == 'not interested') {
    //   dataReceived = await visitWebsite(senderFromId);
    // } else if (userQuery == 'form submit') {
    //   const dataReceived1 = await startTemplate(senderFromId);
    //   await sendFacebookMessage(dataReceived1);
    // } else {
    //   dataReceived = await item_pepsico(senderFromId,productDetails);
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
const getFacebookAnalytics = async () => {
  // Calculate start date 4 days ago
  const currentDate = new Date();

  // Create a new Date object for startTimestamp calculation
  const startTimestampDate = new Date(currentDate);
  startTimestampDate.setDate(currentDate.getDate() - 30);
  const startTimestamp = Math.floor(startTimestampDate.getTime() / 1000);
  // console.log(startTimestamp);

  const endDate = Math.floor(currentDate.getTime() / 1000);
  // console.log(endDate);
  const config = {
    method: 'get',
    url: `https://graph.facebook.com/v18.0/${whatsappBusinessAccountId}/template_analytics`,
    headers: {
      'Authorization': `Bearer ${whatsappToken}`,
      'Content-Type': 'application/json',
    },
    params: {
      start: 1702039240,
      end: 1704717672,
      granularity: 'DAILY',
      metric_types: ['SENT', 'DELIVERED', 'READ', 'CLICKED'],
      template_ids: [
        '343569498623061',
        '1732696957228900',
        '2588750271303384',
        '1362269831840407',
        '1219366775686337',
        '347280898038326',
        '1039508017307101',
        '',
      ],
    },
  };
  try {
    const response = await axios(config);

    const result = generateTemplateData(config);
    // console.log(result);
    // let dataArray = response.data.data;
    // let allValues = dataArray[0].data_points.flat();
    console.log('Facebook API Response:', result);
    return response;
  } catch (error) {
    console.error('Error sending message via Facebook API:', error.message);
    console.error('Facebook API Response:', error.response ? error.response.data : 'No response data');
    throw error; // Rethrow the error to propagate it to the calling function
  }
  // return axios(config);
};
function generateTemplateData(config) {
  const {
    start,
    end,
    granularity,
    metric_types,
    template_ids,
  } = config.params;

  const templateData = [];

  for (const template_id of template_ids) {
    let currentTime = start;
    
    while (currentTime < end) {
      const templateObject = {
        template_id,
        start: currentTime,
        end: currentTime + granularityToSeconds(granularity),
      };

      for (const metric of metric_types) {
        templateObject[metric.toLowerCase()] = 0;
      }

      templateData.push(templateObject);

      currentTime += granularityToSeconds(granularity);
    }
  }

  return templateData;
};
function granularityToSeconds(granularity) {
  // You may need to adjust this based on your specific requirements
  switch (granularity) {
    case 'DAILY':
      return 24 * 60 * 60; // 1 day in seconds
    default:
      return 24 * 60 * 60; // Default to daily
  }
}
module.exports = {
  replyMessage,
  sendMessageToOpenAI,
  sendFacebookMessage,
  getFacebookAnalytics,
  generateTemplateData,
  granularityToSeconds
};