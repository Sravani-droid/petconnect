import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AddPet() {
  const [form, setForm] = useState({
    name: "",
    breed: "",
    age: "",
    pet_type: "Dog",
    description: "",
    image_url: "",
    shelter_id: 1  // Replace with dynamic ID later if needed  -- test
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/add_pet", form);
      setMessage(response.data.message);
      // Optionally redirect to dashboard or clear form
      navigate("/dashboard");
    } catch (err) {
      console.error("Error adding pet:", err);
      setMessage("Failed to add pet.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add a New Pet</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} /><br /><br />
        <input name="breed" placeholder="Breed" value={form.breed} onChange={handleChange} /><br /><br />
        <input name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} /><br /><br />
        <select name="pet_type" value={form.pet_type} onChange={handleChange}>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
        </select><br /><br />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} /><br /><br />
        <input name="image_url" placeholder="Image URL" value={form.image_url} onChange={handleChange} /><br /><br />
        <button type="submit">Add Pet</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default AddPet;
