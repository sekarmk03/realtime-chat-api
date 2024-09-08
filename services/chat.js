const { sequelize, Chat, ChatParticipant, User } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    createChat: async (type, userIds) => {
        const chat = await Chat.create({ type });

        await this.addParticipants(chat.id, userIds);

        return chat;
    },

    addParticipants: async (chatId, userIds) => {
        const participants = await ChatParticipant.bulkCreate(
            userIds.map(userId => (
                {
                    user_id: userId,
                    chat_id: chatId,
                    joined_at: new Date()
                }
            ))
        );

        return participants;
    },

    getChatsByUserId: async (userId) => {
        const chats = await Chat.findAll({
            include: [
                {
                    model: ChatParticipant,
                    as: 'participants',
                    attributes: ['user_id'],
                    where: { user_id: userId }
                }
            ]
        });

        return chats;
    },

    getOtherChatParticipants: async (chatId, userId) => {
        const participants = await ChatParticipant.findAll({
            where: {
                chat_id: chatId,
                user_id: {
                    [Op.ne]: userId
                },
            },
            include: {
                model: User,
                as: 'user',
                attributes: ['id', 'name']
            }
        });

        return participants;
    },

    getChatById: async (chatId, userId) => {
        const chat = await Chat.findOne({
            where: { id: chatId },
            include: [
                {
                    model: ChatParticipant,
                    as: 'participants',
                    where: { user_id: userId },
                    include: {
                        model: User,
                        as: 'users',
                        attributes: ['id', 'name']
                    }
                },
                // messages
            ]
        });

        return chat;
    },

    getChatByMembers: async (userIds) => {
        const query = `
            SELECT c.id AS chat_id
            FROM chats c
            JOIN chat_participants cp1 ON c.id = cp1.chat_id
            JOIN chat_participants cp2 ON c.id = cp2.chat_id
            WHERE cp1.user_id = '${userIds[0]}' 
            AND cp2.user_id = '${userIds[1]}'
            AND c.type = 'personal'
            GROUP BY c.id
            HAVING COUNT(c.id) = 2;
        `;

        const chats = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

        return chats;
    }
}