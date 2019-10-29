const router = require('express').Router();
const db = require('../db')

module.exports = router;


router.get('/', (req, res)=>{
    db.find()
    .then(post=>{
        res.status(201).json(post)
    })
    .catch(err =>{
        res.status(500).json({ error: "The posts information could not be retrieved." })
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

router.post('/:id', (req, res)=>{
    //needs 400
    const id = req.params.id
    console.log(req.body,id)
    "text" in req.body?
    db.insertComment({...req.body,post_id:id})
    .then((id)=>{
        console.log(id)
        res.status(201).json(req.body)})
    .catch((err)=>{
        console.log(err)
        res.status(500).json({ error: "There was an error while saving the comment to the database" })
    }): res.status(400).json({ errorMessage: "Please provide text for the comment." })
})

router.get('/:id', (req, res)=>{
    const id = req.params.id
    db.findById(id)
    .then(post=>{
        post.length?
        res.status(200).json(post): res.status(404).json({ message: "The post with the specified ID does not exist." })
    })
    .catch(err=>{
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
})

router.get('/:id/comments', (req, res)=>{
    const id = req.params.id
    db.findPostComments(id)
    .then((posts)=>{res.status(200).json(posts)})
    .catch(err=>{res.status(500).json({ error: "The comments information could not be retrieved." })})
})

router.delete('/:id', (req, res)=>{
    const id = req.params.id
    db.remove(id)
    .then(()=>{
        res.status(200).json({success: `post with id ${id} was removed`})
    })
    .catch(err=> res.status(500).json({ error: "The post could not be removed" }))

})

router.put('/:id', (req,res)=>{
    const id = req.params.id;
    if ('title' in req.body & 'contents' in req.body){
    db.update(id, req.body)
    .then((post)=>{res.status(200).json()})
    .catch(err=>{
        res.status(500).json({ error: "The post information could not be modified." })
    })
}else {res.status(400).json({ errorMessage: "Please provide title and contents for the post."})}
})