const { messageSvc } = require('../services');
const { sequelize } = require('../models');

module.exports = {
    create: async (req, res, next) => {
        let transaction;
        try {
            const { chat_id, content } = req.body;
            const sender_id = req.user.id;

            transaction = await sequelize.transaction();
    
            const message = await messageSvc.createMessage(chat_id, sender_id, content);
    
            await transaction.commit();

            return res.status(201).json({
                status: 'CREATED',
                message: 'Message successfully created',
                data: message
            });
        } catch (error) {
            console.log("ERROR: ", error);
            if (transaction) await transaction.rollback();
            next(error);
        }
    }
}