const Item = require('../models/Item')
const User = require('../models/User')
const cloudinary = require('../utils/cloudinary')

// Users

module.exports.getAllUsers = async (req, resp) => {
    const allUsers = await User.find();
    resp.render('admin/allUsers', allUsers);
}

module.exports.getUser = async (req, resp) => {
    const user = await User.findById(req.params.id);
    resp.render('showUser', user);
}

// Items
module.exports.getAllItems = async (req, resp) => {
    const allItems = await Item.find();
    console.log (allItems);
    resp.render('admin_panel', {allItems: allItems});
}

module.exports.getItem = async (req, resp) => {
    const item = await Item.findById(req.params.id);
    resp.send(item);
}

module.exports.editItem = async (req, resp) => {
    const newData = req.body;
    const item = await Item.findById(req.params.id);
    if (req.file) {
        await cloudinary.uploader.destroy(item.imgPubId);
        const imgUploadRes = await cloudinary.uploader.upload(req.file.path);
        item.imgUrl = imgUploadRes.secure_url;
        item.imgPubId = imgUploadRes.public_id;
        await item.save();
    }
    await Item.findByIdAndUpdate(req.params.id, newData);
    const updatedProduct = Item.findById(req.params.id);
    resp.send(updatedProduct);
}

module.exports.newItem = async (req, resp) => {
    let imgUploadRes = { secure_url: undefined, public_id: undefined }
    if (req.file) {
        imgUploadRes = await cloudinary.uploader.upload(req.file.path, (err, res) => {

        });
    }
    const itemData = req.body;
    const newItem = new Item(itemData);
    //newItem.reqStock = 0;
    newItem.imgUrl = imgUploadRes.secure_url;
    newItem.imgPubId = imgUploadRes.public_id;
    newItem.save();
    console.log (newItem.imgUrl);
    resp.redirect('/admin_panel');
}

module.exports.delItem = async (req, resp) => {
    const item = await Item.findById(req.params.id);
    if (!item) {
        return resp.send({ "error": "Item not found!" });
    }
    if (item.imgPubId) {
        await cloudinary.uploader.destroy(item.imgPubId);
    }
    await Item.findByIdAndDelete(req.params.id);
    resp.render("/admin");
}

// Campaigns

module.exports.getAllCampaigns = async (req, resp) => {
    const allCampaigns = await Campaign.find();
    resp.render('admin/allCampaigns', allCampaigns);
}

module.exports.getCampaign = async (req, resp) => {
    const camp = await Campaign.findById(req.params.id);
    resp.send(camp);
}

module.exports.editCampaign = async (req, resp) => {
    const newData = req.body;
    const camp = await Campaign.findById(req.params.id);
    if (req.file) {
        await cloudinary.uploader.destroy(camp.imgPubId);
        const imgUploadRes = await cloudinary.uploader.upload(req.file.path);
        camp.imgUrl = imgUploadRes.secure_url;
        camp.imgPubId = imgUploadRes.public_id;
        await camp.save();
    }
    await Campaign.findByIdAndUpdate(req.params.id, newData);
    const updatedProduct = Campaign.findById(req.params.id);
    resp.send(updatedProduct);
}

module.exports.newCampaign = async (req, resp) => {
    let imgUploadRes = { secure_url: undefined, public_id: undefined }
    if (req.file) {
        imgUploadRes = await cloudinary.uploader.upload(req.file.path, { folder: 'campaigns' });
    }
    const campData = req.body;
    const newCampaign = new Campaign(campData);
    newCampaign.imgUrl = imgUploadRes.secure_url;
    newCampaign.imgPubId = imgUploadRes.public_id;
    newCampaign.save();
    resp.send(await Campaign.findById(newCampaign._id));
}

module.exports.delCampaign = async (req, resp) => {
    const camp = await Campaign.findById(req.params.id);
    if (!camp) {
        return resp.send({ "error": "Campaign not found!" });
    }
    if (camp.imgPubId) {
        await cloudinary.uploader.destroy(camp.imgPubId);
    }
    await Campaign.findByIdAndDelete(req.params.id);
    resp.render("/admin/campaigns");
}
