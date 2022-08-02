module.exports = (sequelize, Sequelize) => {
  const Payment = sequelize.define('payments', {
    payment_id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    paid: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });
  return Payment;
};
