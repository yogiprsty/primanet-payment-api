const User = (sequelize, Sequelize) => (
  sequelize.define('user', {
    phone: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
    },
  })
);

module.exports = User;
