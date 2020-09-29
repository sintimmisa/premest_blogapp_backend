const express =require('express');
const postRouter =express.Router();
const passport =require('passport');
const validatePostInput =require('../../validation/Post');

//Import POST Model
const POST =require('../../models/Post');
const ValidatePostInput = require('../../validation/Post');

// Route for GET  all postss request
// @api/posts
// accessible to all(public)
postRouter.get("/",(req,res)=>{
    POST.find({}).then((posts)=>{
        res.status(200).json(posts)
    }).catch((err)=>{
        res.status(404).json({nopostfound:'No Post Found'})
    });
});

postRouter.get("/:id", (req, res) => {
    POST.findById(req.params.id)
      .then((posts) => res.status(200).json(posts))
      .catch((err) => res.status(404).json({ nopostsfound: "No posts found" }));
  });

  postRouter.get("/:author",(req,res)=>{
    POST.find({author:req.params.author})
    .then((post)=>res.status(200).json)
    .catch((err)=>{
      res.status(404).json({noauthor:"No author found"})
    });
  })



  //Post Request:Use passport.authenticate('jwt,{session:false}) to make it Private route(
  postRouter.post('/new-post', 
   (req,res)=>{
      const author =req.user.username;
      const post =req.body;
      const {errors,isValid}=ValidatePostInput;
      //if post is not valid return errors as in validatePost input
      if(!isValid){
        return res.status(400).json(errors);
      }
      //if not create new post
      post.author=author;
     // post.content=content;
     // post.title =title;
     const newPost=new POST(post);
     newPost.save().
     then((doc)=>res.json(doc))
     .catch((err)=>console.log({create:"Error creating new post"}));

  });


  postRouter.put(
    "/:id",
  
    (req, res) => {
       const author = req.user.username;
       const { errors, isValid } = validatePostInput(req.body);
       if (!isValid) {
          return res.status(400).json(errors);
       }
       const { title, content, date } = req.body;
       Post.findOneAndUpdate(
          { author, _id: req.params.id },
          { $set: { title, content, date } },
          { new: true }
       )
          .then(doc => res.status(200).json(doc))
          .catch(err =>
             res.status(400).json({ update: "Error updating existing post" })
          );
    }
 );
 
 postRouter.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
       const author = req.user.username;
       Post.findOneAndDelete({ author, _id: req.params.id })
          .then(doc => res.status(200).json(doc))
          .catch(err =>
             res.status(400).json({ delete: "Error deleting a post" })
          );
    }
 );

  /*
  // @route GET api/postss
  // @description add/save posts
  // @access Public
  postRouter.post("/", (req, res) => {
    posts.create(req.body)
      .then((posts) => res.json({ msg: "posts added successfully" }))
      .catch((err) => res.status(400).json({ error: "Unable to add this posts" }));
  });
  
  // @route GET api/postss/:id
  // @description Update posts
  // @access Public
  postRouter.put("/:id", (req, res) => {
    POST.findByIdAndUpdate(req.params.id, req.body)
      .then((posts) => res.json({ msg: "Updated successfully" }))
      .catch((err) =>
        res.status(400).json({ error: "Unable to update the Database" })
      );
  });
  
  
  // description Delete post by id

  postRouter.delete("/:id", (req, res) => {
    POST.findByIdAndRemove(req.params.id, req.body)
      .then((posts) => res.json({ mgs: "posts entry deleted successfully" }))
      .catch((err) => res.status(404).json({ error: "No such a posts" }));
  });
8*/

module.exports=postRouter;