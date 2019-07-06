const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');

router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

//Add post

router.post('/',async (req,res)=>{
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date(),

  });
  res.status(201).send();
})

//Delete post

router.delete('/:id',async (req,res)=>{
  const posts = await loadPostsCollection();
  await posts.deleteOne({_id:new mongodb.ObjectID(req.params.id)});
  res.status(200).send();
})

async function loadPostsCollection() {
  
  const client = await mongodb.MongoClient.connect(
    'mongodb://Prithvi123:Prithvi1@tmcluster-shard-00-00-jwcyt.mongodb.net:27017,tmcluster-shard-00-01-jwcyt.mongodb.net:27017,tmcluster-shard-00-02-jwcyt.mongodb.net:27017/test?ssl=true&replicaSet=TMCluster-shard-0&authSource=admin&retryWrites=true&w=majority',
    {
      useNewUrlParser: true
    }
  );
  console.log("Mongodb Connected");
  return client.db('vue_express').collection('posts');
}
module.exports = router;
