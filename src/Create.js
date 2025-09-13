import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Swal from "sweetalert2";

function Create() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    let emailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/i.test(email);
    let phoneRegex = /^[6-9][\d]{9}$/.test(phone);

    if (!name || !email || !phone) {
      Swal.fire({ icon: "error", title: "Oops", text: "Please fill all fields." });
      return;
    } else if (name.length < 3) {
      Swal.fire({ icon: "error", title: "Oops", text: "Name requires a minimum of 3 characters" });
      return;
    } else if (!emailRegex) {
      Swal.fire({ icon: "error", title: "Oops", text: "Enter a valid Gmail address" });
      return;
    } else if (!phoneRegex) {
      Swal.fire({ icon: "error", title: "Oops", text: "Enter a valid 10-digit number" });
      return;
    } else {
      Swal.fire({ icon: "success", title: "Success!", text: "Submitted successfully" });
    }

    setLoading(true);

    axios.post('https://sam-crud.onrender.com/api/create',
      { name, email, phone }
    ).then(() => {
      setLoading(false);
      navigate("/read");
    }).catch(() => {
      setLoading(false);
      Swal.fire({ icon: "error", title: "Oops", text: "Something went wrong!" });
    });
  };

  return (
    <div className="container d-flex flex-column align-items-center mt-5">
      
      {/* Header buttons */}
      <div className="d-flex justify-content-end w-100 mb-4">
        <Link to="/read">
          <button className="btn btn-outline-primary mx-2">📄 View Data</button>
        </Link>
        <Link to="/upload">
          <button className="btn btn-outline-success">📷 Upload Image</button>
        </Link>
      </div>

      {/* Form Card */}
      <div className="card shadow-lg p-4 mb-4 rounded-3" style={{ maxWidth: "450px", width: "100%" }}>
        <h3 className="text-center mb-4">
          {loading ? "⏳ Processing..." : "📝 Create Data"}
        </h3>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label fw-bold">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name..."
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Gmail..."
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="form-label fw-bold">Phone Number</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter 10-digit number..."
              value={phone}
              onChange={(e) => setPhone(e.target.value.slice(0, 10))}
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-bold"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit ✅"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Create;
