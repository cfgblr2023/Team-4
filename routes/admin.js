const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController')
const Item = require('../models/Item');
const Campaign = require('../models/Campaign');
const upload=require('../utils/multer');
const Content = require('../models/Content')
// Dashboard

router.get('/create', (req, res) => {
    const content = new Content({ title:"abc", subject: "def", cyear:"10", cbody:"uiqdw"});
    content.save()
    .then(()=> {
        console.log('posted');
    })
    .catch((err) => {
        console.log(err);
    })
})

router.post('/create', (req, res) => {
    const content = new Content({ title:"abc", subject: "def", cyear:"10", cbody:"uiqdw"});
    content.save()
    .then(()=> {
        console.log('posted');
    })
    .catch((err) => {
        console.log(err);
    })
})

router.get('/dashboard', (req, resp) => {
    Content.find()
    .then(result => {
      resp.render('./admindashboard', { content: result});
    })
    .catch(err => {
      console.log(err);
    });
})

// All Users

router.get('/users', adminController.getAllUsers);

router.get('/users/:id', adminController.getUser);

// Items

router.get('/items', adminController.getAllItems);

router.post('/items', upload.single('image'), adminController.newItem);

router.get('/items/:id', async (req, resp) => {
    const item = await Item.findById(req.params.id);
    resp.render('admin/editItem', { item });
})

router.put('/items/:id', adminController.editItem);

router.delete('/items/:id', adminController.delItem);

// Campaigns

router.get('/campaigns', adminController.getAllCampaigns)

router.post('/campaigns', adminController.newCampaign);

router.get('/campaigns/:id', async (req, resp) => {
    const campaign = await Campaign.findById(req.params.id);
    resp.render('admin/editCampaign', { campaign });
})

router.put('/campaigns/:id', adminController.editCampaign);

router.delete('/campaigns/:id', adminController.delCampaign);

module.exports = router;