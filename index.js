const axios = require('axios');

const args = process.argv.slice(2);

const PRODUCT_API_URL =
  args[0] ||
  'http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com/api/products/1';

const categoryToSelect = args[1] || 'Air Conditioners';

/**
 * Fetch products data from the end Point then return products in the category
 * @function
 * @param {string} url - The API end point, {string} category - Category to filter
 * @returns {array} - Filtered products by category.
 */
const listProductsByCategory = async (url, category) => {
  const response = await axios.get(url);

  if (response.status === 200) {
    return response.data.objects.filter(
      (product) => product.category === category
    );
  }
  throw new Error(response.status);
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
listProductsByCategory(PRODUCT_API_URL, categoryToSelect)
  .then((results) => {
    if (results && results.length > 0) {
      const averageCubicWeight = getAverageCubicWeight(results);
      console.log(
        `Average Cubic Weight in ${categoryToSelect}`,
        Math.round(averageCubicWeight * 100) / 100 //rounded to 2 decimal places
      );
    } else {
      console.log(`There is no product in ${categoryToSelect}`);
    }
  })
  .catch((e) => console.log('There has been a problem ', e.message));

module.exports = {
  listProductsByCategory,
  getAverageCubicWeight,
  convertToCubicWeight,
};
