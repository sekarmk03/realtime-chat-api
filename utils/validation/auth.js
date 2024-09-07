module.exports = {
    register: {
        name: { type: 'string', min: 3, max: 200 },
        email: { type: 'email', min: 10, max: 50 },
        password: { type: 'string', min: 6, max: 30 }
    },

    login: {
        email: { type: 'email', min: 10, max: 50 },
        password: { type: 'string', min: 6, max: 30 }
    }
}