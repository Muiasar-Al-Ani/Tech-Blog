const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
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
    res.render("dashboard", { posts, loggedIn: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/edit/:id", withAuth, (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    try {
      const dbPostData = await Post.findOne({
        where: {
          id: req.params.id,
        },
        attributes: ["id", "title", "content", "created_at"],
        include: [
          {
            model: User,
            attributes: ["username"],
          },
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
        ],
      });

      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }

      const post = dbPostData.get({ plain: true });
      res.render("edit-post", { post, loggedIn: true });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

router.get("/new", (req, res) => {
  res.render("new-post");
});

module.exports = router;
