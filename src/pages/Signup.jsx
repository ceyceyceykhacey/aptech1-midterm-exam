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
  const [touched, setTouched] = useState({});

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

    const confirmError = form.confirmPassword === form.password && form.confirmPassword !== ""
      ? {}
      : form.confirmPassword === ""
      ? {}
      : { confirmPassword: "Confirm password must match password." };

    return { ...baseErrors, ...confirmError };
  };

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));

    const updatedForm = { ...form, [field]: value };
    const validators = [
      { k: "firstName", valid: nameRegex.test(updatedForm.firstName) },
      { k: "surname", valid: nameRegex.test(updatedForm.surname) },
      { k: "username", valid: usernameRegex.test(updatedForm.username) },
      { k: "email", valid: emailRegex.test(updatedForm.email) },
      { k: "password", valid: passwordRegex.test(updatedForm.password) },
    ];

    const newErrors = validators.reduce((acc, { k, valid }) =>
      valid ? { ...acc, [k]: undefined } : acc,
      {}
    );

    const confirmValid = updatedForm.confirmPassword === updatedForm.password && updatedForm.confirmPassword !== "";
    const confirmError = !confirmValid && updatedForm.confirmPassword !== "" 
      ? { confirmPassword: "Confirm password must match password." }
      : { confirmPassword: undefined };

    setErrors((prev) => ({ ...prev, ...newErrors, ...confirmError }));
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const currentErrors = validate();
  const displayErrors = Object.fromEntries(
    Object.entries(currentErrors).filter(([k]) => touched[k] || Object.keys(errors).includes(k))
  );

  const isValid = Object.keys(currentErrors).length === 0;
  const isFormTouched = Object.values(touched).some(v => v);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched({ firstName: true, surname: true, username: true, email: true, password: true, confirmPassword: true });
    const validationErrors = validate();
    setErrors(validationErrors);

    const hasError = Object.keys(validationErrors).length > 0;

    hasError
      ? setSuccess("")
      : (setSuccess(`Signup successful for ${form.firstName} ${form.surname}!`),
        localStorage.setItem("userProfile", JSON.stringify({
          firstName: form.firstName,
          surname: form.surname,
          username: form.username,
          email: form.email
        })),
        setForm({ firstName: "", surname: "", username: "", email: "", password: "", confirmPassword: "" }),
        setTouched({}),
        setTimeout(() => navigate("/success"), 700));
  };

  const fieldStyle = (field) => ({
    width: "100%",
    padding: "8px",
    border: `2px solid ${(displayErrors[field] || currentErrors[field]) ? "#dc2626" : "#d1d5db"}`,
    borderRadius: "4px",
    backgroundColor: (displayErrors[field] || currentErrors[field]) ? "#fee2e2" : "#ffffff",
    transition: "all 0.3s ease",
    color: "#000000",
  });

  return (
    <div style={{ padding: "20px", maxWidth: "420px", margin: "0 auto" }}>
      <h1 style={{ color: "#ffffff" }}>Signup</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="firstName" style={{ color: "#ffffff" }}>First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={form.firstName}
            onChange={handleChange("firstName")}
            onBlur={handleBlur("firstName")}
            style={fieldStyle("firstName")}
          />
          {(displayErrors.firstName || currentErrors.firstName) && (
            <p style={{ color: "#dc2626", margin: "4px 0 0 0", fontSize: "0.875rem" }}>
              {displayErrors.firstName || currentErrors.firstName}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="surname" style={{ color: "#ffffff" }}>Surname</label>
          <input
            id="surname"
            name="surname"
            type="text"
            value={form.surname}
            onChange={handleChange("surname")}
            onBlur={handleBlur("surname")}
            style={fieldStyle("surname")}
          />
          {(displayErrors.surname || currentErrors.surname) && (
            <p style={{ color: "#dc2626", margin: "4px 0 0 0", fontSize: "0.875rem" }}>
              {displayErrors.surname || currentErrors.surname}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="username" style={{ color: "#ffffff" }}>Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange("username")}
            onBlur={handleBlur("username")}
            style={fieldStyle("username")}
          />
          {(displayErrors.username || currentErrors.username) && (
            <p style={{ color: "#dc2626", margin: "4px 0 0 0", fontSize: "0.875rem" }}>
              {displayErrors.username || currentErrors.username}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="email" style={{ color: "#fffefe" }}>Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            onBlur={handleBlur("email")}
            style={fieldStyle("email")}
          />
          {(displayErrors.email || currentErrors.email) && (
            <p style={{ color: "#dc2626", margin: "4px 0 0 0", fontSize: "0.875rem" }}>
              {displayErrors.email || currentErrors.email}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="password" style={{ color: "#ffffff" }}>Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange("password")}
            onBlur={handleBlur("password")}
            style={fieldStyle("password")}
          />
          {(displayErrors.password || currentErrors.password) && (
            <p style={{ color: "#dc2626", margin: "4px 0 0 0", fontSize: "0.875rem" }}>
              {displayErrors.password || currentErrors.password}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="confirmPassword" style={{ color: "#ffffff" }}>Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange("confirmPassword")}
            onBlur={handleBlur("confirmPassword")}
            style={fieldStyle("confirmPassword")}
          />
          {(displayErrors.confirmPassword || currentErrors.confirmPassword) && (
            <p style={{ color: "#dc2626", margin: "4px 0 0 0", fontSize: "0.875rem" }}>
              {displayErrors.confirmPassword || currentErrors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid || !isFormTouched}
          style={{
            padding: "10px 14px",
            cursor: !isValid || !isFormTouched ? "not-allowed" : "pointer",
            backgroundColor: !isValid || !isFormTouched ? "#d1d5db" : "#4f46e5",
            color: !isValid || !isFormTouched ? "#6b7280" : "#ffffff",
            border: "none",
            borderRadius: "4px",
            fontWeight: "500",
            transition: "all 0.3s ease",
          }}
        >
          Signup
        </button>
      </form>

      {success && <p style={{ color: "#16a34a", marginTop: "12px", fontWeight: "500" }}>{success}</p>}
    </div>
  );
}

export default Signup;