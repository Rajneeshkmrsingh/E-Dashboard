import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    navigate("/signup");
    return localStorage.clear();
  };
  return (
    <>
      <nav className="nav">
          <div className="logo">
              E-<span>Dash</span>
          </div>
        {auth ? (
          <>
            <ul className="nav-ul">
              <li>
                <NavLink to="/">Product</NavLink>
              </li>
              <li>
                <NavLink to="/add">Add Product</NavLink>
              </li>
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <li>
                <NavLink onClick={logout} to="/signup">
                  Logout ({JSON.parse(auth).name})
                </NavLink>
              </li>
            </ul>
          </>
        ) : (
          <>
            <ul className="nav-ul nav-right">
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/signup">SignUp</NavLink>
              </li>
            </ul>
          </>
        )}
        {/* {auth?<li><NavLink onClick={logout} to = "/signup">Logout</NavLink></li>:<><li><NavLink to = "/login">Login</NavLink></li> 
                    <li><NavLink to = "/signup">SignUp</NavLink></li></>} */}
      </nav>
    </>
  );
};

export default Header;
