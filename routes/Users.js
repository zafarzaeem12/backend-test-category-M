const router = require('express').Router();

const { 
    New_Register_User,
    Get_All_Users,
    Get_Specfic_User,
    Update_User,
    Delete_User
} = require('../controllers/Users')

router.post('/createUser' , New_Register_User);
router.get('/users' , Get_All_Users);
router.get('/users/:id' , Get_Specfic_User);
router.put('/users/:id' , Update_User);
router.delete('/users' , Delete_User);


module.exports = router