const { Message, User } = require('../models');

module.exports = {
    getMessagesByChat: async (chatId) => {
        const messages = await Message.findAll({
            where: { chat_id: chatId },
            order: [['created_at', 'asc']],
        });

        return messages;
    },

    createMessage: async (chatId, senderId, content) => {
        const message = await Message.create({
            chat_id: chatId,
            sender_id: senderId,
            content: content
        });

        return message;
    }
}