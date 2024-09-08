'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('messages', [
      {
        chat_id: 1,
        sender_id: 1,
        content: "Hi, Mike!\nHow are you?",
        created_at: new Date("2024-09-07T07:09:35.000Z"),
        updated_at: new Date("2024-09-07T07:09:35.000Z")
      },
      {
        chat_id: 1,
        sender_id: 2,
        content: "Oh hello, Chester!",
        created_at: new Date("2024-09-07T07:11:10.000Z"),
        updated_at: new Date("2024-09-07T07:11:10.000Z")
      },
      {
        chat_id: 1,
        sender_id: 2,
        content: "I'm fine. How about you?",
        created_at: new Date("2024-09-07T07:11:40.000Z"),
        updated_at: new Date("2024-09-07T07:11:40.000Z")
      },
      {
        chat_id: 1,
        sender_id: 1,
        content: "I'm doing well, thanks! Have you finished the report?",
        created_at: new Date("2024-09-07T07:13:00.000Z"),
        updated_at: new Date("2024-09-07T07:13:00.000Z")
      },
      {
        chat_id: 1,
        sender_id: 2,
        content: "Not yet, still working on it.",
        created_at: new Date("2024-09-07T07:14:20.000Z"),
        updated_at: new Date("2024-09-07T07:14:20.000Z")
      },
      {
        chat_id: 1,
        sender_id: 1,
        content: "Let me know if you need help.",
        created_at: new Date("2024-09-07T07:15:30.000Z"),
        updated_at: new Date("2024-09-07T07:15:30.000Z")
      },
      {
        chat_id: 1,
        sender_id: 2,
        content: "I might take you up on that!",
        created_at: new Date("2024-09-07T07:16:45.000Z"),
        updated_at: new Date("2024-09-07T07:16:45.000Z")
      },
      {
        chat_id: 1,
        sender_id: 2,
        content: "Thanks, Chester.",
        created_at: new Date("2024-09-07T07:16:55.000Z"),
        updated_at: new Date("2024-09-07T07:16:55.000Z")
      },
      {
        chat_id: 1,
        sender_id: 1,
        content: "No problem at all.",
        created_at: new Date("2024-09-07T07:18:00.000Z"),
        updated_at: new Date("2024-09-07T07:18:00.000Z")
      },
      {
        chat_id: 1,
        sender_id: 2,
        content: "How's your weekend looking?",
        created_at: new Date("2024-09-07T07:19:20.000Z"),
        updated_at: new Date("2024-09-07T07:19:20.000Z")
      },
      {
        chat_id: 2,
        sender_id: 3,
        content: "Hey Chester, did you catch the game last night?",
        created_at: new Date("2024-09-07T07:25:15.000Z"),
        updated_at: new Date("2024-09-07T07:25:15.000Z")
      },
      {
        chat_id: 2,
        sender_id: 1,
        content: "Yeah, I did! It was intense!",
        created_at: new Date("2024-09-07T07:26:40.000Z"),
        updated_at: new Date("2024-09-07T07:26:40.000Z")
      },
      {
        chat_id: 2,
        sender_id: 3,
        content: "I know, right? That last-minute goal was crazy.",
        created_at: new Date("2024-09-07T07:27:50.000Z"),
        updated_at: new Date("2024-09-07T07:27:50.000Z")
      },
      {
        chat_id: 2,
        sender_id: 1,
        content: "Totally! We should catch the next match together.",
        created_at: new Date("2024-09-07T07:29:10.000Z"),
        updated_at: new Date("2024-09-07T07:29:10.000Z")
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('messages', null, {});
  }
};
