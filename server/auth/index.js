const express = require("express");
const Joi = require('@hapi/joi');

const router = express.Router();
const schema = Joi.object().keys({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/).required()
});
// any router in here is pre-pended with /auth

router.get('/', (req,res) =>{
    res.json({
        message: 'something'
    });
});

router.post('/signup', (req,res) =>{
    const result = Joi.valid(req.body, schema);
    res.json(result);
});

module.exports = router;