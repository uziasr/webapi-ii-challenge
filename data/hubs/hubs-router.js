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
    .then((banana)=>{
        console.log('bana',banana)
        res.status(201).json(req.body)})
    .catch((err)=>{
        (err.code==='SQLITE_CONSTRAINT')?res.status(404).json({ message: "The post with the specified ID does not exist." }):
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
    .then((posts)=>{(posts.length)?res.status(200).json(posts):res.status(404).json({ message: "The post with the specified ID does not exist." })})
    .catch(err=>{
        res.status(500).json({ error: "The comments information could not be retrieved." })})
})

router.delete('/:id', async (req, res)=>{
    const id = req.params.id
    //if id is greater than zero
    const aPost = await db.findById(id)
    console.log(aPost);
    if (aPost.length) {res.status(200).json(aPost)}
    db.remove(id)
    .then((count)=>{
        if(count){
        console.log('deleted')
        }else{ 
    res.status(404).json({ message: "The post with the specified ID does not exist." })}
    })
    .catch(err=> res.status(500).json({ error: "The post could not be removed" }))
})

router.put('/:id', (req,res)=>{
    const id = req.params.id;
    if ('title' in req.body & 'contents' in req.body){
    const updatedPost = db.update(id, req.body)
    console.log(updatedPost._single.update)
    if (updatedPost._single.update){
    db.findById(id)
    .then(post=>{
        post.length?
        res.status(200).json(post): res.status(404).json({ errorMessage: "That ID does not exist."})
    })
}else{
        res.status(500).json({ error: "The post information could not be modified." })
    }
}else {res.status(400).json({ errorMessage: "Please provide title and contents for the post."})}
})


// const post = db.update(id, req.body)
//     .then((post)=>{res.status(200).json()})
//     .catch(err=>{
//         res.status(500).json({ error: "The post information could not be modified." })
//     })
// }else {res.status(400).json({ errorMessage: "Please provide title and contents for the post."})}
// })