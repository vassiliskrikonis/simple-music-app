import React from "react";
import { Link } from "@reach/router";

const Header = ({ text = "Title", secondaryText = "", background }) => (
  <Link to="/">
    <header
      className={`Header bg-cover bg-center p-24 ${
        background ? "" : "gradient-Monte-Carlo-TB"
      }`}
      style={background && { backgroundImage: `url(${background})` }}
    >
      <h1 className="text-5xl">{text}</h1>
      {secondaryText && <h2 className="text-xl">{secondaryText}</h2>}
    </header>
  </Link>
);

export default Header;
