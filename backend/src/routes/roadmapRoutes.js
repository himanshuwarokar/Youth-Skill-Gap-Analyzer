const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/generate", authMiddleware, async (req, res) => {
  const { targetCareer = "", preferredLearningMode = "" } = req.body;

  const roadmap = [
    // {
    //   stage: "Foundation",
    //   timeline: "Month 1-2",
    //   focus: "Core concepts and baseline tools",
    //   activities: [
        
    //   ]
    // },
    // {
    //   stage: "Applied Practice",
    //   timeline: "Month 3-4",
    //   focus: "Hands-on implementation",
    //   activities: [
        
    //   ]
    // },
    // {
    //   stage: "Career Preparation",
    //   timeline: "Month 5-6",
    //   focus: "Interview and job readiness",
    //   activities: [
        
    //   ]
    // }
  ];

  return res.json({
    message: " Roadmap generated successfully.",
    inputSummary: {
      targetCareer,
      preferredLearningMode,
    },
    roadmap,
    mlHook: "yaha ml model dalna hai.",
  });
});

module.exports = router;
