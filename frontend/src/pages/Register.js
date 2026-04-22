import axios from "axios";
import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [course, setCourse] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post(
        "https://student-authentication-0rn2.onrender.com/api/register",
        { name, email, password, course }
      );

      alert("Registration successful");
    } catch (err) {
      console.log(err);
      alert("Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <input placeholder="Course" onChange={(e) => setCourse(e.target.value)} />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}