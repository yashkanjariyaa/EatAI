import { useNavigate } from "react-router-dom";

const HomeButton = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate("/")} style={buttonStyle}>
      Home
    </button>
  );
};

const buttonStyle = {
  padding: "10px 20px",
  margin: "5px",
  backgroundColor: "#28A745",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};

export default HomeButton;
