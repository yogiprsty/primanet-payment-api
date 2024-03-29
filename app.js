const express = require('express');
const apiRouter = require('./app/routes/api.routes');
const { sequelize } = require('./app/models');

const app = express();
const port = 8001;

// Database Association

app.get('/', (req, res) => {
  res.send('Hello There');
});

app.use(apiRouter);

sequelize.sync()
  .then(() => {
    console.log('Synced db.');
  })
  .catch((err) => {
    console.log(`Failed to sync db: ${err.message}`);
  });

app.listen(port, () => {
  console.log(`This server is running on http://localhost:${port}`);
});
