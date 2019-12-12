const express = require("express");

const router = express.Router();

// any router in here is pre-pended with /auth

router.get('/', (req,res) =>{
    res.json({
        message: 'something'
    });
});

module.exports = router;