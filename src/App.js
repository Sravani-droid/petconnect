import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddPet from "./pages/AddPet"; // 
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-pet" element={<AddPet />} />  
      </Routes>
    </Router>
  );
}

export default App;





