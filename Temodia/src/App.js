import "./App.css";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Auth from "./pages/auth/Auth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter className="App">
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
      {/* import Home component */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/single/:id" element={<Single />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
