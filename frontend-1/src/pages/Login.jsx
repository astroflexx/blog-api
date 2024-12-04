import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Login = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [valid, setValid] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          email: "Please enter a valid email address",
        }));
        setValid(false);
      } else {
        setErrors((prev) => ({ ...prev, email: "" }));
        setValid(true);
      }
    }

    if (name === "password") {
      if (value.length < 6) {
        setErrors((prev) => ({
          ...prev,
          password: "Password must be at least 6 characters long",
        }));
        setValid(false);
      } else if (!/[A-Z]/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          password: "Password must contain at least one uppercase letter",
        }));
        setValid(false);
      } else if (!/[a-z]/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          password: "Password must contain at least one lowercase letter",
        }));
        setValid(false);
      } else if (!/[0-9]/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          password: "Password must contain at least one number",
        }));
        setValid(false);
      } else if (!/[\W_]/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          password: "Password must contain at least one special character",
        }));
        setValid(false);
      } else {
        setErrors((prev) => ({ ...prev, password: "" }));
        setValid(true);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API_URL}/api/login`, formData);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.data.token);
        setIsLoggedIn(true);
        navigate("/", { replace: true });
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          setErrorMessages([
            error.response.data.message || "Invalid credentials",
          ]);
        } else if (status === 500) {
          setErrorMessages([
            "A server error occurred. Please try again later.",
          ]);
        } else {
          setErrorMessages([
            `An unexpected error occurred. Status code: ${status}`,
          ]);
        }
      } else {
        setErrorMessages([
          "Unable to connect to the server. Please check your network.",
        ]);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>

      {errorMessages.length > 0 && (
        <div className="alert alert-danger">
          <ul>
            {errorMessages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting || !valid}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

Login.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default Login;
