const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const ideas = [
  {
    id: 1,
    text: 'Positive NewsLetter, a newsletter that only shares positive, uplifting news',
    tag: 'Technology',
    username: 'TonyStark',
    date: '2022-01-02',
  },
  {
    id: 2,
    text: 'Milk cartons that turn a different color the older that your milk is getting',
    tag: 'Inventions',
    username: 'SteveRogers',
    date: '2022-01-02',
  },
  {
    id: 3,
    text: 'ATM location app which lets you know where the closest ATM is and if it is in service',
    tag: 'Software',
    username: 'BruceBanner',
    date: '2022-01-02',
  },
];

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to the RandomIdeas API' });
});

// Get All Ideas
app.get('/api/ideas', (req, res) => {
  res.json({ success: true, data: ideas });
});

// Get an idea
app.get('/api/ideas/:id', (req, res) => {
  const { id } = req.params;
  const idea = ideas.filter((idea) => idea.id === Number(id));
  if (!idea.length) {
    return res
      .status(404)
      .json({ success: false, error: `Item with ID ${id} doesn't exist` });
  }
  res.json({ success: true, data: idea });
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
