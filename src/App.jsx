import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import SignIn from "./pages/SignIn";
import Navbar from "./components/Navbar";
import Interview from "./components/Interview";
import Interviews from "./pages/Interviews";
import Students from "./pages/Students";
import axios from "axios";
import Report from "./components/Report";
const App = () => {
  const [user, setUser] = useState(false); //change here
  const [tokenStr, setTokenStr] = useState("");
  const [empName, setEmpName] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("token"));

    if (data?.login) {
      console.log("i o");
      setUser((prev) => !prev);
      setTokenStr(data.token);
      setEmpName(data.name);
    }
  }, [tokenStr]);
  const ProtectedRoute = ({ children }) => {
    console.log(user);
    if (user) {
      return children;
    } else {
      return <Navigate to="/emp/signin" />;
    }
    // return children;
  };

  return (
    <div>
      <Router>
        <Navbar
          user={user}
          empName={empName}
          setTokenStr={setTokenStr}
          setUser={setUser}
        />
        <Routes>
          <Route
            path="/"
            index
            exact
            element={<Home user={user} empName={empName} />}
          ></Route>
          <Route path="/emp/signup" element={<Signup />} />
          <Route
            path="/emp/signin"
            element={
              <SignIn
                setUser={setUser}
                setTokenStr={setTokenStr}
                setEmpName={setEmpName}
              />
            }
          />
          <Route
            path="/student/all"
            element={
              <ProtectedRoute>
                <Students user={user} tokenStr={tokenStr} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/interview/all"
            element={
              <ProtectedRoute>
                <Interviews user={user} tokenStr={tokenStr} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/interview/:id"
            element={
              <ProtectedRoute>
                <Interview user={user} tokenStr={tokenStr} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report"
            element={
              <ProtectedRoute>
                <Report user={user} tokenStr={tokenStr} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
