const jwt = require('jsonwebtoken');
const userRegister = require('../models/user-model');

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ msg: "Unauthorized user" });
    }

    const jwtToken = token.replace("Bearer ", "").trim();
    console.log("Token from auth middleware:", jwtToken);

    try {
        const isVerified = jwt.verify(jwtToken, process.env.SECRET_KEY);
        const userData = await userRegister.findOne({ email: isVerified.email }).select({ password: 0 });

        if (!userData) {
            return res.status(401).json({ msg: "Unauthorized user" });
        }
        
        req.user = userData;
        req.token = token;
        req.userID = userData._id;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ msg: "Token has expired" });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ msg: "Invalid token" });
        } else {
            console.log(error);
            return res.status(500).json({ msg: "Internal server error" });
        }
    }
}

module.exports = authMiddleware;
