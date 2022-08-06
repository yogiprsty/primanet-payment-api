const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');
const User = require('./user.model');
const Package = require('./package.model');
const Payment = require('./payment.model');
const PasswordReset = require('./password-reset.model');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {
  sequelize,
  User: User(sequelize, Sequelize),
  Package: Package(sequelize, Sequelize),
  Payment: Payment(sequelize, Sequelize),
  PasswordReset: PasswordReset(sequelize, Sequelize),
};

// Define Association
db.User.belongsTo(db.Package);
db.Package.hasMany(db.User);

db.User.hasMany(db.Payment);
db.Payment.belongsTo(db.User);

db.PasswordReset.belongsTo(db.User);

module.exports = db;
