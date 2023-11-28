import React from "react";
import backgroundImage from "../assets/room-9.jpeg";

export default function Hero({ children, hero }) {
  const classes = hero ? `hero ${hero}` : "hero";

  return (
    <header
      className={classes}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "43vh"
      }}
    >
      {children}
    </header>
  );
}

Hero.defaultProps = {
  hero: null
};