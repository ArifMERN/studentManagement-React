import React from "react";
import axios from "axios";
const Addstudent = (props) => {
  const handleAddStudent = async (e) => {
    e.preventDefault();
    const temp = {
      name: e.target[0].value,
      college: e.target[1].value,
      dsaScore: e.target[2].value,
      webdScore: e.target[3].value,
      reactScore: e.target[4].value,
      batch: e.target[5].value,
    };

    if (props.user) {
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/student/create`, temp, {
          headers: { Authorization: `Bearer ${props.tokenStr}` },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((e) => console.log(e));

      props.setAddStudent((prev) => !prev);
      props.setShowAdd((prev) => !prev);
    }
  };
  return (
    <div className="Iform">
      <div className="input-wrapper">
        <button
          className="close-button"
          onClick={() => {
            props.setShowAdd(false);
          }}
        >
          X
        </button>
        <form className="input-group input-group2" onSubmit={handleAddStudent}>
          <label className="label">Name</label>
          <input type="text" className="input" required />
          <label className="label">College</label>
          <input name="college" className="input" required type="text" />
          <div className="scores">
            <div className="score">
              <label className="label">dsaScore</label>
              <input name="dsa" className="input " required type="number" />
            </div>
            <div className="score">
              <label className="label">webdScore</label>
              <input name="web" className="input " required type="number" />
            </div>
            <div className="score">
              <label className="label">reactScore</label>
              <input name="react" className="input " required type="number" />
            </div>
          </div>
          <label className="label">Batch</label>
          <input name="react" className="input" required type="text" />

          <br />
          <input type="submit" value="Add Student" className="button" />
        </form>
      </div>
    </div>
  );
};

export default Addstudent;
