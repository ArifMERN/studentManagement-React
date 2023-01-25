import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import AppliedStudents from "./AppliedStudents";
import Loader from "./Loader";
const Interview = ({ user, tokenStr }) => {
  const params = useParams();
  const [interview, setInterview] = useState([]);
  const [applied, setApplied] = useState([]);
  const [update, setUpdate] = useState(false);
  const [loader, setLoader] = useState(false);

  const Id = params.id || "";

  useEffect(() => {
    const sub = () => {
      setLoader((prev) => !prev);
      if (user) {
        axios
          .get(`${process.env.REACT_APP_BASE_URL}/interview/${Id}`, {
            headers: { Authorization: `Bearer ${tokenStr}` },
          })
          .then((res) => {
            setInterview(res.data);
            setApplied(res.data.applied);
            setLoader((prev) => !prev);
          })
          .catch((e) => console.log(e));
      }
    };
    return sub();
  }, [update]);

  return (
    <main className="Interview">
      <div className="Iwrapper">
        <h1>Company name: {interview.name}</h1>

        <h3>Interview Date: {interview.interviewDate}</h3>
        <h2>Applied Students</h2>
        {loader ? (
          <Loader />
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>College</th>
                <th>Result</th>
                <th>Status</th>
              </tr>
            </thead>

            {applied.map((i) => (
              <AppliedStudents
                key={i._id}
                interview={interview}
                student={i}
                setUpdate={setUpdate}
                user={user}
                tokenStr={tokenStr}
              />
            ))}
          </table>
        )}
      </div>
    </main>
  );
};

export default Interview;
