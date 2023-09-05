const express = require('express');
const { MealDetail} = require('../controller/MealDetail');


const router = express.Router();


router.post('/mealDetail',MealDetail);




module.exports = router; 