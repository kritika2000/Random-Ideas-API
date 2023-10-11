const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const ideas = require('./data');
const ideasRouter = require('./routes/ideas');
const connect = require('./db/dbConnection');
const { config } = require('dotenv');
require('dotenv').config();
app.use(express.json());

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to the RandomIdeas API' });
});

// Idea Routes
app.use('/api/ideas', ideasRouter);
(async () => {
  try {
    await connect();
    app.listen(PORT, () => {
      console.log(`Server started listening at PORT ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
})();
