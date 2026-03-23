import { useState } from "react";
import { useNavigate } from "react-router-dom";

const nameRegex = /^[A-Za-z]{2,30}$/;
const usernameRegex = /^[A-Za-z0-9_]{4,20}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{6,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validate = () => {
    const validators = [
      { k: "firstName", valid: nameRegex.test(form.firstName), msg: "First name must have the minimum of 2 characters." },
      { k: "surname", valid: nameRegex.test(form.surname), msg: "Surname must have the minimum of 2 characters." },
      { k: "username", valid: usernameRegex.test(form.username), msg: "Username must be letters/numbers/_/./- only." },
      { k: "email", valid: emailRegex.test(form.email), msg: "Email format invalid." },
      { k: "password", valid: passwordRegex.test(form.password), msg: "Password must be 8-16 characters and contain at least one uppercase letter and one lowercase letter and one number and one special character." },
    ];

    const baseErrors = validators.reduce((acc, { k, valid, msg }) =>
      valid ? acc : { ...acc, [k]: msg },
      {}
    );

    const confirmError = form.confirmPassword === form.password
      ? {}
      : { confirmPassword: "Confirm password must match password." };

    return { ...baseErrors, ...confirmError };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    const hasError = Object.keys(validationErrors).length > 0;

    hasError
      ? setSuccess("")
      : (setSuccess(`Signup successful for ${form.firstName} ${form.surname}!`),
        setForm({ firstName: "", surname: "", username: "", email: "", password: "", confirmPassword: "" }),
        setTimeout(() => navigate("/success"), 700));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "420px", margin: "0 auto" }}>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={form.firstName}
            onChange={(e) => setForm((prev) => ({ ...prev, firstName: e.target.value }))}
            style={{ width: "100%", padding: "8px" }}
          />
          {errors.firstName && <p style={{ color: "red", margin: 0 }}>{errors.firstName}</p>}
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="surname">Surname</label>
          <input
            id="surname"
            name="surname"
            type="text"
            value={form.surname}
            onChange={(e) => setForm((prev) => ({ ...prev, surname: e.target.value }))}
            style={{ width: "100%", padding: "8px" }}
          />
          {errors.surname && <p style={{ color: "red", margin: 0 }}>{errors.surname}</p>}
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={form.username}
            onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
            style={{ width: "100%", padding: "8px" }}
          />
          {errors.username && <p style={{ color: "red", margin: 0 }}>{errors.username}</p>}
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            style={{ width: "100%", padding: "8px" }}
          />
          {errors.email && <p style={{ color: "red", margin: 0 }}>{errors.email}</p>}
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
            style={{ width: "100%", padding: "8px" }}
          />
          {errors.password && <p style={{ color: "red", margin: 0 }}>{errors.password}</p>}
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={(e) => setForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
            style={{ width: "100%", padding: "8px" }}
          />
          {errors.confirmPassword && <p style={{ color: "red", margin: 0 }}>{errors.confirmPassword}</p>}
        </div>

        <button type="submit" style={{ padding: "10px 14px", cursor: "pointer" }}>
          Signup
        </button>
      </form>

      {success && <p style={{ color: "green", marginTop: "12px" }}>{success}</p>}
    </div>
  );
}

export default Signup;