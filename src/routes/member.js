const express = require('express');
const { registration, Allmember,  UpdateProfile,  deleteMember, Search } = require('../controller/member');
const router = express.Router();


router.post('/registration',registration);
router.get('/allMember',Allmember);
router.get('/searchByMobile/:phone',Search);
router.get('/deleteMember/:id',deleteMember);

router.post('/updateProfile',UpdateProfile);





module.exports = router; 