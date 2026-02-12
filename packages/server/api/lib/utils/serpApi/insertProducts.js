/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const fetchSerpApiAmazon = require('../serpApiAmazon');

// Credentials (from .env)
const USER_UID = process.env.USER_UID_AMAZON_LOCAL;
const API_PATH = process.env.API_PATH_AMAZON_LOCAL;

// const today = new Date();
// const isSunday = today.getDay() === 0; // 0 = Sunday

// if (!isSunday) {
//   console.log('Not Sunday, skipping weekly job.');
//   process.exit(0);
// }

// fetch helpers

const today = new Date();
const todayDay = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

const allowedDays = [0, 3, 5];

if (!allowedDays.includes(todayDay)) {
  console.log('Not an allowed day, skipping job.');
  process.exit(0);
}

async function insertCategory(title, categoryNodeId) {
  const res = await fetch(`${API_PATH}/categories`, {
    method: 'POST',
    headers: {
      token: `token ${USER_UID}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, nodeId: categoryNodeId }),
  });
  const data = await res.json();
  return data; // assume it returns { id, full_name }
}

async function insertProduct({ appTitle, appleId, appUrl, categoryId }) {
  const body = {
    title: appTitle,
    category_id: categoryId,
  };

  if (appleId) {
    body.apple_id = appleId;
  }

  if (appUrl) {
    body.url = appUrl;
  }
  const res = await fetch(`${API_PATH}/products/node`, {
    method: 'POST',
    headers: {
      token: `token ${USER_UID}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data; // assume it returns { id, full_name }
}

const insertProducts = async () => {
  // console.log(appsParam);

  let products;
  if (allowedDays.includes(todayDay)) {
    products = await fetchSerpApiAmazon();
  }

  for (const product of products) {
    try {
      const category = product.categoryTitle;
      const { categoryNodeId } = product;

      const newCategory = await insertCategory(category, categoryNodeId);
      const { categoryId } = newCategory;
      console.log('Inserted category:', newCategory);

      const newProduct = await insertProduct({
        productTitle,
        appleId,
        appUrl,
        categoryId,
      });
      const { productId } = newProduct;
      const newProductTitle = newProduct.productTitle;
      console.log('Inserted product:', newProduct);
    } catch (err) {
      console.error(
        `❌ Failed to insert product ${productItem.id}:`,
        err.message,
      );
      // continue with next app
    }
  }
};

module.exports = insertApps;
