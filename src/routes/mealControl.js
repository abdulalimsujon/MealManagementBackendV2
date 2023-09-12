const express = require('express');

const { RegularMeal, updateByAdmin, perMemberMealCost, currentBalance, MealRate, grandTotal, mealInfo} = require('../controller/mealControl');


const router = express.Router();


router.post('/regularMeal',RegularMeal);
router.post('/updateMeal/:id',updateByAdmin);
router.get('/perMemberMealCost/:email/:mealRate',perMemberMealCost);
router.get('/currentBalancePerMember/:email/:totalMealCost',currentBalance);
router.get('/grandTotal',grandTotal);
router.get('/mealInfo/:id',mealInfo);


router.get('/mealRate/:grantTotalCost',MealRate);




module.exports = router; 