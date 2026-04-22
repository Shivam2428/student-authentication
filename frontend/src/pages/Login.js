import axios from "axios";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://student-authentication-0rn2.onrender.com/api/login",
        { email, password }
      );

      // ✅ token save
      localStorage.setItem("token", res.data.token);

      alert("Login successful");

      // ✅ redirect
      window.location.href = "/dashboard";

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <p>
        No account? <a href="/register">Register</a>
      </p>
    </div>
  );
}