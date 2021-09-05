const { User } = require("../models");

const userData = [
  {
    username: "Xandromus",
    password: "09876543",
  },
  {
    username: "Lernantino",
    password: "98765432",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
