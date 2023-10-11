const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const ideas = require('./data');
const ideasRouter = require('./routes/ideas');

app.use(express.json());

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to the RandomIdeas API' });
});

// Idea Routes
app.use('/api/ideas', ideasRouter);

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
