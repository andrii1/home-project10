/* TODO: This is an example controller to illustrate a server side controller.
Can be deleted as soon as the first real controller is added. */

const knex = require('../../config/db');

const getOccasions = async () => {
  try {
    const occasions = await knex('occasions');

    return occasions;
  } catch (error) {
    return error.message;
  }
};

const getOccasionsByApp = async (app) => {
  try {
    const occasions = await knex('occasions')
      .select('occasions.*')
      .join(
        'occasionsApps',
        'occasionsApps.businessModel_id',
        '=',
        'occasions.id',
      )
      .join('apps', 'occasionsApps.app_id', '=', 'apps.id')
      .where({ app_id: app });
    return occasions;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getOccasions,
  getOccasionsByApp,
};
