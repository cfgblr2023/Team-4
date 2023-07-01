const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');


// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register

router.post('/register', (req, res) => {
    const { name, email, password, role, password2, phoneno } = req.body;
    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }
    
    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
        errors,
        name,
        email,
        password,
        password2
        });
    }
    else{
        User.findOne({ email: email }).then(user => {
            if (user) {
            errors.push({ msg: 'Email already exists' });
            res.render('register', {
                errors,
                name,
                email,
                password,
                password2
            });
            } else {
            const newUser = new User({
                name,
                email,
                password,
                phoneno,
                role
            });
//hash password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
               //new password
                newUser.password = hash;
                //save users
                newUser.save()
                    .then(user => {
                    req.flash(
                        'success_msg',
                        'You are now registered and can log in'
                    );
                    res.redirect('/users/login');
                    })
                    .catch(err => console.log(err));
                });
            });
            }
    });
    }
});

// Login
router.post('/login', (req, res, next) => {
    User.findOne ({email : req.body.email}).then (user => {
        if (user.role == 'admin') {
            passport.authenticate('local', {
            successRedirect: '/admin_panel',
            failureRedirect: '/users/login',
            failureFlash: true
            })(req, res, next);
        }
        else if (user.role == 'user') {
            passport.authenticate('local', {
            successRedirect: '/user_panel',
            failureRedirect: '/users/login',
            failureFlash: true
            })(req, res, next);
        }
        else if (user.role == 'org') {
            passport.authenticate('local', {
            successRedirect: '/org_panel',
            failureRedirect: '/users/login',
            failureFlash: true
            })(req, res, next);
        }
    })
    // passport.authenticate('local', {
    //     successRedirect: '/dashboard',
    //     failureRedirect: '/users/login',
    //     failureFlash: true
    // })(req, res, next);
});

  // Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/users/login');
});


module.exports = router;
