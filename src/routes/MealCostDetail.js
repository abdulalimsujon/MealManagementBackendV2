const express = require('express');
const { MealDetail,  getMealCostDetail} = require('../controller/MealCostDetail');


const router = express.Router();


router.post('/mealCostDetail',MealDetail);
router.get('/getMealCostDetail',getMealCostDetail);
//router.get('/TotalmealCost',totalMealCost)




module.exports = router; 