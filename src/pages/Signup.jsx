import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const nameRegex = /^[A-Za-z]{2,30}$/;
const usernameRegex = /^[A-Za-z0-9_]{4,20}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{6,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
    setError,
  } = useForm({
    mode: "onChange", 
  });

  const password = watch("password");

  const onSubmit = (data) => {
   
    localStorage.setItem("userProfile", JSON.stringify({
      firstName: data.firstName,
      surname: data.surname,
      username: data.username,
      email: data.email,
    }));
    alert(`Signup successful for ${data.firstName} ${data.surname}!`);
    reset();
    setTimeout(() => navigate("/success"), 700);
  };

  const fieldStyle = (fieldName) => ({
    width: "100%",
    padding: "8px",
    border: `2px solid ${errors[fieldName] ? "#dc2626" : "#d1d5db"}`,
    borderRadius: "4px",
    backgroundColor: errors[fieldName] ? "#fee2e2" : "#ffffff",
    transition: "all 0.3s ease",
    color: "#000000",
  });

  return (
    <div style={{ padding: "20px", maxWidth: "420px", margin: "0 auto" }}>
      <h1 style={{ color: "#ffffff" }}>Signup</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="firstName" style={{ color: "#ffffff" }}>First Name</label>
          <input
            id="firstName"
            type="text"
            {...register("firstName", {
              required: "First name is required.",
              pattern: { value: nameRegex, message: "First name must have the minimum of 2 characters." },
            })}
            style={fieldStyle("firstName")}
          />
          {errors.firstName && (
            <p style={{ color: "#dc2626", margin: "4px 0 0 0", fontSize: "0.875rem" }}>
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="surname" style={{ color: "#ffffff" }}>Surname</label>
          <input
            id="surname"
            type="text"
            {...register("surname", {
              required: "Surname is required.",
              pattern: { value: nameRegex, message: "Surname must have the minimum of 2 characters." },
            })}
            style={fieldStyle("surname")}
          />
          {errors.surname && (
            <p style={{ color: "#dc2626", margin: "4px 0 0 0", fontSize: "0.875rem" }}>
              {errors.surname.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="username" style={{ color: "#ffffff" }}>Username</label>
          <input
            id="username"
            type="text"
            {...register("username", {
              required: "Username is required.",
              pattern: { value: usernameRegex, message: "Username must be letters/numbers/_/./- only." },
            })}
            style={fieldStyle("username")}
          />
          {errors.username && (
            <p style={{ color: "#dc2626", margin: "4px 0 0 0", fontSize: "0.875rem" }}>
              {errors.username.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="email" style={{ color: "#ffffff" }}>Email</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required.",
              pattern: { value: emailRegex, message: "Email format invalid." },
            })}
            style={fieldStyle("email")}
          />
          {errors.email && (
            <p style={{ color: "#dc2626", margin: "4px 0 0 0", fontSize: "0.875rem" }}>
              {errors.email.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="password" style={{ color: "#ffffff" }}>Password</label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required.",
              pattern: { value: passwordRegex, message: "Password must be 8-16 characters and contain at least one uppercase letter and one lowercase letter and one number and one special character." },
            })}
            style={fieldStyle("password")}
          />
          {errors.password && (
            <p style={{ color: "#dc2626", margin: "4px 0 0 0", fontSize: "0.875rem" }}>
              {errors.password.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="confirmPassword" style={{ color: "#ffffff" }}>Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              required: "Confirm password is required.",
              validate: (value) => value === password || "Confirm password must match password.",
            })}
            style={fieldStyle("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p style={{ color: "#dc2626", margin: "4px 0 0 0", fontSize: "0.875rem" }}>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid}
          style={{
            padding: "10px 14px",
            cursor: !isValid ? "not-allowed" : "pointer",
            backgroundColor: !isValid ? "#d1d5db" : "#4f46e5",
            color: !isValid ? "#6b7280" : "#ffffff",
            border: "none",
            borderRadius: "4px",
            fontWeight: "500",
            transition: "all 0.3s ease",
          }}
        >
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;