/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("rooms", table => {
        table.increments()
        table.string("number", 128).notNullable()
        table.integer("floor").notNullable()
        table.string("description", 255).defaultTo(null)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("rooms")
};
