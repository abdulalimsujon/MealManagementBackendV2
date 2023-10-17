const express = require('express');
const { MealDetail,  getMealCostDetail, getMarketTotalCost} = require('../controller/MealCostDetail');


const router = express.Router();


router.post('/mealCostDetail',MealDetail);
router.get('/getMealCostDetail',getMealCostDetail);
router.get('/MarketTotalCost',getMarketTotalCost);




module.exports = router; 