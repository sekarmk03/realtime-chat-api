const { User } = require('../models');
const bcrypt = require('bcrypt');

module.exports = {
    getAllUsers: async (sort, type) => {
        const users = await User.findAll({
            order: [[sort, type]]
        });
        return users;
    },

    getUserById: async (id) => {
        const user = await User.findOne({where: {id}});
        return user;
    },

    getUserByEmail: async (email) => {
        const user = await User.findOne({where: {email}});
        return user;
    },

    addUser: async (name, email, password) => {
        const user = await User.create({
            name,
            email,
            password: await bcrypt.hash(password, 10)
        });

        return user;
    },
}