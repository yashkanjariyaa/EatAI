const ClearButton = () => { 

  const handleClick = () => {
    localStorage.clear();
    window.location.reload();
  };

  return <button onClick={handleClick}>Clear Data</button>;
};

export default ClearButton;
