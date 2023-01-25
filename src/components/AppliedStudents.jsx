import React, { useEffect, useState } from "react";

import axios from "axios";

const AppliedStudents = ({ interview, student, setUpdate, tokenStr, user }) => {
  const result = [student.interviews] || [];
  const [value, setValue] = useState("");

  const handleSave = async (id, val, Iid) => {
    const data = { id, val, Iid };
    if (user) {
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/student/results`, data, {
          headers: { Authorization: `Bearer ${tokenStr}` },
        })
        .then((res) => {
          setValue(val);
        })
        .catch((e) => console.log(e));
    }
  };

  useEffect(() => {
    for (let val = 0; val < result[0].length; val++) {
      if (result[0][val].id == interview._id) {
        setValue(result[0][val].result);
        setUpdate((prev) => !prev);
      }
    }
  }, []);

  return (
    <tbody>
      <tr>
        <td>
          <h4>{student.name}</h4>
        </td>
        <td>{student.college}</td>

        {value !== "" ? (
          <td>{value}</td>
        ) : (
          <td className="buttons">
            <button
              className="apply-button"
              onClick={() => handleSave(student._id, "PASS", interview._id)}
            >
              PASS
            </button>
            <button
              className="apply-button"
              onClick={() => handleSave(student._id, "FAIL", interview._id)}
            >
              FAIL
            </button>
            <button
              className="apply-button"
              onClick={() => handleSave(student._id, "ONHOLD", interview._id)}
            >
              ONHOLD
            </button>
            <button
              className="apply-button"
              onClick={() =>
                handleSave(student._id, "NOTATTEMPTED", interview._id)
              }
            >
              NOTATTEMPTED
            </button>
          </td>
        )}
        <td>{student.status}</td>
      </tr>
    </tbody>
  );
};

export default AppliedStudents;
