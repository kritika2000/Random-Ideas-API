const path = require('path');
const ideas = require('../data');
const fs = require('fs/promises');
const Ideas = require('../model/Ideas');

const getAllIdeas = async (req, res) => {
  const ideas = await Ideas.find({}).exec();
  res.json({ success: true, data: ideas });
};

const getAnIdea = async (req, res) => {
  const { id } = req.params;
  // const idea = ideas.filter((idea) => idea.id === Number(id));
  const idea = await Ideas.find({ id: Number(id) }).exec();
  if (!idea.length) {
    return res
      .status(404)
      .json({ success: false, error: `Item with ID ${id} doesn't exist` });
  }
  res.status(200).json({ success: true, data: idea });
};

const createAnIdea = async (req, res) => {
  const { text, tag, username } = req.body;
  const ideas = await Ideas.find({}).exec();
  const idea = {
    id: ideas.length + 1,
    text,
    tag,
    username,
    date: new Date().toISOString().slice(0, 10),
  };
  try {
    await Ideas.create(idea);
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
  // const ideaToUpdate = ideas.find((idea) => idea.id === Number(id));
  const ideaToUpdate = await Ideas.find({ id: Number(id) }).exec();
  if (!ideaToUpdate.length)
    return res
      .status(404)
      .json({ success: false, error: `Item with ID ${id} doesn't exist` });
  try {
    await Ideas.findOneAndUpdate(
      { id: Number(id) },
      {
        text,
        tag,
        username,
      }
    ).exec();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Couldn't create new post" });
  }
  res.status(201).json({ success: true, message: 'Idea Updated Successfully' });
};

const deleteIdea = async (req, res) => {
  const { id } = req.params;
  const ideaToUpdate = await Ideas.find({ id: Number(id) }).exec();
  if (!ideaToUpdate.length)
    return res
      .status(404)
      .json({ success: false, error: `Item with ID ${id} doesn't exist` });
  try {
    await Ideas.deleteOne({ id: Number(id) }).exec();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Couldn't create new post" });
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
