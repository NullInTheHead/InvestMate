import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2025 InvestMate. All rights reserved.</p>
        <div className="footer-links">
          <a href="/support">Support</a>
          <a href="/privacy">Privacy</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
