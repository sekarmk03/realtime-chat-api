'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Chester Bennington',
        email: 'chester@example.com',
        password: await bcrypt.hash('chester123', 10),
        created_at: new Date("2024-09-06T08:50:04.000Z"),
        updated_at: new Date("2024-09-06T08:50:04.000Z")
      },
      {
        name: 'Mike Shinoda',
        email: 'mike@example.com',
        password: await bcrypt.hash('mike123', 10),
        created_at: new Date("2024-09-07T13:50:04.000Z"),
        updated_at: new Date("2024-09-07T13:50:04.000Z")
      },
      {
        name: 'Joe Hahn',
        email: 'joe@example.com',
        password: await bcrypt.hash('joe123', 10),
        created_at: new Date("2024-09-08T20:50:04.000Z"),
        updated_at: new Date("2024-09-08T20:50:04.000Z")
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
