import axios from "axios";
import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [course, setCourse] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        "https://student-authentication-0rn2.onrender.com/api/auth/register",
        { name, email, password, course }
      );

      alert("Registration successful");
      console.log(res.data);
    } catch (err) {
      console.log(err.response?.data || err);
      alert("Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="text"
        placeholder="Course"
        onChange={(e) => setCourse(e.target.value)}
      />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}