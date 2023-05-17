import "./App.css";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Auth from "./pages/auth/Auth";
import Message from "./pages/message/Message";
import { Route, Routes,Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
function App() {
  const user = useSelector((state)=>state.AuthReducer.authData)
  return (
    <div className="App">
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
      {/* import Home component */}
      <Routes>
        <Route  exact path="/" element={user?<Navigate to="home"/>:<Navigate to="auth"/>} />
        <Route  path="/home" element={user?<Home/>:<Navigate to="../auth"/>} />
        <Route path="/auth" element={user?<Navigate to="../home"/> : <Auth/> }/>
        <Route  path="/message" element={user?<Message/>:<Navigate to="../auth"/>} />
        <Route path='/profile/:id' element= {user ? <Profile/>:<Navigate to="../auth" />} />
      </Routes>
    </div>
  );
}

export default App;
