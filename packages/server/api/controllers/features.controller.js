/* TODO: This is an example controller to illustrate a server side controller.
Can be deleted as soon as the first real controller is added. */

const knex = require('../../config/db');

const getFeatures = async () => {
  try {
    const features = await knex('features');

    return features;
  } catch (error) {
    return error.message;
  }
};

const getFeaturesByProduct = async (product) => {
  try {
    const features = await knex('features')
      .select('features.*')
      .join(
        'featuresProducts',
        'featuresProducts.feature_id',
        '=',
        'features.id',
      )
      .join('products', 'featuresProducts.product_id', '=', 'products.id')
      .where({ product_id: product });
    return features;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getFeatures,
  getFeaturesByProduct,
};
