import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-black text-gray-400 flex flex-row gap-4 justify-evenly py-4">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-4 py-2 rounded-md transition duration-300 ${
            isActive ? "text-pink-300" : "hover:text-pink-300"
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/pastes"
        className={({ isActive }) =>
          `px-4 py-2 rounded-md transition duration-300 ${
            isActive ? "text-pink-300" : "hover:text-pink-300"
          }`
        }
      >
        Pastes
      </NavLink>
    </div>
  );
};

export default Navbar;
