'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('chats', [
      {
        name: null,
        type: 'personal',
        created_at: new Date("2024-09-07T07:09:30.000Z"),
        updated_at: new Date("2024-09-07T07:09:30.000Z")
      },
      {
        name: null,
        type: 'personal',
        created_at: new Date("2024-09-08T02:06:42.000Z"),
        updated_at: new Date("2024-09-08T02:06:42.000Z")
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('chats', null, {});
  }
};
