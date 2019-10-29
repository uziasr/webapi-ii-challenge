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


// router.post('/', (req, res)=>{
//     db.insert(req.body)
//     .then(hub=>{
//         res.status(201).json(hub)
//     })
//     .catch(error =>{
//         res.status(500).json({message: 'error adding post'})
//     })
// })