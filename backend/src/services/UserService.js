const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require('./JwtService')

const createUser = (newUser) =>{
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser
        try{
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser !== null){
                resolve({
                    status: 'ERR',
                    message: 'The email is already'
                })
            }
            const hash = bcrypt.hashSync(password, 10)
            console.log(hash);
            const createdUser = await User.create({
                name, 
                email, 
                password: hash, 
                confirmPassword, 
                phone
            })
            if (createdUser){
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdUser
                })
            }
        }
        catch (e){
            reject(e)
        }
    })
}

const loginUser = async (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin;
        try {
            const checkUser = await User.findOne({ email: email });
            if (!checkUser) {
                return resolve({
                    status: 'ERR',
                    message: 'The user does not exist'
                });
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password);
            if (!comparePassword) {
                return resolve({
                    status: 'ERR',
                    message: 'The password is incorrect'
                });
            }
            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            });
            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            });

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                access_token,
                refresh_token,
                isAdmin: checkUser.isAdmin
            });
        } catch (e) {
            reject(e);
        }
    });
}

const updateUser = (id, data) =>{
    return new Promise(async (resolve, reject) => {
        try{
            const checkUser = await User.findOne({
                _id: id
            })
            console.log("checkUser: ", checkUser)
            if (checkUser === null) {
                resolve({
                    status: "OK",
                    message: "The user is not defined"
                })
            } 
           const updatedUser = await User.findByIdAndUpdate(id, data, { new: true})
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: updatedUser
            })
            
        }
        catch (e){
            reject(e)
        }
    })
}

const deleteUser = (id) =>{
    return new Promise(async (resolve, reject) => {
        try{
            const checkUser = await User.findOne({
                _id: id
            })
            console.log("checkUser: ", checkUser)
            if (checkUser === null) {
                resolve({
                    status: "OK",
                    message: "The user is not defined"
                })
            } 
        //    const deletedUser = await User.findByIdAndDelete(id)
            resolve({
                status: "OK",
                message: " Delete user SUCCESS",
            })
            
        }
        catch (e){
            reject(e)
        }
    })
}

const getAllUser = (id) =>{
    return new Promise(async (resolve, reject) => {
        try{
            const allUser = await User.find()
            resolve({
                status: "OK",
                message: " Get user SUCCESS",
                data: allUser
            })         
        }
        catch (e){
            reject(e)
        }
    })
}

const getDetailUser = (id) =>{
    return new Promise(async (resolve, reject) => {
        try{
            const user = await User.findOne(
                {_id: id}
            )
            if (user === null) {
                resolve({
                    status: "OK",
                    message: "The user is not defined"
                })
            }
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: user
            })         
        }
        catch (e){
            reject(e)
        }
    })
}



module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailUser
}