exports.up = function (knex) {
  return knex.schema.alterTable('products', (table) => {
    // Make ASIN not nullable
    table.string('asin', 100).notNullable().alter();

    // Add unique constraint
    table.unique('asin');
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('products', (table) => {
    // Revert ASIN to nullable
    table.string('asin', 100).nullable().alter();

    // Drop unique constraint
    table.dropUnique('asin');
  });
};
