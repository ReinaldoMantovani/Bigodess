
const router = require("express").Router();
const User = require("../models/User.js");
const Post = require("../models/Post.js");

// Create new post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body); 
  try {
    const savePost = await newPost.save();
    res.status(200).json({savePost});
    console.log(savePost)
  } catch (error) {
    res.status(500).json(error);
  } 
});

//Update post
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }

  try {
    const post = await Post.findById(id);
    if (!post) { // Corrigido: deve ser !post para retornar 404 se o post não for encontrado
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.username !== req.body.username) {
      return res.status(401).json({ error: 'You can only update your own post' });
    }

    // Aqui você pode adicionar validações para os dados que estão sendo atualizados
    const updatePost = await Post.findByIdAndUpdate(id, req.body,
       { new: true });
    res.status(200).json( updatePost, { message: ' Updates post successfully' });
    console.log(updatePost);
  } catch (error) {
    console.error(`Error updating post: ${error}`);
    res.status(500).json({ error: 'Error updating post' });
  }
});

// Delete post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete()
        res.status(200).json("Your post has been deleted ")
      } catch (error) {
        res.status(500).json("You can delete only your post!");
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get post
router.get("/:id", async (req, res) => {
  try {
      const post = await Post.findById(req.params.id)
      res.status(200).json(post)
  } catch (error) {
      res.status(500).json(error)
  }
})


//Get all posts
router.get("/", async (req, res) => {
  const username = req.query.user;
  const categoryName = req.query.categories;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username })
    } else if (categoryName) {
      posts = await Post.find({
        categories: {
          $in: [categoryName],
        },
      })
    } else {
      posts =  (await Post.find(posts))
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
