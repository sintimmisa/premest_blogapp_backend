const express =require('express');
const postRouter =express.Router();

//Load POST Model
const POST =require('../../models/Post');

// Route for GET  all postss request
// @api/posts
// accessible to all(public)
postRouter.get("/",(req,res)=>{
    POST.find({}).then((posts)=>{
        res.json(posts)
    }).catch((err)=>{
        res.status(404).json({nopostfound:'No Post Found'})
    });
});

postRouter.get("/:id", (req, res) => {
    POST.findById(req.params.id)
      .then((posts) => res.json(posts))
      .catch((err) => res.status(404).json({ nopostsfound: "No posts found" }));
  });
  
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


module.exports=postRouter;