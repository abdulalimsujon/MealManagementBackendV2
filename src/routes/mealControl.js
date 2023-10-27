const express = require('express');

const {  perMemberMealCost,  MealRate, grandTotal, MealInformation, updateMeal, RegularMeal, getMeal} = require('../controller/mealControl');


const router = express.Router();


router.post('/regularMeal',RegularMeal);
router.get('/getMeal/:id',getMeal);

router.get('/perMemberMealCost/:email/:mealRate',perMemberMealCost);
router.post('/updateMeal/:value1',updateMeal);
router.get('/grandTotal',grandTotal);
 router.get('/mealInformation/:mealRate',MealInformation);

router.get('/mealRate/:grantTotalCost',MealRate);




module.exports = router; 