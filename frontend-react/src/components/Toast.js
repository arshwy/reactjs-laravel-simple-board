import React from 'react';


const Toast = ({productFlag, productAddFlag, productDeleteFlag, productUpdateFlag, infoMessage, onClose}) => {

  return (
    <div className="p-3" style={toastModalStyle}>
      <div className="text-right"><a href="/#" onClick={onClose}>Close</a></div>
      <p className="" style={{ padding:"0", margin:"0" }}>{infoMessage}</p>
    </div>
  );
}

const toastModalStyle = {
  position:"fixed",
  bottom:"20px",
  backgroundColor:"#b3e6cc",
  width:"450px",
  borderRadius:"5px",
}

export default Toast
