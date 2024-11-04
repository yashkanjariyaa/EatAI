import "./loadingModal.css";
const LoadingModal = () => {
  return (
    <div className="loading-modal">
      <div className="loading-content">
        <div className="spinner"></div>
        <p>EatAI is cooking...</p>
      </div>
    </div>
  );
};

export default LoadingModal;
