// productHelper.js
const fs = require('fs/promises');
const path = require('path');
// Assume you have a function to get product details from a database
const getAllProducts = async (productId) => {
    try {
        const fetchProducts = await fetch(`https://fakestoreapi.com/products`).then(res=>res.json())
        const limitedProducts = fetchProducts.slice(0, 4);
        // const products = JSON.parse(fetchProducts);

        if (limitedProducts) {
            return limitedProducts;
        } else {
            throw new Error('Products not found');
        }
    } catch (error) {
        console.error('Error getting product details:', error.message);
        throw error;
    }
};

const getProductDetails = async (productId) => {
    try {
        // Read products from the JSON file
        // const productsPath = path.join(__dirname, 'products.json');
        // console.log(productsPath);
        const productsData = await fetch(`https://fakestoreapi.com/products/${productId}`).then(res=>res.json())
        // console.log(productsData); return false;

        // const products = JSON.parse(productsData);
        // console.log(productsData); return false;

        // Find the product with the specified ID
        // const product = products.find(p => p.id === productId);
        // console.log(product);
        if (productsData) {
            return productsData;
        } else {
            throw new Error('Product not found');
        }
    } catch (error) {
        console.error('Error getting product details:', error.message);
        throw error;
    }
};

// Assuming you have a function to format product details for WhatsApp
const formatProductMessage = async(product) => {
    const productLink = `https://fakestoreapi.com/products/${product.id}`;
    const message = `
      *${product.title}*
      Price: $${product.price}
      Description: ${product.description}
      [Buy Now](${productLink})
    `;
    return message;
};

module.exports = {
    getProductDetails,
    getAllProducts,
    formatProductMessage
};