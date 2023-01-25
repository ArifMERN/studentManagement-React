import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, setTokenStr, setUser, empName }) => {
  const handleSignout = () => {
    localStorage.removeItem("token");
    localStorage.setItem("token", JSON.stringify({ login: false, token: "" }));
    setTokenStr("");
    setUser(false);
  };
  return (
    <nav>
      <Link to="/">
        <h3>Coding Ninjas.</h3>
      </Link>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/interview/all">Interviews</Link>
        </li>
        <li>
          <Link to="/student/all">Students</Link>
        </li>
        <li>
          <Link to="/report">Generate Report</Link>
        </li>
        {!user ? (
          <>
            <li>
              <Link to="/emp/signup">SignUp</Link>
            </li>
            <li>
              <Link to="/emp/signin">SignIn</Link>
            </li>
          </>
        ) : (
          <li onClick={handleSignout}>
            <Link to="/emp/signin">Sign Out</Link>
            <h3>{empName}</h3>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
