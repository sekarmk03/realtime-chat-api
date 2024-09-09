const { chatSvc, messageSvc } = require('../services');
const { sequelize } = require('../models');
const err = require('../utils/errors');
const { chat: chatTransform, message: messageTransform } = require('../utils/response_transformer');

module.exports = {
    create: async (req, res, next) => {
        let transaction;
        let flag = 0;
        try {
            const { name, type, recipient_id } = req.body;

            transaction = await sequelize.transaction();

            const userId = req.user.sub;
            let userIds = [userId, recipient_id];

            let chat = await chatSvc.getChatByMembers(userIds);
            if (chat.length > 0) {
                return res.status(200).json({
                    status: 'OK',
                    message: 'Chat already exist',
                    data: chat[0]
                });
            }

            chat = await chatSvc.createChat(name, type, userIds);
            
            await transaction.commit();
            flag = 1;

            chat = await chatSvc.getChatById(chat.id, userId);
            const receivers = await chatSvc.getOtherChatParticipants(chat.id, userId);
            const latestMessage = await messageSvc.getLatestMessage(chat.id);
            
            chat = {
                ...chat.dataValues,
                receivers,
                latestMessage: latestMessage ?? []
            };
            
            chat = chatTransform.chatListDetail(chat);
            

            return res.status(201).json({
                status: 'CREATED',
                message: 'Successfully create new chat',
                data: chat
            });
        } catch (error) {
            console.log("ERROR: ", error);
            if (transaction && flag != 1) await transaction.rollback();
            next(error);
        }
    },

    getChats: async (req, res, next) => {
        try {
            const userId = req.user.sub;
            let chats = await chatSvc.getChatsByUserId(userId);

            chats = await Promise.all(chats.map(async chat => {
                const receivers = await chatSvc.getOtherChatParticipants(chat.id, userId);
                const latestMessage = await messageSvc.getLatestMessage(chat.id);
                return {
                    ...chat.dataValues,
                    receivers,
                    latestMessage: latestMessage ?? []
                };
            }));

            chats = chatTransform.chatList(chats);

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
            const userId = req.user.sub;

            let chat = await chatSvc.getChatById(chatId, userId);

            if (!chat) return err.not_found(res, 'Chat not found');

            const receivers = await chatSvc.getOtherChatParticipants(chat.id, userId);
            const messages = await messageSvc.getMessagesByChat(chat.id);

            chat = {
                ...chat.dataValues,
                receivers,
                messages
            };
            
            chat = chatTransform.chatDetail(chat);

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
            let messages = await messageSvc.getMessagesByChat(chatId);

            messages = messageTransform.messageList(messages);

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