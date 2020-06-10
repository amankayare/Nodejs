const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
   
    res.render('index' , {title:'Application',message:'Welcome To Structured Express App'});

});

module.exports = router;