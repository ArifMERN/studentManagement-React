import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import svg from "../assets/signing-terms-of-services.svg";
const SignIn = ({ setTokenStr, setEmpName }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: e.target[0].value,
      password: e.target[1].value,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/emp/signin`, data)
      .then((res) => {
        localStorage.setItem(
          "token",
          JSON.stringify({
            login: true,
            token: res.data.Token,
            name: res.data.name,
          })
        );
        setTokenStr(JSON.parse(localStorage.getItem("token")).token);
        setEmpName(JSON.parse(localStorage.getItem("token")).name);
        navigate("/");
      })
      .catch(function (error) {
        setInterval(() => {
          setStatus(true);
          setResponse(error.response.data.message);
        }, 1000);
        setStatus(false);
      });
  };
  return (
    <section>
      <span>{status ? <h3>{response}</h3> : ""}</span>
      <div className="card">
        <div className="cardWrapper">
          <form onSubmit={(e) => handleSubmit(e)} className="input-group">
            <label className="label">Email address</label>
            <input name="Email" className="input" type="email" />
            <label className="label">Password</label>
            <input type="password" className="input" />
            <br />
            <input
              type="submit"
              value="SignIn"
              className="button"
              style={{ marginBottom: "10px" }}
            />
            <p>
              <span style={{ color: "gray" }}> Don't have account? Try</span>
              <Link
                to="/emp/signup"
                style={{
                  textDecoration: "underline",
                  marginLeft: "3px",
                }}
              >
                SignUP
              </Link>
            </p>
          </form>
          <img src={svg} alt="sign-in" className="image-signIN" />
        </div>
      </div>
    </section>
  );
};

export default SignIn;
