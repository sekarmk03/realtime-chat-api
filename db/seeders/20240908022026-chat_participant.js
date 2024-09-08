'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('chat_participants', [
      {
        user_id: 1,
        chat_id: 1,
        role: 'member',
        joined_at: new Date("2024-09-07T07:09:30.000Z"),
        created_at: new Date("2024-09-07T07:09:30.000Z"),
        updated_at: new Date("2024-09-07T07:09:30.000Z")
      },
      {
        user_id: 2,
        chat_id: 1,
        role: 'member',
        joined_at: new Date("2024-09-07T07:09:30.000Z"),
        created_at: new Date("2024-09-07T07:09:30.000Z"),
        updated_at: new Date("2024-09-07T07:09:30.000Z")
      },
      {
        user_id: 1,
        chat_id: 2,
        role: 'member',
        joined_at: new Date("2024-09-08T02:06:42.000Z"),
        created_at: new Date("2024-09-08T02:06:42.000Z"),
        updated_at: new Date("2024-09-08T02:06:42.000Z")
      },
      {
        user_id: 3,
        chat_id: 2,
        role: 'member',
        joined_at: new Date("2024-09-08T02:06:42.000Z"),
        created_at: new Date("2024-09-08T02:06:42.000Z"),
        updated_at: new Date("2024-09-08T02:06:42.000Z")
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('chat_participants', null, {});
  }
};
