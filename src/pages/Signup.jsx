
import { useNavigate } from "react-router-dom";

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