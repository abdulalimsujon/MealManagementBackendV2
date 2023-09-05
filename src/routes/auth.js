const express = require('express');
const { requireSignIn } = require('../middleware/requireSignIn');





const router = express.Router();


router.get('/authCheck',requireSignIn,(req,res)=>{
    res.status(200).json({
        ok: true
    })
});


router.patch( requireSignIn)





module.exports = router; 