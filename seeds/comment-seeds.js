const { Comment } = require('../models');

const commentData = [{
        comment_text: "Thanks for the information.",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "That's exactly what I was looking for!",
        user_id: 1,
        post_id: 2
    },
    {
        comment_text: "Great, thanks for sharing!",
        user_id: 2,
        post_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;