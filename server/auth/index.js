const express = require('express');
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');

const db = require('../db/connection.js');
const users = db.get('users');
users.createIndex('username', {unique:true});

const router = express.Router();

const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .trim()
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
    if (result.error == null) {
        // username is unique
        users.findOne({
            username : req.body.username
        }).then(user => {
            // if user is undefined, username is not in db, otherwise, duplicate user detected
            if(user){
                // there is already a user in the db with this username
                // respond with an error which is decribing the situation
                const error = new Error('That username is not OG please select another one');
                next(error);
            }else{
                // hash the password 
               
                bcrypt.hash(req.body.password, 12).then(hashedPassword => {
                     // insert the user with the hashed password
                    const newUser = {
                        username: req.body.username,
                        password: req.body.password
                    };
                    

                    users.insert(newUser).then(insertedUser => {
                        delete insertedUser.password;
                        res.json(insertedUser);
                    })
                });


            }
        });
    } else{
        next(result.error);

    }
    res.json(result);

});

module.exports = router;