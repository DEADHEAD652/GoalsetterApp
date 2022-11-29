const express = require("express");
const router = express.Router();
const Goal = require("../models/goalModal");
const auth = require("../Auth/authMiddleware");

//create goals
router.post("/goals ", auth, async (req, res) => {
  const goal = await Goal.create({
    text: req.body.text,
  });
  try {
    await goal.save();
    res.status(201).send(goal);
  } catch (e) {
    res.status(400).send(e);
  }
});

//read all
router.get("/goals", auth, async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id });
    res.status(200).json(goals);
  } catch (e) {
    res.status(500).send(e);
  }
});

//read one goal
router.get("/goal/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const goal = await Goal.findById(id);
    if (!goal) {
      res.status(404).send();
    }
    res.send(goal);
  } catch (e) {
    res.status(500).send();
  }
});

//Update goal
router.put("/goal/:id", auth, async (req, res) => {
  try {
    const goal = await Goal.findByIdAndUpdate(req.params.id, req.body);
    if (!goal) {
      res.status(404).send();
    }
    res.send(goal);
  } catch (e) {
    res.status(400).send(e);
  }
});

//delete goal
router.delete("/goal/:id", auth, async (req, res) => {
  try {
    const goal = await Goal.findByIdAndDelete(req.params.id);
    if (!goal) {
      res.status(404).send();
    }
    res.send(goal);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
