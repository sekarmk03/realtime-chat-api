const { userSvc } = require('../services');
const err = require('../utils/errors');

module.exports = {
    index: async (req, res, next) => {
        try {
            let {
                sort = "created_at",
                type = "desc",
            } = req.query;

            const users = await userSvc.getAllUsers(sort, type);

            return res.status(200).json({
                status: 'OK',
                message: 'Successfully get all users',
                data: users
            });
        } catch (error) {
            console.log("ERROR: ", error);
            next(error);
        }
    }
}