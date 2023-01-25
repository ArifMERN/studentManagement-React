import React, { useState, useEffect } from "react";
import AddInterview from "../components/AddInterview";
import InterviewList from "../components/InterviewList";
import axios from "axios";
import Loader from "../components/Loader";

const Interviews = ({ user, tokenStr }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [status, setStatus] = useState(false);
  const [response, setResponse] = useState("");
  const [interviews, setInterviews] = useState([]);
  const [newInterview, setNewInterview] = useState(false);
  const [students, setStudents] = useState([]);
  const [loader, setLoader] = useState(false);
  const [err, setErr] = useState("");
  const [iserr, setIserr] = useState(false);
  useEffect(() => {
    const sub = () => {
      setLoader((prev) => !prev);
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/interview/all`, {
          headers: { Authorization: `Bearer ${tokenStr}` },
        })
        .then((res) => {
          setInterviews(res.data);
          setLoader((prev) => !prev);
        })
        .catch((e) => {
          setErr(e.response.data.message);
          setIserr(true);
        });
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/student/all`, {
          headers: { Authorization: `Bearer ${tokenStr}` },
        })
        .then((res) => {
          setStudents(res.data);
          console.log(res.data);
        })
        .catch((e) => {
          setErr(e.response.data.message);
        });
    };

    return () => {
      if (user) {
        sub();
      }
    };
  }, [newInterview]);
  console.log(err);
  return (
    <>
      {!iserr ? (
        <main className="interviews">
          <span className="AbsoluteStatus">
            {status && <h3>{response}</h3>}
          </span>
          <div className="Iwrapper">
            <button
              onClick={() => {
                setShowAdd(true);
              }}
            >
              Add Interview
            </button>
            {showAdd && (
              <AddInterview
                setNewInterview={setNewInterview}
                setShowAdd={setShowAdd}
                user={user}
                tokenStr={tokenStr}
              />
            )}
            {loader ? (
              <Loader />
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Interview Date</th>
                    <th>List</th>
                    <th>Apply Students</th>
                  </tr>
                </thead>
                {interviews?.map((interview) => {
                  return (
                    <InterviewList
                      key={interview._id}
                      interview={interview}
                      setStatus={setStatus}
                      setNewInterview={setNewInterview}
                      setResponse={setResponse}
                      user={user}
                      students={students}
                      tokenStr={tokenStr}
                    />
                  );
                })}
              </table>
            )}
          </div>
        </main>
      ) : (
        <main>
          <h1 style={{ textAlign: "center" }}>{err}</h1>
        </main>
      )}
    </>
  );
};

export default Interviews;
