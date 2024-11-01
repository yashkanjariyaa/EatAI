import { useNavigate } from 'react-router-dom';

const GoBackButton = () => {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(-1)} style={buttonStyle}>
            Go Back
        </button>
    );
};

const buttonStyle = {
    padding: '10px 20px',
    margin: '5px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
};

export default GoBackButton;
