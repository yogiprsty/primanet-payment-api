const User = (sequelize, Sequelize) => (
  sequelize.define('user', {
    phone: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
  })
);

module.exports = User;
