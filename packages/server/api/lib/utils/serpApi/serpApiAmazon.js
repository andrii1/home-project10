/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
require('dotenv').config();

const {
  // SERP_API_KEY,
  // SERP_API_KEY2,
  // SERP_API_KEY3,
  // SERP_API_KEY4,
  SERP_API_KEY5,
  SERP_API_KEY6,
} = process.env;

const apiKeys = [
  // SERP_API_KEY,
  // SERP_API_KEY2,
  // SERP_API_KEY3,
  // SERP_API_KEY4,
  SERP_API_KEY5,
  SERP_API_KEY6,
];

let currentKeyIndex = 0;

const excludeList = [
  'insurance',
  'cars',
  'mortgage',
  'loan',
  'renters',
  'vehicle',
  'mutual',
  'cheap',
  'auto',
  'state',
];

const amazonCategories = [
  { id: 2625373011, name: 'Electronics' },
  // { id: 16225007011, name: 'Computers & Accessories' },
  // { id: 2335752011, name: 'Books' },
  // { id: 11055981, name: 'Home & Kitchen' },
  // { id: 3760911, name: 'Toys & Games' },
  // { id: 1055398, name: 'Clothing, Shoes & Jewelry' },
  // { id: 7141123011, name: 'Beauty & Personal Care' },
];

async function fetchSerpApiAmazon(categoryId, domain = 'amazon.com') {
  const apiKey = apiKeys[currentKeyIndex];
  currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;

  const params = new URLSearchParams({
    engine: 'amazon',
    amazon_domain: domain,
    type: 'best_sellers',
    node: categoryId,
    api_key: apiKey,
  });

  try {
    const response = await fetch(`https://serpapi.com/search.json?${params}`);
    const data = await response.json();
    console.log('data', data);

    const products = (data.best_sellers || []).map((item) => ({
      title: item.title,
      price: item.price ? item.price.raw || item.price : null,
      rating: item.rating,
      reviews: item.reviews,
      link: item.link,
      image: item.thumbnail,
      source: `Amazon, ${
        amazonCategories.find((c) => c.id === categoryId)?.name || categoryId
      }`,
    }));

    console.log(products);
    return products;
  } catch (error) {
    console.error('Error fetching Amazon best sellers:', error);
    return [];
  }
}

const useAmazon = async (categories) => {
  const allProducts = [];

  for (const category of categories) {
    const products = await fetchSerpApiAmazon(category.id);
    allProducts.push(...products);
  }
  console.log('allProducts', allProducts);

  return allProducts;
};

useAmazon(amazonCategories).catch(console.error);
module.exports = useAmazon;
