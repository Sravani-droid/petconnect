import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("adopter");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/register", {
        name,
        email,
        password,
        role,
      });
      setMessage(response.data.message);

      // Redirect after success
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setMessage("Email already registered.");
      } else {
        setMessage("Registration failed.");
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        /><br /><br />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
        /><br /><br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        /><br /><br />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="adopter">Adopter</option>
          <option value="shelter">Shelter</option>
        </select><br /><br />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Register;
