const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      attributes: ["id", "title", "content", "created_at"],
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "post_id",
            "user_id",
            "created_at",
          ],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const posts = dbPostData.map(post => post.get({ plain: true }));
    res.render("homepage", { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

router.get("/post/:id", async (req, res) => {
  try {
    const dbPostData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "content", "title", "created_at"],
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "post_id",
            "user_id",
            "created_at",
          ],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    if (!dbPostData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    const post = dbPostData.get({ plain: true });
    console.log(post);
    res.render("single-post", { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/posts-comments", async (req, res) => {
 
    try {
      const dbPostData = await Post.findOne({
        where: {
          id: req.params.id,
        },
        attributes: ["id", "content", "title", "created_at"],
        include: [
          {
            model: Comment,
            attributes: [
              "id",
              "comment_text",
              "post_id",
              "user_id",
              "created_at",
            ],
            include: {
              model: User,
              attributes: ["username"],
            },
          },
          {
            model: User,
            attributes: ["username"],
          },
        ],
      });

      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      const post = dbPostData.get({ plain: true });

      res.render("posts-comments", { post, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  
});

module.exports = router;
