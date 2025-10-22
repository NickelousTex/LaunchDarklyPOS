const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const predefinedUsers = require("../data/users");

// Quick login - no registration needed, just select a role
const quickLogin = async (req, res, next) => {
    try {
        const { role } = req.body;

        if (!role) {
            const error = createHttpError(400, "Role is required!");
            return next(error);
        }

        // Find user by role
        const user = predefinedUsers.find(u => u.role.toLowerCase() === role.toLowerCase());
        
        if (!user) {
            const error = createHttpError(401, "Invalid role!");
            return next(error);
        }

        // Generate JWT token
        const accessToken = jwt.sign(
            { 
                _id: user.id, 
                role: user.role,
                name: user.name 
            }, 
            config.accessTokenSecret, 
            { expiresIn: '1d' }
        );

        // Set cookie
        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
            httpOnly: true,
            sameSite: 'lax',
            secure: false // Set to false for development
        });

        res.status(200).json({
            success: true, 
            message: "Quick login successful!", 
            data: user
        });

    } catch (error) {
        next(error);
    }
}

// Get available roles for quick login
const getAvailableRoles = async (req, res, next) => {
    try {
        const roles = predefinedUsers.map(user => ({
            role: user.role,
            name: user.name,
            avatar: user.avatar,
            timezone: user.timezone,
            timezoneDisplay: user.timezoneDisplay
        }));

        res.status(200).json({
            success: true,
            data: roles
        });
    } catch (error) {
        next(error);
    }
}

// Get user data from token
const getUserData = async (req, res, next) => {
    try {
        const { id } = req.user;
        const user = predefinedUsers.find(u => u.id === id);
        
        if (!user) {
            const error = createHttpError(404, "User not found!");
            return next(error);
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
}

// Logout
const logout = async (req, res, next) => {
    try {
        res.clearCookie('accessToken');
        res.status(200).json({
            success: true,
            message: "Logged out successfully!"
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    quickLogin,
    getAvailableRoles,
    getUserData,
    logout
};