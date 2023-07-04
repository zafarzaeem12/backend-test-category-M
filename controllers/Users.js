const UserModel = require('../models/Users');
const Crypto = require('crypto-js');

const New_Register_User = async (req, res, next) => {
    try {
        const data = new UserModel({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: Crypto.AES.encrypt( req.body.password, process.env.SECRET_KEY).toString(),
            mobile_no: req.body.mobile_no
        })

        const newUser = await data.save();

        res.send({
            message: `${newUser?.name} Profile Created Successfully`,
            status: 201,
            data: newUser
        })

    } catch (err) {

    }
}

const Get_All_Users = (req, res, next) => {

}


const Get_Specfic_User = (req, res, next) => {

}

const Update_User = (req, res, next) => {

}

const Delete_User = (req, res, next) => {

}

module.exports = {
    New_Register_User,
    Get_All_Users,
    Get_Specfic_User,
    Update_User,
    Delete_User
}