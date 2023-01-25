import React from "react";
import axios from "axios";
const addInterview = (props) => {
  const handleAddInterview = async (e) => {
    e.preventDefault();
    const data = {
      name: e.target[0].value,
      date: e.target[1].value,
    };
    if (props.user) {
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/interview/create`, data, {
          headers: { Authorization: `Bearer ${props.tokenStr}` },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((e) => console.log(e));

      props.setNewInterview((prev) => !prev);
      props.setShowAdd(false);
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
        <form
          className="input-group input-group2"
          onSubmit={handleAddInterview}
        >
          <label className="label">Name</label>
          <input type="text" className="input" required />
          <label className="label">Date</label>
          <input name="Email" className="input" type="date" required />

          <br />
          <input type="submit" value="Add Interview" className="button" />
        </form>
      </div>
    </div>
  );
};

export default addInterview;
