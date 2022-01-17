/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('rooms').del()
    .then(function () {
      // Inserts seed entries
      return knex('rooms').insert([
        { number: "B108", floor: 1, description: "Study room"},
        { number: "B109", floor: 1, description: "Study room"},
        { number: "B110", floor: 1, description: "Study room"},
        { number: "B111", floor: 1, description: "Conference room"},
        { number: "B112", floor: 1, description: "Study room"},
        { number: "C102", floor: 2, description: "Study room"},
        { number: "C102", floor: 2, description: "Study room"},
        { number: "C103", floor: 2, description: "Study room"},
        { number: "C104", floor: 2, description: "Conference room"},
        { number: "C105", floor: 2, description: "Study room"},
        { number: "D101", floor: 2, description: "Study room"},
        { number: "D102", floor: 3, description: "Study room"},
        { number: "D103", floor: 3, description: "Study room"},
        { number: "D104", floor: 3, description: "Study room"},
      ]);
    });
};
