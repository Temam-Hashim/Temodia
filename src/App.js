import "./App.css";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Auth from "./pages/auth/Auth";
import { Route, Routes,Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Chat from "./pages/chat/Chat";
import { useEffect } from "react";
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.AuthReducer.authData)
 useEffect(() => {
   const expirationTime = parseInt(localStorage.getItem("expirationTime"), 10); // Convert to number

   if (expirationTime) {
     const expirationDate = new Date(expirationTime);
     console.log(expirationDate.toString()); // Logs the expiration date

     // Check if the token has expired
     if (expirationTime <= Date.now()) {
       localStorage.removeItem("profile");
       localStorage.removeItem("expirationTime");
       localStorage.removeItem("decodedToken");
       dispatch({ type: "LOG_OUT" }); // Dispatch LOG_OUT action
     }
   }
 }, [dispatch]);
  return (
    <div className="App">
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
      {/* import Home component */}
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
        /> 
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="../auth" />}
        />
        <Route
          path="/auth"
          element={user ? <Navigate to="../home" /> : <Auth />}
        />
        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="../auth" />}
        />
        <Route
          path="/chat"
          element={user ? <Chat /> : <Navigate to="../auth" />}
        />
      </Routes>
    </div>
  );
}

export default App;
