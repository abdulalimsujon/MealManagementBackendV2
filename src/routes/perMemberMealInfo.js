const express = require('express');
const { CreateMemberMealInfo } = require('../controller/perMemberMealInfo');


const router = express.Router();


router.post('/createMemberInfo',CreateMemberMealInfo);





module.exports = router; 