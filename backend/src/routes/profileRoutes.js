const express = require("express");
const Profile = require("../models/Profile");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    return res.json(profile || null);
  } catch (error) {
    return res.status(500).json({ message: "Unable to fetch profile" });
  }
});

router.post("/me", authMiddleware, async (req, res) => {
  try {
    const { educationLevel, currentSkills, targetCareer, preferredLearningMode } = req.body;

    const payload = {
      user: req.user.id,
      educationLevel: educationLevel || "",
      currentSkills: Array.isArray(currentSkills)
        ? currentSkills.map((s) => s.trim()).filter(Boolean)
        : [],
      targetCareer: targetCareer || "",
      preferredLearningMode: preferredLearningMode || "",
    };

    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      payload,
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.json({ message: "Profile saved", profile });
  } catch (error) {
    return res.status(500).json({ message: "Unable to save profile" });
  }
});

module.exports = router;
