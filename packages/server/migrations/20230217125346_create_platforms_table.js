exports.up = function (knex) {
  return knex.schema.createTable('platforms', (table) => {
    table.increments('id').primary();
    table.string('title', 100).notNullable(); // e.g., "Amazon", "eBay"
    table.string('domain', 100).nullable(); // e.g., amazon.com, ebay.com
    table.text('description').nullable();
    table.boolean('active').defaultTo(true);
    table.datetime('created_at').defaultTo(knex.fn.now());
    table.datetime('updated_at').defaultTo(knex.fn.now());
  });
};

export function down(knex) {
  return knex.schema.dropTableIfExists('platforms');
}
