import React from "react";
import "./Footer.css";

// PUBLIC_INTERFACE
function Footer() {
  /** Footer - simple, centered, brand accent. */
  return (
    <footer className="footer">
      <div className="footer-content">
        &copy; {new Date().getFullYear()} Digital Tech Blog &mdash; Powered by React
      </div>
    </footer>
  );
}

export default Footer;
