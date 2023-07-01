const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Item = require ('../models/Item');
// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/user_panel', ensureAuthenticated, async (req, res) =>{
    const allItems = await Item.find();
    res.render('user_panel', {
      user: req.user,
      allItems : allItems
    })
  }
);
router.get('/org_panel', ensureAuthenticated, async (req, res) =>{
    const allItems = await Item.find();
    res.render('org_panel', {
      user: req.user,
      allItems : allItems
    })
  }
);
router.get('/admin_panel', ensureAuthenticated, async (req, res) =>{
    const allItems = await Item.find();
    res.render('admin_panel', {
      user: req.user,
      allItems : allItems
    })
  }
);

module.exports = router;
