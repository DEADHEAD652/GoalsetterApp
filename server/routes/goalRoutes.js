const express = require("express");
const router = express.Router();
const Goal = require("../models/goalModal");

//create goals
router.post("/goal", async (req, res) => {
  const goal = new Goal(req.body);
  try {
    await goal.save();
    res.status(201).send(goal);
  } catch (e) {
    res.status(400).send(e);
  }
});

//read all
router.get("/goals", async (req, res) => {
  try {
    const goal = await Goal.find({});
    res.send(goal);
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
router.put("/goal/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.params.body;
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
router.delete("/goal/:id", async (req, res) => {
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
