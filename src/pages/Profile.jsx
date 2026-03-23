import { useState, useEffect } from "react";

function Profile() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile");
    storedProfile
      ? setUserProfile(JSON.parse(storedProfile))
      : setUserProfile(null);
    setLoading(false);
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ color: "#ffffff" }}>Profile</h1>
      {loading
        ? <p>Loading...</p>
        : userProfile
        ? (
          <div style={{ backgroundColor: "#f3f4f6", padding: "16px", borderRadius: "8px" }}>
            <h2 style={{ color: "#1f2937", marginBottom: "16px" }}>Registered User Details</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "12px", borderBottom: "1px solid #d1d5db", paddingBottom: "12px" }}>
                <strong style={{ color: "#374151" }}>First Name:</strong> <span style={{ color: "#000000" }}>{userProfile.firstName}</span>
              </li>
              <li style={{ marginBottom: "12px", borderBottom: "1px solid #d1d5db", paddingBottom: "12px" }}>
                <strong style={{ color: "#374151" }}>Surname:</strong> <span style={{ color: "#000000" }}>{userProfile.surname}</span>
              </li>
              <li style={{ marginBottom: "12px", borderBottom: "1px solid #d1d5db", paddingBottom: "12px" }}>
                <strong style={{ color: "#374151" }}>Username:</strong> <span style={{ color: "#000000" }}>{userProfile.username}</span>
              </li>
              <li style={{ marginBottom: "12px", borderBottom: "1px solid #d1d5db", paddingBottom: "12px" }}>
                <strong style={{ color: "#374151" }}>Email:</strong> <span style={{ color: "#000000" }}>{userProfile.email}</span>
              </li>
            </ul>
          </div>
        )
        : (
          <div style={{ backgroundColor: "#fee2e2", padding: "16px", borderRadius: "8px", color: "#dc2626" }}>
            <p>No profile found. Please complete signup first to create a profile.</p>
          </div>
        )
      }
    </div>
  );
}

export default Profile;