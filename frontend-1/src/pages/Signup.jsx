import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Signup = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
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

    if (name === "username") {
      if (value.length < 3 || value.length > 20) {
        setErrors((prev) => ({
          ...prev,
          username: "Username must be between 3 and 20 characters",
        }));
        setValid(false);
      } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          username:
            "Username can only contain letters, numbers, and underscores",
        }));
        setValid(false);
      } else {
        setErrors((prev) => ({ ...prev, username: "" }));
        setValid(true);
      }
    }

    if (name === "email") {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
        setErrors((prev) => ({ ...prev, email: "Invalid email address" }));
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
      const response = await axios.post(`${API_URL}/api/signup`, formData);

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          const apiErrors = error.response.data.message || [];

          let messages = [];

          apiErrors.forEach((error) => {
            if (error.msg) {
              messages.push(error.msg);
            } else {
              messages.push(error);
            }
          });

          setErrorMessages(messages);
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
      <h2>Signup</h2>

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
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className={`form-control ${errors.username ? "is-invalid" : ""}`}
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && (
            <div className="invalid-feedback">{errors.username}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
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
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

Signup.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Signup;
