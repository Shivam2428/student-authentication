import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/";
      return;
    }

    axios.get(
      "https://student-authentication-0rn2.onrender.com/api/profile",
      {
        headers: { Authorization: token },
      }
    )
      .then(res => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        window.location.href = "/";
      });
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      {user ? (
        <>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Course: {user.course}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}

      <button onClick={() => {
        localStorage.removeItem("token");
        window.location.href = "/";
      }}>
        Logout
      </button>
    </div>
  );
}