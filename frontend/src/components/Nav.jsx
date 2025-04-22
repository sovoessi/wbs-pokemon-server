// components/Nav.jsx
import { NavLink } from "react-router-dom";
import { FiLogIn, FiUserPlus } from "react-icons/fi";
import { TbSword } from "react-icons/tb";
import { HiHome } from "react-icons/hi";
import { MdOutlineCollections } from "react-icons/md";
import { useAuth } from '../context/AuthContext';

// import Themes from "./Themes"; // Make sure this exists or comment it out

const Nav = () => {
  const activeLink = ({ isActive }) =>
    `px-10 py-2 rounded ${
      isActive ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
    }`;
  const { token, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center gap-2 px-4 navbar bg-white ">
      <div className="logo">
        <img
          src="https://loodibee.com/wp-content/uploads/International-Pokemon-logo.png"
          alt="Logo"
          className="w-30 h-30 "
        />
      </div>
      <div className="pages flex gap-5">
        <div className="navbar-start">
          <NavLink to="/" className={activeLink}>
            <HiHome className="text-xl text-gray-700 inline-block mr-2" />
            Home
          </NavLink>
        </div>
        </div>
        {token ? (
          <>
          <div className="navbar-center lg:flex">
            <ul className="px-1 menu menu-horizontal">
              <li>
                <NavLink to="/battle" className={activeLink}>
                  <TbSword className="text-gray-700 text-2xl inline-block mr-2" />
                  Battle
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="navbar-center lg:flex">
            <ul className="px-1 menu menu-horizontal">
              <li>
                <NavLink to="/card" className={activeLink}>
                  <MdOutlineCollections className="text-xl text-gray-700 inline-block mr-2" />
                  Cards
                </NavLink>
              </li>
            </ul>
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={logout}>Logout</button>
          </>

        ) : (
          <>
            <div className="forms flex gap-5">
              <NavLink
                to="/login"
                className="px-10 py-2 rounded text-violet-700 bg-gray-200 font-bold"
              >
                <FiLogIn className="inline-block mr-2" />
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="px-8 py-2 rounded text-gray-200 bg-violet-700 font-bold"
              >
                <FiUserPlus className="inline-block mr-2" />
                Register
              </NavLink>
            </div>
          </>
        )}
    </nav>
  );
};

export default Nav;
