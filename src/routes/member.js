const express = require('express');
const { registration, Allmember,    deleteMember, Search, getProfileData, UpdateProfile, notifyBalanceByEmail } = require('../controller/member');

const router = express.Router();


router.post('/registration',registration);
router.get('/allMember',Allmember);
router.get('/searchByMobile/:phone',Search);
router.get('/deleteMember/:id',deleteMember);
router.get('/notifyMealByEmail/:email/:balance',notifyBalanceByEmail);


router.post('/profileUpdate/:email',UpdateProfile)
router.get('/getProfileData/:email',getProfileData)





module.exports = router; 