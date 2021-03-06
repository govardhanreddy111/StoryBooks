const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Story = mongoose.model('stories');
const {ensureAuthenticated,ensureGuest} = require('../helpers/auth');

router.get('/', ensureGuest, (req,res)=>{
    res.render('layouts/index/welcome');
});

router.get('/dashboard', ensureAuthenticated, (req,res)=>{
    Story.find({user:req.user.id})
        .then(stories =>{
            res.render('layouts/index/dashboard',{
                stories: stories
            });
        })
});

router.get('/about', (req,res)=>{
    res.render('layouts/index/about');
});

module.exports = router;