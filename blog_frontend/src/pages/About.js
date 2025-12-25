import React from "react";
import "./About.css";

// PUBLIC_INTERFACE
function About() {
  /** Static about page for the blog site. */
  return (
    <main className="about-main">
      <h1 className="about-title">About Digital Tech Blog</h1>
      <section className="about-section">
        <p>
          Welcome to <span className="brand">Digital Tech Blog</span> &mdash; your source for the latest in digital technology trends, tutorials, and insights.
        </p>
        <p>
          This site is a static React-based blog showcasing modern web technologies, hot topics, and beginner guides in plain language.
        </p>
        <ul>
          <li>⚡ Clean, responsive design</li>
          <li>🚀 Focused on web & digital innovation</li>
          <li>💡 Open to all skill levels</li>
        </ul>
        <p>
          <span className="about-highlight">Enjoy browsing — and keep building!</span>
        </p>
      </section>
    </main>
  );
}

export default About;
