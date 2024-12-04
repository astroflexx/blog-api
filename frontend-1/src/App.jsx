import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PostDetail from "./pages/PostDetail";
import Signup from "./pages/Signup";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const validateToken = async () => {
      if (token) {
        try {
          const response = await axios.post(`${API_URL}/api/auth/validate`, {
            token,
          });

          if (response.status === 200) {
            setIsLoggedIn(true);
          }
        } catch (error) {
          if (error.response) {
            if (error.response.status === 400) {
              console.error("Invalid token format or missing data.");
            } else if (error.response.status === 401) {
              console.error("Unauthorized: Token is invalid or expired.");
            } else {
              console.error("Unexpected error:", error.response.status);
            }
          } else {
            console.error("Network or server error occurred.");
          }
          setIsLoggedIn(false);
        }
      }
    };

    validateToken();
  }, []);

  return (
    <Router>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route
            path="/login"
            element={
              <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route path="/signup" element={<Signup isLoggedIn={isLoggedIn} />} />
          <Route
            path="/post/:postId"
            element={<PostDetail isLoggedIn={isLoggedIn} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
