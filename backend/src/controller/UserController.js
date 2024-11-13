const UserService = require('../services/UserService');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) =>{
    try {
        const { email, password, confirmPassword} = req.body
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        const isCheckValidEmail = mailformat.test(email)
        if (!email || !password || !confirmPassword){
            return res.status(200).json({
                status: 'ERR',
                message: "The input is required"
            })
        }
        else if (!isCheckValidEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The email is invalid'
            })
        }
        else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Confirm password is invalid'
            })
        }
        const response = await UserService.createUser(req.body)
        return res.status(200).json(response)
    }
    catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const checkLogged = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                status: 'ERR',
                message: 'No token provided'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                status: 'ERR',
                message: 'User not found'
            });
        }

        res.status(200).json({
            status: 'OK',
            message: 'User is logged in',
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                avatar: user.avatar || '' // Assuming you have an avatar field
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'ERR',
            message: 'Internal server error'
        });
    }
};

const logoutUser = (req, res) => {
    res.clearCookie('refresh_token');
    res.status(200).json({
        status: 'OK',
        message: 'Logged out successfully'
    });
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const isCheckValidEmail = mailformat.test(email);
        if (!email || !password) {
            return res.status(400).json({
                status: 'ERR',
                message: "The input is required"
            });
        } else if (!isCheckValidEmail) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The email is invalid'
            });
        }
        const response = await UserService.loginUser(req.body);
        if (response.status === "OK") {
            const { access_token, refresh_token, isAdmin } = response;
            res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                secure: true,
            });

            return res.status(200).json({
                status: 'OK',
                message: 'SUCCESS',
                access_token: access_token,
                isAdmin: isAdmin,
                redirectPath: isAdmin ? '/product-detail' : '/'
            });
        } else {
            return res.status(400).json({
                status: 'ERR',
                message: response.message
            });
        }
    } catch (e) {
        return res.status(500).json({
            message: e.message || 'Internal server error'
        });
    }
}

const updateUser = async (req, res) =>{
    try {
        const userId = req.params.id
        const data = req.body
        if (!userId){
            return res.status(200).json({
                status: "ERR",
                message: "The userId is required"
            })
        }
        console.log(userId)
        const response = await UserService.updateUser(userId, data)
        return res.status(200).json(response)   
    }
    catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteUser = async (req, res) =>{
    try {
        const userId = req.params.id
        if (!userId){
            return res.status(200).json({
                status: "ERR",
                message: "The userId is required"
            })
        }
        const response = await UserService.deleteUser(userId)
        return res.status(200).json(response)   
    }
    catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllUser = async (req, res) =>{
    try {
        const response = await UserService.getAllUser()
        return res.status(200).json(response)   
    }
    catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailUser = async (req, res) =>{
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: "ERR",
                message: "The userId is required"
            })
        }
        const response = await UserService.getDetailUser(userId)
        return res.status(200).json(response)   
    }
    catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailUser,
    logoutUser,
    checkLogged
}