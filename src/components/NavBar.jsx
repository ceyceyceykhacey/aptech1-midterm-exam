import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2>Student System</h2>
      <div>
        <Link to="/home" style={styles.link}>Home</Link>
        <Link to="/profile" style={styles.link}>Profile</Link>
        <Link to="/signup" style={styles.link}>Signup</Link>
        <Link to="/success" style={styles.link}>Success</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    background: "#4f46e5",
    color: "white"
  },
  link: {
    marginLeft: "15px",
    color: "white",
    textDecoration: "none"
  }
};

export default Navbar;
