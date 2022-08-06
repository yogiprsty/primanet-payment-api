module.exports = (sequelize, Sequelize) => {
  const PasswordReset = sequelize.define('password_resets', {
    token: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return PasswordReset;
};
