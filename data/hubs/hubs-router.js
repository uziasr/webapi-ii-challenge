const router = require('express').Router();
const db = require('../db')

module.exports = router;


router.get('/', (req, res)=>{
    db.find()
    .then(post=>{
        res.status(201).json(post)
    })
    .catch(err =>{
        res.status(500).json({error: 'could not retrieve any posts from the database'})
    })
})


router.post('/', (req, res)=>{
    ('title' in req.body & 'contents' in req.body)?
    db.insert(req.body)
    .then(hub=>{
        res.status(201).json(req.body)
    })
    .catch(error =>{
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    }): res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
})