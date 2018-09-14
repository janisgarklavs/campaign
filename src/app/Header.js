import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => (
  <div className="py-4 font-sans bg-blue">
    <div className="container mx-auto flex justify-center">
      <NavLink to="/" className="no-underline text-white text-lg font-bold">
        Nanos - Campaigns
      </NavLink>
    </div>
  </div>
);

export default Header;
