const express = require('express');
const router = express.Router();
const {ensureAuthenticated,ensureGuest} = require('../helpers/auth');
const mongoose = require('mongoose');
const Story = mongoose.model('stories');
const User = mongoose.model('users');


router.get('/',(req,res)=>{
    Story.find({status : 'public'})
        .populate('user')
        .then(stories =>{
            res.render('stories/index',{
                stories : stories,
            });
        })
});

// Show Single Story
router.get('/show/:id',(req,res)=>{
    Story.findOne({
        _id : req.params.id
    }).populate('user')
        .then(story =>{
        res.render('stories/show',{
            story : story
        })
    })
})
router.get('/add', ensureAuthenticated,(req,res)=>{
    res.render('stories/add');
});


router.post('/',(req,res)=>{
    let allowComments;
    if(req.body.allowComments){
        allowComments = true;
    }else{
        allowComments = false;
    }
    const newStory = {
        title : req.body.title,
        body : req.body.body,
        status : req.body.status,
        allowComments : allowComments,
        user : req.user.id
    }

    // Create Story
    new Story(newStory)
        .save()
        .then(story =>{
            res.redirect(`/stories/show/${story.id}`);
        })
})
router.get('/edit/:id',ensureAuthenticated, (req,res)=>{
    Story.findOne({
        _id : req.params.id
    }).then(story =>{
            res.render('stories/edit',{
                story : story
            })
        })
});

router.put('/:id',(req,res)=>{
    Story.findOne({
        _id : req.params.id
    }).then(story =>{
        let allowComments;
        if(req.body.allowComments){
            allowComments = true;
        }else{
            allowComments = false;
        }
        story.title = req.body.title;
        story.body = req.body.body;
        story.status = req.body.status;
        story.allowComments = allowComments;
        story.save()
            .then(story =>{
                res.redirect('/dashboard');
            })
    })
});

router.delete('/:id', (req,res)=>{
    Story.deleteOne({_id:req.params.id})
        .then(()=>{
            res.redirect('/dashboard');
        })
})
router.get('/show',(req,res)=>{
    res.render('stories/show');
});


module.exports = router;