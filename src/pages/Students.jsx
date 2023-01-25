import React, { useState, useEffect } from "react";
import axios from "axios";
import Addstudent from "../components/AddStudent";
import Loader from "../components/Loader";
const Students = ({ user, tokenStr }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [students, setStudents] = useState([]);
  const [addStudent, setAddStudent] = useState(false);
  const [loader, setLoader] = useState(false);
  const [err, setErr] = useState("");
  const [iserr, setIserr] = useState(false);
  useEffect(() => {
    const sub = () => {
      setLoader((prev) => !prev);
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/student/all`, {
          headers: { Authorization: `Bearer ${tokenStr}` },
        })
        .then((res) => {
          setStudents(res.data);
          setLoader((prev) => !prev);
        })
        .catch((e) => {
          setErr(e.response.data.message);
          setIserr(true);
        });
    };

    return () => {
      if (user) {
        sub();
      }
    };
  }, [addStudent]);

  return (
    <>
      {iserr ? (
        <main>
          <h1 style={{ textAlign: "center" }}>{err}</h1>
        </main>
      ) : (
        <main className="students">
          <div className="Iwrapper">
            <button
              onClick={() => {
                setShowAdd(true);
              }}
            >
              Add Student
            </button>
            {showAdd ? (
              <Addstudent
                setShowAdd={setShowAdd}
                setAddStudent={setAddStudent}
                tokenStr={tokenStr}
                user={user}
              />
            ) : (
              ""
            )}
            {loader ? (
              <Loader />
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Batch</th>
                    <th>Name</th>
                    <th>College</th>
                    <th>Status</th>
                    <th>DSA Score</th>
                    <th>WEBD Score</th>
                    <th>REACT Score</th>
                    <th>Applied Jobs</th>
                  </tr>
                </thead>

                {students?.map((student) => {
                  return (
                    <tbody key={student._id}>
                      <tr>
                        <td>{student.batch}</td>
                        <td>{student.name}</td>
                        <td>{student.college}</td>
                        <td>{student.status}</td>
                        <td>{student.dsaScore}</td>
                        <td>{student?.webdScore}</td>
                        <td>{student?.reactScore}</td>
                        <td>{student?.interviews.length}</td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            )}
          </div>
        </main>
      )}
    </>
  );
};

export default Students;
