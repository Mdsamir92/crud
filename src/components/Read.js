import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Welcome from "../Welcome";
import { toast } from "react-toastify";
import Loading from "./Loading";

function Read() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [tabledark, setTabledark] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();


  
  const getData = async () => {
    try {
      const res = await axios.get("https://sam-crud.onrender.com/api/read");
      setData(res.data.data); // because your API returns { data: [...] }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  function handleDelete(id) {
    axios.delete(`https://sam-crud.onrender.com/api/delete/${id}`).then(() => {
      toast.success("Deleted successfully ✅");
      getData();
    });
  }

  const setToLocalStorage = (name, email, phone) => {
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
  };

  const inputHandler = (e) => {
    setInput(e.target.value.toLowerCase());
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token === null) {
      navigate("/");
    }
  }, []);

  return (
    <div className="container mt-4">
      {/* Top Bar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-3">
          <Welcome />
          {/* <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              onClick={() =>
                setTabledark(tabledark === "table-dark" ? "" : "table-dark")
              }
            />
            <label className="form-check-label ms-2">Dark Mode</label>
          </div> */}
        </div>

        <div className="d-flex align-items-center gap-3">
          <input
            type="search"
            className="form-control"
            style={{ width: "250px" }}
            placeholder="🔍 Search..."
            onChange={inputHandler}
          />
          <Link to="/home">
            <button className="btn btn-success mb-4 fw-bold">+ Create</button>
          </Link>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="text-center mt-5">
          <Loading show={loading} />
        </div>
      ) : (
        <div className="card shadow-lg rounded-3 p-3">
          <h4 className="mb-3">📋 User Records</h4>

          <div className="table-responsive">
            <table
              className={`table table-hover table-striped align-middle ${tabledark}`}
            >
              <thead className="table-primary">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Number</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .filter((el) => {
                    if (input === "") return el;
                    return (
                      el.name.toLowerCase().includes(input) ||
                      el.email.toLowerCase().includes(input) ||
                      el.phone.includes(input)
                    );
                  })
                  .map((eachData, i) => (
                    <tr key={i}>
                      <td>{eachData.name}</td>
                      <td>{eachData.email}</td>
                      <td>{eachData.phone}</td>
                      <td>
                        <Link to={`/update/${eachData._id}`}>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() =>
                              setToLocalStorage(
                                eachData.name,
                                eachData.email,
                                eachData.phone
                              )
                            }
                          >
                            ✏ Edit
                          </button>
                        </Link>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(eachData._id)}
                        >
                          🗑 Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Read;
