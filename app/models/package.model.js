module.exports = (sequelize, Sequelize) => {
  const Package = sequelize.define('packages', {
    name: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.INTEGER,
    },
  });
  return Package;
};
