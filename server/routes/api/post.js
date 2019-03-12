const express =  require('express');
const mongodb = require('mongodb');

const router = express.Router();


async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb://localhost:27017/vue_express',
    {
      useNewUrlParser: true
    }
  );

  return client.db('vue_express').collection('posts');
}



//Read
router.get('/',async(req,res) => {
  const posts = await loadPostsCollection();
  const result = await posts.find({}).toArray();
  res.send(result);
})

//Create
router.post('/',async(req,res) => {
   const posts = await loadPostsCollection();
   await posts.insertOne({
       text: req.body.text,
       createAt: new Date()
   })
   res.status(201).send();
})

//Update
router.put('/:id',(req,res) => {

})

//Delete
router.delete('/:id',async(req,res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({_id:new mongodb.ObjectID(req.params.id)});
  res.status(200).send();
})

module.exports = router;
