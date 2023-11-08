const jwt = require('jsonwebtoken');

const isLogin = (req, res, next) => {
    try {
        const token = extractToken(req);
        if (!token) return res.status(401).json({
            success: 0,
            message: "Unauthorized"
        })
        const decoded = verifyToken(token);
        req.user = decoded;
        next();

    } catch (err) {
        res.status(400).send({
            success: 0,
            message: err.message,
        })
    }
}

function extractToken(req) {
    try {
        const [type, token] = req.headers.authorization.split(' ') ?? [];
        if (token) return token;
        return undefined;

    } catch (err) {
        return undefined
    }
}

async function verifyToken(token) {
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
    isLogin,
}