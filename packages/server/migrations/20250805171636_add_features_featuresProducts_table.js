/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('features', (table) => {
      table.increments();
      table.string('slug').notNullable();
      table.string('title').notNullable();
      table.text('meta_description').nullable();
    })
    .createTable('featuresProducts', (table) => {
      table.increments();
      table.integer('product_id').unsigned();
      table.foreign('product_id').references('id').inTable('products');
      table.integer('feature_id').unsigned();
      table.foreign('feature_id').references('id').inTable('features');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('featuresProducts').dropTable('features');
};
