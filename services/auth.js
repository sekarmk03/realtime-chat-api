const jwt = require('jsonwebtoken');
const {
    JWT_SECRET_KEY,
    APP_NAME
} = process.env;

module.exports = {
    generateToken: (req, user) => {
        const issuedAt = Math.floor(Date.now() / 1000);
        const payload = {
            iss: APP_NAME,
            sub: user.id,
            name: user.name,
            email: user.email,
            iat: issuedAt,
        };
        
        const token = jwt.sign(payload, JWT_SECRET_KEY);
        req.user = payload;

        return token;
    }
};