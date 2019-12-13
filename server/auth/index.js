const express = require("express");

const router = express.Router();

// any router in here is pre-pended with /auth

router.get('/', (req,res) =>{
    res.json({
        message: 'something'
    });
});

router.post('/signup', (req,res) =>{
    res.json({
        message: 'sign up'
    });
});

module.exports = router;