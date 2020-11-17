const axios = require('axios');

const args = process.argv.slice(2);

const PRODUCT_API_BASE_URL =
  'http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com';
const categoryToSelect = args[0] || 'Air Conditioners';
const categoryProducts = [];

/**
 * Fetch products data from API recursively then push the filtered products to array
 * @function
 * @param {string} page - Page of the API URL,
 * @param {string} category - Category to filter
 */
const listProductsByCategory = async (page, category) => {
  const url = PRODUCT_API_BASE_URL + page;
  const response = await axios.get(url);

  if (response.status === 200) {
    const results = response.data.objects.filter(
      (product) => product.category === category
    );
    categoryProducts.push(...results);
    if (response.data.next !== null) {
      await listProductsByCategory(response.data.next, category);
    }
  } else {
    throw new Error(response.status);
  }
};

/**
 * Calculate the average cubic weights for products passed
 * @function
 * @param {array} products - List of product objects
 * @returns {number} - The average cubic weight.
 */
const getAverageCubicWeight = (products) => {
  const cubicWeightTotal = products.reduce(
    (acc, product) => acc + convertToCubicWeight(product.size),
    0
  );
  return cubicWeightTotal / products.length;
};

/**
 * Convert width, length, height to cubic weight
 * @function
 * @param {object} product.size - Size object for a product
 * @returns {number} - The cubic weight.
 */
const convertToCubicWeight = ({ width, length, height }) => {
  const cubicWeight =
    (Number(width) / 100) *
    (Number(length) / 100) *
    (Number(height) / 100) *
    250;
  return cubicWeight;
};

// Excute the function to get the average cubic weight
const printAverage = () => {
  listProductsByCategory('/api/products/1', categoryToSelect)
    .then(() => {
      if (categoryProducts.length > 0) {
        const averageCubicWeight = getAverageCubicWeight(categoryProducts);
        console.log(
          `Average Cubic Weight in ${categoryToSelect}`,
          Math.round(averageCubicWeight * 100) / 100 //rounded to 2 decimal places
        );
      } else {
        console.log(`There is no product in ${categoryToSelect}`);
      }
    })
    .catch((e) => console.log('There has been a problem :', e.message));
};

printAverage();

module.exports = {
  listProductsByCategory,
  getAverageCubicWeight,
  convertToCubicWeight,
  categoryProducts,
};
