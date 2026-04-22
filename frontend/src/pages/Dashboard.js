import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigate("/");
  }

  const [course, setCourse] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const token = localStorage.getItem("token");

  // UPDATE COURSE
  const updateCourse = async () => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/update-course",
        { course },
        {
          headers: { Authorization: token }
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data));
      alert("Course updated");
      window.location.reload();
    } catch (err) {
      alert("Error updating course");
    }
  };

  // UPDATE PASSWORD
  const updatePassword = async () => {
    try {
      await axios.put(
        "http://localhost:5000/api/update-password",
        { oldPassword, newPassword },
        {
          headers: { Authorization: token }
        }
      );

      alert("Password updated");
    } catch (err) {
      alert("Wrong old password");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <h3>Welcome {user?.name}</h3>
      <p>Email: {user?.email}</p>
      <p>Course: {user?.course}</p>

      <button onClick={logout}>Logout</button>

      <hr />

      <h3>Update Course</h3>
      <input
        placeholder="New Course"
        onChange={(e) => setCourse(e.target.value)}
      />
      <button onClick={updateCourse}>Update Course</button>

      <hr />

      <h3>Update Password</h3>
      <input
        placeholder="Old Password"
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <input
        placeholder="New Password"
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={updatePassword}>Update Password</button>
    </div>
  );
}

export default Dashboard;