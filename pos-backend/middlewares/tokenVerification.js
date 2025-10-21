const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const predefinedUsers = require("../data/users");

const isVerifiedUser = async (req, res, next) => {
    try {
        const { accessToken } = req.cookies;
        
        if (!accessToken) {
            const error = createHttpError(401, "Please provide token!");
            return next(error);
        }

        const decodeToken = jwt.verify(accessToken, config.accessTokenSecret);

        // Find user in predefined users
        const user = predefinedUsers.find(u => u.id === decodeToken._id);
        
        if (!user) {
            const error = createHttpError(401, "User not found!");
            return next(error);
        }

        req.user = user;
        next();

    } catch (error) {
        const err = createHttpError(401, "Invalid Token!");
        next(err);
    }
}

module.exports = { isVerifiedUser };