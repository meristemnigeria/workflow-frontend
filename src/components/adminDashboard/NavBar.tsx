import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/meristem-logo.png";
import { AiOutlineUsergroupAdd } from "react-icons/Ai";
import { FiUsers } from "react-icons/Fi";
import { HiOutlineMenu, HiOutlineOfficeBuilding } from "react-icons/Hi";
import "./adminDashboard.css";
import jwt_decode from "jwt-decode";

interface DecodedToken {
  id: string;
  firstName: string;
  lastName: string;
}

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<DecodedToken | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const getInitials = (name: string): string => {
    const names = name.split(" ");
    return names.map((name) => name.charAt(0)).join("");
  };

  useEffect(() => {
    const fetchLoggedInUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token);
        if (token) {
          const decodedToken: DecodedToken = jwt_decode(token);
          console.log("Decoded Token:", decodedToken);

          setUserData(decodedToken);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchLoggedInUserData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <header className="top-bar">
        <div className="logo">
          <Link to="/admin">
            <img src={Logo} alt="Meristem" />
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <button
          className={`toggle-menu-button ${showMenu ? "active" : ""}`}
          onClick={handleToggleMenu}
        >
          <HiOutlineMenu />
        </button>
        {/* Mobile Menu */}
        <nav className={`navbar-mobile ${showMenu ? "show-menu" : ""}`}>
          <ul className="menu-mobile-main-menu">
            <li>
              <Link to="/userForm" className="link">
                Create Users
              </Link>
            </li>
            <li>
              <Link to="/users" className="link">
                Users
              </Link>
            </li>
            <li>
              <Link to="/createDepartment" className="link">
                Create Department
              </Link>
            </li>
            <li style={{ borderBottom: "none" }}>
              {userData ? userData.firstName : "Loading..."}
            </li>
            <li onClick={handleLogout} className="link">
              Logout
            </li>
          </ul>
        </nav>

        {/* Desktop Menu */}
        <div className="list-item">
          <p className="para">
            <Link to="/userForm" className="link">
              <AiOutlineUsergroupAdd />
              Create Users
            </Link>
          </p>
          <p className="para">
            <Link to="/users" className="link">
              <FiUsers />
              Users
            </Link>
          </p>
          <p className="para">
            <Link to="/createDepartment" className="link">
              <HiOutlineOfficeBuilding />
              Create Department
            </Link>
          </p>
        </div>
        <div className="nav">
          <ul className="nav-menu">
            <div className="user-initials">
              {userData
                ? getInitials(userData.firstName + " " + userData.lastName)
                : ""}
            </div>
            <li className="nav-item">
              {userData
                ? `${userData.firstName} ${userData.lastName}`
                : "Loading..."}
            </li>

            <li className="nav-item" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default NavBar;
