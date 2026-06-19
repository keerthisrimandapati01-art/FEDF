import React, { useState } from "react";

function RegistrationForm() {

  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    course: "",
    college: "",
    address: "",
    skills: "",
    year: ""
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmittedData(student);
  };

  return (
    <div className="main-container">

      <div className="left-panel">

        <h1>Future Scholar Portal</h1>

        <p>
          Register yourself to explore workshops,
          coding events, internships and student opportunities.
        </p>

        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="student"
        />

      </div>

      <div className="form-container">

        <h2>Student Registration</h2>

        <form onSubmit={handleSubmit}>

          <div className="input-grid">

            <div>
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                placeholder="Phone number"
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Age</label>
              <input
                type="number"
                name="age"
                placeholder="Age"
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Gender</label>
              <select name="gender" onChange={handleChange}>
                <option>Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label>Year</label>
              <select name="year" onChange={handleChange}>
                <option>Select</option>
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>4th Year</option>
              </select>
            </div>

            <div>
              <label>Course</label>
              <input
                type="text"
                name="course"
                placeholder="Course"
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Skills</label>
              <input
                type="text"
                name="skills"
                placeholder="Java, Python..."
                onChange={handleChange}
              />
            </div>

          </div>

          <label>College Name</label>
          <input
            type="text"
            name="college"
            placeholder="College name"
            onChange={handleChange}
          />

          <label>Address</label>
          <textarea
            name="address"
            placeholder="Enter address"
            onChange={handleChange}
          ></textarea>

          <button type="submit">
            Join Now 🚀
          </button>

        </form>

        {submittedData && (

          <div className="result-card">

            <h3>Registration Successful 🎉</h3>

            <div className="result-grid">

              <p><strong>Name:</strong> {submittedData.name}</p>
              <p><strong>Email:</strong> {submittedData.email}</p>
              <p><strong>Phone:</strong> {submittedData.phone}</p>
              <p><strong>Age:</strong> {submittedData.age}</p>
              <p><strong>Gender:</strong> {submittedData.gender}</p>
              <p><strong>Year:</strong> {submittedData.year}</p>
              <p><strong>Course:</strong> {submittedData.course}</p>
              <p><strong>Skills:</strong> {submittedData.skills}</p>
              <p><strong>College:</strong> {submittedData.college}</p>
              <p><strong>Address:</strong> {submittedData.address}</p>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default RegistrationForm;