const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    educationLevel: {
      type: String,
      default: "",
    },
    currentSkills: {
      type: [String],
      default: [],
    },
    targetCareer: {
      type: String,
      default: "",
    },
    preferredLearningMode: {
      type: String,
      enum: ["Online", "Offline", "Hybrid", ""],
      default: "",
    },
  },
  { timestamps: true }
);

profileSchema.index({ user: 1 }, { unique: true });

module.exports = mongoose.model("Profile", profileSchema);
