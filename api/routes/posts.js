const router = require ('express').Router ();
const User = require ('../models/User');
const Post = require ('../models/Post');

//CREATE POST
router.post ('/', async (req, res) => {
  const newPost = new Post (req.body);
  try {
    const savedPost = await newPost.save ();
    res.status (200).json (savedPost);
  } catch (error) {
    res.status (500).json (error);
  }
});

//UPDATE POST
router.put ('/:id', async (req, res) => {
  try {
    const post = await Post.findById (req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate (
          req.params.id,
          {
            $set: req.body,
          },
          {new: true}
        );
        res.status (200).json (updatedPost);
      } catch (err) {
        res.status (500).json (err);
      }
    } else {
      res.status (401).json ('You can only update your post');
    }
  } catch (err) {
    res.status (500).json (err);
  }
});

//DELETE POST
router.delete ('/:id', async (req, res) => {
  try {
    const post = await Post.findById (req.params.id);
    if (post.username === req.body.username) {
      try {
        await Post.findByIdAndDelete (req.params.id);
        res.status (200).json ('Post deleted');
      } catch (error) {
        res.status (500).json (error);
      }
    } else {
      res.status (401).json ('You can only delete your post');
    }
  } catch (err) {
    res.status (500).json (err);
  }
});

//GET POST
router.get ('/:id', async (req, res) => {
  try {
    const post = await Post.findById (req.params.id);
    res.status (200).json (post);
  } catch (error) {
    res.status (500).json (error);
  }
});

//GET ALL POST
router.get ('/', async (req, res) => {
  const username = req.query.user;
  const categoryName = req.query.category;
  try {
    let posts;
    if (username) {
      posts = await Post.find ({username: username});
    } else if (categoryName) {
      posts = await Post.find ({
        categories: {
          $in: [categoryName],
        },
      });
    } else {
      posts = await Post.find ();
    }
    res.status (200).json (posts);
  } catch (error) {
    res.status (500).json (error);
  }
});

module.exports = router;
