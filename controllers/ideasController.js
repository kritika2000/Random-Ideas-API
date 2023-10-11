const path = require('path');
const ideas = require('../data');
const fs = require('fs/promises');

const getAllIdeas = (req, res) => {
  res.json({ success: true, data: ideas });
};

const getAnIdea = (req, res) => {
  const { id } = req.params;
  const idea = ideas.filter((idea) => idea.id === Number(id));
  if (!idea.length) {
    return res
      .status(404)
      .json({ success: false, error: `Item with ID ${id} doesn't exist` });
  }
  res.json({ success: true, data: idea });
};

const createAnIdea = async (req, res) => {
  const { text, tag, username } = req.body;
  const idea = {
    id: ideas.length + 1,
    text,
    tag,
    username,
    date: new Date().toISOString().slice(0, 10),
  };
  try {
    await fs.writeFile(
      path.resolve(__dirname, '..', 'data.json'),
      JSON.stringify([...ideas, idea])
    );
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Couldn't create new post" });
  }
  res.status(201).json({ success: true, message: 'New idea created' });
};

const updateIdea = async (req, res) => {
  const { text, tag, username } = req.body;
  const { id } = req.params;
  console.log(req.body);
  const ideaToUpdate = ideas.find((idea) => idea.id === Number(id));
  if (!ideaToUpdate)
    return res
      .status(404)
      .json({ success: false, error: `Item with ID ${id} doesn't exist` });
  const updatedIdeas = ideas.map((idea) => {
    return idea.id !== Number(id)
      ? idea
      : {
          id: ideaToUpdate.id,
          text,
          tag,
          username,
          data: ideaToUpdate.date,
        };
  });
  try {
    await fs.writeFile(
      path.resolve(__dirname, '..', 'data.json'),
      JSON.stringify(updatedIdeas)
    );
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Couldn't update post" });
  }
  res.status(201).json({ success: true, message: 'Idea Updated Successfully' });
};

const deleteIdea = async (req, res) => {
  const { id } = req.params;
  const ideaToUpdate = ideas.find((idea) => idea.id === Number(id));
  if (!ideaToUpdate)
    return res
      .status(404)
      .json({ success: false, error: `Item with ID ${id} doesn't exist` });
  try {
    await fs.writeFile(
      path.resolve(__dirname, '..', 'data.json'),
      JSON.stringify([...ideas.filter((idea) => idea.id !== Number(id))])
    );
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Couldn't delete idea" });
  }
  res.status(204).json({ success: true, message: 'Idea Deleted Successfully' });
};

module.exports = {
  getAllIdeas,
  getAnIdea,
  createAnIdea,
  updateIdea,
  deleteIdea,
};
