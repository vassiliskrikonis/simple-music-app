import React from "react";

const Header = ({
  text = "Title",
  secondaryText = "",
  background = "https://via.placeholder.com/600x400",
}) => (
  <header
    className="Header"
    style={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }}
  >
    <h1>{text}</h1>
    {secondaryText && <h2>{secondaryText}</h2>}
  </header>
);

export default Header;
