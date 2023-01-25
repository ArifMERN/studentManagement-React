import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const InterviewList = ({
  interview,
  setStatus,
  setNewInterview,
  setResponse,
  students,
  user,
  tokenStr,
}) => {
  const selectorRef = useRef(null);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  // const [filteredStudents, setFilteredStudents] = useState(students)

  const handleSelectStudent = async (Iid, Sid) => {
    const data = { interviewId: Iid, studentId: Sid };
    if (user) {
      setLoader((prev) => !prev);
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/interview/add_student`, data, {
          headers: { Authorization: `Bearer ${tokenStr}` },
        })
        .then((res) => {
          setStatus(true);
          setNewInterview((prev) => !prev);
          setResponse(res.data.message);
          setInterval(() => {
            setStatus(false);
          }, 3000);
          setLoader((prev) => !prev);

          setNewInterview(false);
        })
        .catch((e) => {
          setStatus(true);
          setResponse(e.response.data.message);
          setInterval(() => {
            setStatus(false);
          }, 3000);
        });
    }
  };
  return (
    <tbody>
      <tr>
        <td
          onClick={() => navigate(`/interview/${interview._id}`)}
          style={{ cursor: "pointer" }}
        >
          <h4>{interview.name}</h4>
        </td>
        <td>{interview?.interviewDate}</td>
        <td>
          <select ref={selectorRef}>
            <option value="none">none</option>
            {students.map((student) => {
              return (
                <option value={student._id} key={student._id}>
                  {student.name}
                </option>
              );
            })}
          </select>
        </td>

        <td>
          <button
            className="apply-button"
            onClick={() => {
              handleSelectStudent(interview._id, selectorRef.current.value);
            }}
          >
            Apply Student
          </button>
        </td>
      </tr>
    </tbody>
  );
};

export default InterviewList;
