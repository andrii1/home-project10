exports.up = function (knex) {
  return knex.schema.createTable('products', (table) => {
    table.increments();
    table.string('asin', 100).nullable();
    table.text('title').notNullable();
    table.string('slug').notNullable();

    table.text('description').nullable();

    table.integer('category_id').unsigned();
    table.foreign('category_id').references('id').inTable('categories');

    table.text('url').nullable();
    table.text('url_affiliate').nullable();
    table.text('url_image').nullable();
    table.string('url_icon').nullable();
    table.string('url_serpapi').nullable();
    table.string('options').nullable();
    table.string('brand').nullable();
    table.decimal('rating', 2, 1).unsigned().nullable();
    table.integer('reviews').unsigned().nullable();
    table.decimal('price', 10, 2).unsigned().nullable();
    table.decimal('price_original', 10, 2).unsigned().nullable();
    table.integer('discount_percentage').unsigned().nullable();
    table.string('currency', 10).defaultTo('USD');
    table.boolean('is_prime').defaultTo(false);
    table.boolean('featured').defaultTo(false);
    table.boolean('sponsored').defaultTo(false);
    table.boolean('top_rated').defaultTo(false);

    table.integer('bought_last_month').unsigned().nullable();
    table.integer('rank').unsigned().nullable(); // Movers & Shakers / Best Sellers rank

    table.string('source').nullable();

    table.json('raw_data').nullable(); // Full SERP API dump

    table.string('meta_description').nullable();

    table.datetime('last_checked_at').nullable();
    table
      .enu('status', ['active', 'unavailable', 'deleted'])
      .defaultTo('active');

    table.datetime('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
    table.datetime('updated_at', { precision: 6 }).defaultTo(knex.fn.now(6));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('products');
};
