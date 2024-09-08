const { chatSvc, messageSvc } = require('../services');
const { sequelize } = require('../models');
const err = require('../utils/errors');

module.exports = {
    create: async (req, res, next) => {
        let transaction;
        try {
            const { type, recipientId } = req.body;

            transaction = await sequelize.transaction();

            let userIds = [req.user.id, recipientId];

            let chat = await chatSvc.getChatByMembers(userIds);
            if (chat.length > 0) {
                return res.status(200).json({
                    status: 'OK',
                    message: 'Chat already exist',
                    data: chat[0]
                });
            }

            chat = await chatSvc.createChat(type, userIds);

            await transaction.commit();

            return res.status(201).json({
                status: 'CREATED',
                message: 'Successfully create new chat',
                data: chat
            });
        } catch (error) {
            console.log("ERROR: ", error);
            if (transaction) await transaction.rollback();
            next(error);
        }
    },

    getChats: async (req, res, next) => {
        try {
            const chats = await chatSvc.getChatsByUserId(req.user.id);

            return res.status(200).json({
                status: 'OK',
                message: 'Successfully get chats',
                data: chats
            });
        } catch (error) {
            console.log("ERROR: ", error);
            next(error);
        }
    },

    getChat: async (req, res, next) => {
        try {
            const chatId = parseInt(req.params.id);
            const userId = parseInt(req.user.id);

            const chat = await chatSvc.getChatById(chatId, userId);

            if (!chat) return err.not_found(res, 'Chat not found');

            return res.status(200).json({
                status: 'OK',
                message: 'Successfully get chat',
                data: chat
            });
        } catch (error) {
            console.log("ERROR: ", error);
            next(error);
        }
    },

    getMessages: async (req, res, next) => {
        try {
            const chatId = parseInt(req.params.id);
            const messages = await messageSvc.getMessagesByChat(chatId);

            return res.status(200).json({
                status: 'OK',
                message: 'Successfully get messages',
                data: messages
            })
        } catch (error) {
            console.log("ERROR: ", error);
            next(error);
        }
    }
}