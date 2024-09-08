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
    },

    getLatestMessage: async (chatId) => {
        const message = await Message.findOne({
            where: { chat_id: chatId },
            order: [['created_at', 'desc']],
            limit: 1,
            include: {
                model: User,
                as: 'sender',
                attributes: ['id', 'name']
            }
        });

        return message;
    }
}