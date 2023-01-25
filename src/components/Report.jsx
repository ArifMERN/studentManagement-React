import React, { useEffect, useState, useRef } from "react";
import { CSVLink } from "react-csv";
import axios from "axios";

const Report = ({ tokenStr, user }) => {
  const [data, setData] = useState([]);
  const [err, setErr] = useState("");
  const [iserr, setIserr] = useState(false);

  const sub = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/student/report`, {
        headers: { Authorization: `Bearer ${tokenStr}` },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => {
        setErr(e.response.data.message);
        setIserr(true);
      });
  };
  const headers = [
    {
      label: "id",
      key: "_id",
    },
    {
      label: "Batch",
      key: "batch",
    },
    {
      label: "Name",
      key: "name",
    },
    {
      label: "College",
      key: "college",
    },
    {
      label: "Status",
      key: "status",
    },
    {
      label: "DSA final Score",
      key: "dsaScore",
    },
    {
      label: "WebD final Score",
      key: "webdScore",
    },
    {
      label: "React final Score",
      key: "reactScore",
    },
    {
      label: "interview Company",
      key: "company",
    },
    {
      label: "interview Results",
      key: "Result",
    },
  ];
  const csvlink = {
    filename: "file.csv",
    headers: headers,
    data: data,
  };
  useEffect(() => {
    if (user) sub();
  }, []);

  return (
    <>
      {iserr ? (
        <main>
          <h1 style={{ textAlign: "center" }}>{err}</h1>
        </main>
      ) : (
        <main className="Home">
          <button>
            <CSVLink {...csvlink}>Try me to get error</CSVLink>
          </button>
        </main>
      )}
    </>
  );
};

export default Report;
