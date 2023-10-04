const express = require('express');

const {  perMemberMealCost,  MealRate, grandTotal, MealInformation, editMeal, mealInfo, RegularMeal} = require('../controller/mealControl');


const router = express.Router();


router.post('/regularMeal',RegularMeal);
router.get('/perMemberMealCost/:email/:mealRate',perMemberMealCost);
router.post('/updateMeal/:id',editMeal);
router.get('/grandTotal',grandTotal);
 router.get('/mealInformation/:mealRate',MealInformation);
 router.get('/getMealInfoByDateAndId',mealInfo)
router.get('/mealRate/:grantTotalCost',MealRate);




module.exports = router; 