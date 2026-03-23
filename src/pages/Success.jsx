import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();
  const profile = localStorage.getItem("userProfile");

  useEffect(() => {
    profile ? null : navigate("/");
  }, [profile, navigate]);

  const user = profile && JSON.parse(profile);

  return user ? (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Signup Success</h1>
      <p>Welcome, {user.firstName} {user.surname}!</p>
      <p>Your account has been created successfully.</p>
      <p>You can now visit Profile or Home.</p>
    </div>
  ) : null;
}

export default Success;