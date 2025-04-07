import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [typeFilter, setTypeFilter] = useState("All");
  const [breedSearch, setBreedSearch] = useState("");

  useEffect(() => {
    async function fetchPets() {
      try {
        const response = await API.get("/pets");
        setPets(response.data);
        setFilteredPets(response.data);
      } catch (error) {
        console.error("Failed to fetch pets:", error);
      }
    }

    fetchPets();
  }, []);

  useEffect(() => {
    let filtered = pets;

    if (typeFilter !== "All") {
      filtered = filtered.filter((pet) => pet.pet_type === typeFilter);
    }

    if (breedSearch.trim() !== "") {
      filtered = filtered.filter((pet) =>
        pet.breed.toLowerCase().includes(breedSearch.toLowerCase())
      );
    }

    setFilteredPets(filtered);
  }, [typeFilter, breedSearch, pets]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Available Pets 🐾</h2>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-4">
          <select
            className="form-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">All Types</option>
            {Array.from(new Set(pets.map(pet => pet.pet_type))).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by breed..."
            value={breedSearch}
            onChange={(e) => setBreedSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Pet Cards */}
      <div className="row">
        {filteredPets.map((pet) => (
          <div className="col-md-4 mb-4" key={pet.id}>
            <div className="card h-100 shadow">
              <img
                src={pet.image_url || "https://via.placeholder.com/200"}
                alt={pet.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{pet.name}</h5>
                <p className="card-text">
                  <strong>Breed:</strong> {pet.breed} <br />
                  <strong>Type:</strong> {pet.pet_type} <br />
                  <strong>Age:</strong> {pet.age} <br />
                  {pet.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;


  
  