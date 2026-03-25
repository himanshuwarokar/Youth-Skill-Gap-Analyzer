import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";
import TopNavbar from "../components/TopNavbar";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState({
    educationLevel: "",
    currentSkills: "",
    targetCareer: "",
    preferredLearningMode: "",
  });
  const [message, setMessage] = useState("");
  const [roadmap, setRoadmap] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem("ysg_theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("ysg_theme", theme);
  }, [theme]);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await api.request("/profile/me");
        if (data) {
          setProfile({
            educationLevel: data.educationLevel || "",
            currentSkills: (data.currentSkills || []).join(", "),
            targetCareer: data.targetCareer || "",
            preferredLearningMode: data.preferredLearningMode || "",
          });
        }
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfile = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const payload = {
        ...profile,
        currentSkills: profile.currentSkills.split(",").map((s) => s.trim()).filter(Boolean),
      };

      await api.request("/profile/me", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setMessage("Profile saved successfully.");
    } catch (err) {
      setMessage(err.message);
    }
  };

  const generateRoadmap = async () => {
    setMessage("");

    try {
      const data = await api.request("/roadmap/generate", {
        method: "POST",
        body: JSON.stringify({
          targetCareer: profile.targetCareer,
          preferredLearningMode: profile.preferredLearningMode,
        }),
      });

      setRoadmap(data);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="page dashboard-page">
      <TopNavbar
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
      />

      <div className="dashboard-header card">
        <div>
          <h1>Welcome, {user?.name}</h1>
          <p className="muted">Fill in your profile and generate a roadmap for your target job role.</p>
        </div>
        <button
          className="btn btn-secondary"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>

      <form className="card profile-form" onSubmit={saveProfile}>
        <h2>User Profile</h2>

        <label>
          Education Level
          <input name="educationLevel" value={profile.educationLevel} onChange={handleChange} />
        </label>

        <label>
          Current Skills (comma separated)
          <input name="currentSkills" value={profile.currentSkills} onChange={handleChange} />
        </label>

        <label>
          Target Job Role
          <input name="targetCareer" value={profile.targetCareer} onChange={handleChange} />
        </label>

        <label>
          Preferred Learning Mode
          <select name="preferredLearningMode" value={profile.preferredLearningMode} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </label>

        <div className="form-actions">
          <button className="btn btn-primary" type="submit">Save Profile</button>
          <button className="btn btn-secondary" type="button" onClick={generateRoadmap}>
            Generate Roadmap Template
          </button>
        </div>

        {message && <p className="info">{message}</p>}
      </form>

      {roadmap && (
        <section className="card roadmap-box">
          <h2>Roadmap Output</h2>
          <p className="muted">{roadmap.message}</p>
          <p className="muted">{roadmap.mlHook}</p>

          {roadmap.roadmap?.map((stage) => (
            <article key={stage.stage} className="roadmap-stage">
              <h3>{stage.stage}</h3>
              <p>{stage.timeline} | {stage.focus}</p>
              <ul>
                {stage.activities.map((activity) => (
                  <li key={activity}>{activity}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
