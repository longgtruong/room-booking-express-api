/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("users", table => {
        table.increments()
        table.string("first_name", 128).notNullable()
        table.string("last_name", 128).notNullable()
        table.string("email", 128).notNullable()
        table.string("password", 128).notNullable()
        table.datetime("created_at").notNullable()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("users")
};
