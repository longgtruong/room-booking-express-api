/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("reservations", table => {
        table.increments()
        table.integer("room_id").notNullable().unsigned().references("id").inTable("rooms")
        table.integer("user_id").notNullable().unsigned().references("id").inTable("users")
        table.date("reservation_date")
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("reservations")
};
