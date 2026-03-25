require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(
  cors({
    origin(origin, callback) {
      const isLocalhost = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin || "");
      const isAllowedClientUrl = !!process.env.CLIENT_URL && origin === process.env.CLIENT_URL;

      if (!origin || isLocalhost || isAllowedClientUrl) {
        callback(null, true);
        return;
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Youth Skill Gap Analyzer API" });
});

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/roadmap", roadmapRoutes);

app.use((err, req, res, next) => {
  if (err && err.message === "Not allowed by CORS") {
    return res.status(403).json({ message: "CORS blocked this origin. Use localhost/127.0.0.1 or update CLIENT_URL." });
  }
  return next(err);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
