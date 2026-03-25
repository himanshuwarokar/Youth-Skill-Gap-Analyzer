import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TopNavbar from "../components/TopNavbar";

const keyBenefits = [
  "Students can map current skills against a target job role",
  "Personal profile captures education level and preferred learning mode",
  "Roadmap template gives clear monthly milestones",
  "Platform is ready for your custom ML model integration"
];

const jobRoles = [
  "Frontend Developer",
  "Backend Developer",
  "Data Analyst",
  "UI/UX Designer",
  "Cloud Engineer",
  "Cybersecurity Analyst"
];

const howItWorks = [
  "Create account and login securely",
  "Add current skills and choose target job role",
  "Generate your role-specific roadmap template",
  "Track preparation and update profile as you improve"
];

const userEnters = [
  "Current education",
  "Skills",
  "Experience",
  "Certifications",
  "Target job role (e.g., Frontend Developer, Data Scientist, DevOps Engineer)"
];

const systemProvides = [
  "Suitability percentage",
  "Missing skills",
  "Recommended learning path",
  "Step-by-step roadmap",
  "Estimated time to achieve"
];

export default function HomePage() {
  const [theme, setTheme] = useState(() => localStorage.getItem("ysg_theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("ysg_theme", theme);
  }, [theme]);

  return (
    <div className="page home-page">
      <TopNavbar
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
      />

      <header className="hero">
        <div className="hero-topbar">
          <div className="hero-actions top-right-actions">
            <Link to="/login" className="btn btn-primary">Get Started</Link>
          </div>
        </div>

        <div className="hero-content">
          <div>
            <p className="badge">Built For Students</p>
            <h1>Find your roadmap for your dream job role</h1>
            <p>
              This platform helps students identify what to learn next for a specific career role.
              You can save your profile, set your target role, and get a structured learning roadmap.
              Skill-gap ML scoring is intentionally left open so your custom model can be integrated.
            </p>
            <div className="mini-highlights">
              {jobRoles.slice(0, 4).map((role) => (
                <span key={role}>{role}</span>
              ))}
            </div>
          </div>

          <aside className="hero-panel">
            <h3>Outcome You Get</h3>
            <ul>
              <li>Step-by-step roadmap by timeline</li>
              <li>Career-focused learning direction</li>
              <li>Saved profile for continuous updates</li>
              <li>Ready backend hook for ML output</li>
            </ul>
          </aside>
        </div>
      </header>

      <section className="card-grid home-grid">
        <article className="card">
          <h2>Why Students Use This</h2>
          <ul>
            {keyBenefits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="card">
          <h2>How The Journey Works</h2>
          <ol>
            {howItWorks.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </article>

        <article className="card">
          <h2>Popular Job Roles</h2>
          <div className="role-list">
            {jobRoles.map((role) => (
              <span key={role}>{role}</span>
            ))}
          </div>
          <p className="muted">
            You can choose any job role in your dashboard and generate a roadmap template for that goal.
          </p>
        </article>

        <article className="card">
          <h2>What You Enter & What You Get</h2>
          <p className="muted"><strong>User enters:</strong></p>
          <ul>
            {userEnters.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="muted"><strong>System provides:</strong></p>
          <ul>
            {systemProvides.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}

