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
             status:201,
             data:{ token}
            })
       }
       
    }catch(err){
        console.log(err)
    }
}

const Get_All_Users = async (req, res, next) => {
    try{
        const data = await UserModel.find().select('-password')
        res.send({
            total : data.length,
            message : "Data Fetched Successfully",
            status : 200,
            data : data
        })
    }catch(err){
        console.log(err)
    }
}


const Get_Specfic_User = async (req, res, next) => {
    const id = req.params.id;
try{
    const One_User = await UserModel.findById({_id : id});
    res.send({
        message:`User Data Fetched`,
        status:200,
        data: One_User
    })
}catch(err){
    res.send({
        message:`User Not Found`,
        status:404
    })
}

}

const Update_User = async (req, res, next) => {
    try{
        const id = req.params.id;
        if(!id) {
            res.send({
                message:'User does not exists',
                status:404
            })
        } else{
            const UpdatedUser = await UserModel.findByIdAndUpdate(
                { _id : id} ,
                {
                    $set:{
                        name: req.body.name,
                        username: req.body.username,
                        mobile_no: req.body.mobile_no
                    }
                },
                { new : true }
                )
                res.send({
                    message:'User Data Update Successfully',
                    status:201,
                    data : UpdatedUser
                })

        }

    }catch(err){
        res.send({
            message:'User does not exists',
            status:404
        })
    }
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