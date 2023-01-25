import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import svg from "../assets/sign-up-form.svg";
const Signup = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const [response, setResponse] = useState("");
  // const ref = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target[3].value !== e.target[2].value) {
      setStatus(true);
      setResponse("Pasword and confirm password Not match! ");
    } else {
      const data = {
        name: e.target[0].value,
        email: e.target[1].value,
        password: e.target[2].value,
      };

      axios
        .post(`${process.env.REACT_APP_BASE_URL}/emp/signup`, data)
        .then((res) => {
          navigate("/emp/signin");
        })
        .catch(function (error) {
          setStatus(true);
          setResponse(error.message);
          setInterval(() => {
            setStatus(false);
            setResponse("");
          }, 1000);
        });
    }
  };
  // useEffect(() => {}, []);
  return (
    <section>
      <div className="card">
        <span className="status">{status ? <h3>{response}</h3> : ""}</span>
        <div className="cardWrapper">
          <img src={svg} alt="sign-up" className="image" />
          <form className="input-group" onSubmit={(e) => handleSubmit(e)}>
            <label className="label">Name</label>
            <input type="text" className="input" />
            <label className="label">Email address</label>
            <input name="Email" className="input" type="email" />
            <label className="label">Password</label>
            <input type="password" className="input" />
            <label className="label">Confirm password</label>
            <input type="text" className="input" />
            <br />
            <input
              type="submit"
              value="signup"
              className="button"
              style={{ marginBottom: "10px" }}
            />
            <p>
              <span style={{ color: "gray" }}> Don't have account? Try</span>
              <Link
                to="/emp/signin"
                style={{
                  textDecoration: "underline",
                  marginLeft: "3px",
                }}
              >
                SignIN
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
