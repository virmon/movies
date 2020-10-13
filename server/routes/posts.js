const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Post = mongoose.model('Post', new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: String,
    date: { type: Date, default: Date.now },
    upvote: { type: Number, default: 0 }
}))

router.get('/', async (req, res) => {
    const posts = await Post.find().sort('name');
    res.send(posts);
});

router.post('/', async (req, res) => {
    let post = new Post({ 
        title: req.body.title,
        author: req.body.author
    });
    
    try {
        post = await post.save();
    }
    catch (ex) {
        console.log(ex.message)
    }
    
    res.send(post);
});

router.put('/:id', async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, { 
        title: req.body.title
    }, { new: true });
    res.send(post)
})

router.delete('/:id', async (req, res) => {
    const post = await Post.deleteOne({ _id: req.params.id});
    res.send(post);
});

router.get('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.send(post)
})

module.exports = router;