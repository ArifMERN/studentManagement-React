import React from "react";
import { Link } from "react-router-dom";

const Home = ({ user, empName }) => {
  return (
    <main className="Home">
      <h1>Welcome to Coding Ninjas</h1>
      {!user ? (
        <>
          <button>
            <Link to="/emp/signin">signin</Link>
          </button>
          <button>
            <Link to="/emp/signup">signin</Link>
          </button>
        </>
      ) : (
        <h2>{empName}</h2>
      )}
    </main>
  );
};

export default Home;
