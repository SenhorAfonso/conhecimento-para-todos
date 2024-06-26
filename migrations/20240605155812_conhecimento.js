/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('username').notNullable();
    table.string('fullName').notNullable();
    table.string('cpf').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('profilePic').notNullable();
    table.date('createdAt').notNullable();
    table.date('updatedAt').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
