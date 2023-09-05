const express = require('express');
const { registration, Allmember,  UpdateProfile,  deleteMember } = require('../controller/member');
const router = express.Router();


router.post('/registration',registration);
router.get('/allMember',Allmember);
router.delete('/deleteMember/:id',deleteMember);

router.post('/updateProfile',UpdateProfile);





module.exports = router; 