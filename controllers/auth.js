const { userSvc, authSvc } = require('../services');
const { sequelize } = require('../models');
const bcrypt = require('bcrypt');
const err = require('../utils/errors');
const { authSchema } = require('../utils/validation');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = {
    register: async (req, res, next) => {
        let transaction;
        try {
            const body = req.body;

            const val = v.validate(body, authSchema.register);
            if (val.length) return err.bad_request(res, val[0].message);

            const { name, email, password } = body;

            const existUser = await userSvc.getUserByEmail(email);
            if (existUser) return err.conflict(res, 'Email already registered');

            transaction = await sequelize.transaction();

            const newUser = await userSvc.addUser(name, email, password);

            await transaction.commit();

            return res.status(201).json({
                status: 'CREATED',
                message: 'Successfully create new user',
                data: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    created_at: newUser.created_at,
                }
            });
        } catch (error) {
            console.log("ERROR: ", error);
            if (transaction) await transaction.rollback();
            next(error);
        }
    },

    login: async (req, res, next) => {
        try {
            const body = req.body;

            const val = v.validate(body, authSchema.login);
            if (val.length) return err.bad_request(res, val[0].message);

            const { email, password } = body;

            const user = await userSvc.getUserByEmail(email);
            if (!user) return err.not_found(res, 'User not found');

            const match = await bcrypt.compare(password, user.password);
            if (!match) return err.unauthorized(res, 'Invalid email or password');

            const token = authSvc.generateToken(req, user);

            return res.status(200).json({
                status: 'OK',
                message: 'Successfully login',
                data: {
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        created_at: user.created_at,
                    }
                }
            });
        } catch (error) {
            console.log("ERROR: ", error);
            next(error);
        }
    },

    whoami: async (req, res, next) => {
        try {
            let user = {
                id: req.user.sub,
                name: req.user.name,
                email: req.user.email,
            };
            
            return res.status(200).json({
                status: 'OK',
                message: 'Successfully get logged user data',
                data: user
            });
        } catch (error) {
            console.log("ERROR: ", error);
            next(error);
        }
    }
}