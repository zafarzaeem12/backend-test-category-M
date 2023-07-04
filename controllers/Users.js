const UserModel = require('../models/Users');
const Crypto = require('crypto-js');
const jwt = require('jsonwebtoken');


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

const Login_Existing_User = async (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    try{
        
       const data = await UserModel.findOne({email : email});
       const generated_password = Crypto.AES.decrypt(data?.password , process.env.SECRET_KEY , 10 , null)
       const original_password = generated_password.toString(Crypto.enc.Utf8);


       if(email !== data?.email){
        res.send({ message: "Email Not valid" })
       } 

       else if(password !== original_password){
        res.send({ message: "Password Not valid" })
       }
      
       else{
        const token =  jwt.sign({
            id : data._id
        }, process.env.SECRET_KEY , { expiresIn: '1h' } )
        res.send({
             message:"Login Successful",
             status:200,
             data:{ token}
            })
       }
       
    }catch(err){
        console.log(err)
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
    Login_Existing_User,
    Get_All_Users,
    Get_Specfic_User,
    Update_User,
    Delete_User
}