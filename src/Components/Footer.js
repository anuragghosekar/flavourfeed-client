import React from 'react';
import { Link } from 'react-router-dom';
import '../Style/Components/Footer.css';

export default function Footer() {
  return (
    <div>
      <h4 className="footer">
        &copy; Copyrights reserved | 
        <Link to="/aboutus"> About Us</Link> | 
        <Link to="/contactus"> Contact Us</Link> | 
        <Link to="/privacypolicy"> Privacy Policy</Link> | 
        <Link to="/termsofuse"> Terms of Use</Link>
      </h4>
    </div>
  );
}