async function getTextMessageInput(recipient, text) {
    return {
        messaging_product: "whatsapp",
        preview_url: false,
        recipient_type: "individual",
        to: recipient,
        type: "text",
        text: {
            body: text
        }
    };
}

function getTemplatedFoodOrder(recipient, orderId) {
    return {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": recipient,
        "type": "template",
        "template": {
            "name": "food_order_template",
            "language": {
                "code": "en_US"
            },
            "components": [{
                    "type": "header",
                    "parameters": [{
                        "type": "image",
                        "image": {
                            "link": "https://media.istockphoto.com/id/1158623408/photo/indian-hindu-veg-thali-food-platter-selective-focus.jpg?s=1024x1024&w=is&k=20&c=X8Fq8SVoZRTEs-Rwt5iAaX3dbZehWmFssd857ez66D8="
                        }
                    }]
                },
                {
                    "type": "body",
                    "parameters": [{
                            "type": "text",
                            "text": "Hello discount is goin on our Family Food branch resturante."
                        },
                        {
                            "type": "currency",
                            "currency": {
                                "fallback_value": "VALUE",
                                "code": "USD",
                                "amount_1000": 50
                            }
                        },
                        {
                            "type": "date_time",
                            "date_time": {
                                "fallback_value": "Dec 31, 2023"
                            }
                        }
                    ]
                },
                {
                    "type": "button",
                    "sub_type": "quick_reply",
                    "index": "0",
                    "parameters": [{
                        "type": "payload",
                        "payload": "Thank you for your response. Have a good day!"
                    }]
                },
                {
                    "type": "button",
                    "sub_type": "quick_reply",
                    "index": "1",
                    "parameters": [{
                        "type": "payload",
                        "payload": "Thank you for creating order your order is confirmed!,Order id : " + orderId
                    }]
                }
            ]
        }
    };

}

function welcomeMessageTemplate(recipient, text) {
    return {
        messaging_product: "whatsapp",
        to: recipient,
        type: "template",
        template: {
            name: "interested_template",
            language: {
                "code": "en"
            }
        }
    }
}

function visitWebsite(recipient, text) {
    return {
        messaging_product: "whatsapp",
        to: recipient,
        type: "template",
        template: {
            name: "bot_testing",
            language: {
                "code": "en_US"
            }
        }
    }
}

function simpleReturn(recipient, text) {
    return {
        messaging_product: "whatsapp",
        to: recipient,
        type: "template",
        template: {
            name: "hello_world",
            language: {
                "code": "en"
            },
            "components": [{
                "type": "body",
                "parameters": [{
                    "type": "text",
                    "text": "Hello User *Welcome to our website Congratulations.!!* We help small to medium scale businesses go digital your Branding, Design, Website, Mobile."
                }]
            }]
        }
    }
}

function getTemplateCustomeSupport(recipient) {
    return {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": recipient,
        "type": "template",
        "template": {
            "name": "test_template",
            "language": {
                "code": "en_US"
            },
            "components": [{
                    "type": "header",
                    "parameters": [{
                        "type": "image",
                        "image": {
                            "link": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.fbk.eu%2Fen%2Fevent%2Faaai-2022-fbk%2Fhuman-like-robot-and-artificial-intelligence-2022-01-06-00-25-53-utc_l9wqczc_scalato-2%2F&psig=AOvVaw3pio9ReT-CW8uEtbHk4_YA&ust=1704261503487000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCPDMxv-CvoMDFQAAAAAdAAAAABAR"
                        }
                    }]
                },
                {
                    "type": "body",
                    "parameters": [{
                        "type": "text",
                        "text": "A bot is an automated software application that performs repetitive tasks over a network. It follows specific instructions to imitate human behavior but is faster and more accurate."
                    }]
                },
                {
                    "type": "button",
                    "sub_type": "quick_reply",
                    "index": "0",
                    "parameters": [{
                        "type": "payload",
                        "payload": "9186280 99764"
                    }]
                },
                {
                    "type": "button",
                    "sub_type": "copy_code",
                    "index": 0,
                    "parameters": [{
                        "type": "coupon_code",
                        "coupon_code": "DISCOUNT20"
                    }]
                }
            ]
        }
    };

}

function orderConfirm(recipient, text) {
    return {
        messaging_product: "whatsapp",
        to: recipient,
        type: "template",
        template: {
            name: "sample_shipping_confirmation1",
            language: {
                "code": "en_US"
            },
            components: [{
                "type": "body",
                "parameters": [{
                    "type": "text",
                    "text": " 5 "
                }]
            }]
        }
    }
}

function startTemplate(recipient, text) {
    return {
        messaging_product: "whatsapp",
        to: recipient,
        type: "template",
        template: {
            name: "start_template",
            language: {
                "code": "en"
            }
        }
    }
}

function productCatalougeTemplate(recipient, text) {
    return {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: recipient,
        type: "interactive",
        interactive: {
            "type": "catalog_message",
            "body": {
                "text": "Hello! Thanks for your interest. Ordering is easy. Just visit our catalog and add items to purchase."
            },
            "action": {
                "name": "catalog_message",
            }
        }

    }
}

module.exports = {
    getTextMessageInput,
    getTemplatedFoodOrder,
    welcomeMessageTemplate,
    getTemplateCustomeSupport,
    visitWebsite,
    simpleReturn,
    orderConfirm,
    startTemplate,
    productCatalougeTemplate
};