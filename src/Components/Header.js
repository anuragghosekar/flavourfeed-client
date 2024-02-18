import React from 'react';
import '../Style/Components/Header.css';

export default function Header() {
  return (
    <>
    <header className="header">
        <div className="header__title" id="parallax">
          <h1>
            To live a {/* <!-- Green highlight effect --> */}&nbsp;
            <span className="highlight">full life, </span>
            <br />
            you have to fill&nbsp;
            <br />
            <span className="highlight">your stomach</span>
            &nbsp;first.
          </h1>
          <img
            src="\Images\cooking-at-home.gif"
            className="header__img"
            alt="header img"
          />
        </div>
      </header>

    </>
  );
}