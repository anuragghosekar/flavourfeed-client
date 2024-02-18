import React from 'react';
import '../../Style/FooterComponents/PrivacyPolicy.css';

export default function PrivacyPolicy() {
  return (
    <div className="privacy-policy">
      <h2>Privacy Policy</h2>
      <p>Welcome to RecipeShare! This Privacy Policy describes how we collect, use, and disclose information when you use our platform.</p>
      <h3>Information We Collect</h3>
      <ul>
        <li>Personal Information: such as your name, email address, and profile picture.</li>
        <li>Usage Information: such as your IP address, browser type, and device information.</li>
        <li>Content: such as recipes, comments, and other user-generated content.</li>
      </ul>
      <h3>How We Use Your Information</h3>
      <ul>
        <li>Providing and improving our platform</li>
        <li>Communicating with you</li>
        <li>Personalizing your experience</li>
        <li>Analyzing usage trends</li>
      </ul>
      <h3>Your Choices</h3>
      <p>You may access, update, or delete your account information at any time.</p>
      <p>If you have any questions or concerns, please contact us at info@flavourfeed.com</p>
    </div>
  );
}