const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    res.render('layouts/index/welcome');
});

router.get('/dashboard', (req,res)=>{
    res.render('layouts/index/dashboard');
});

router.get('/about', (req,res)=>{
    res.render('layouts/index/about');
});

module.exports = router;