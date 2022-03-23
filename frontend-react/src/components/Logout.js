import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({user}) => {
  const navigate = useNavigate()
  // make the frontend logout
  localStorage.removeItem('user-info');
  // send to backend to logout too
  return (<></>);
}
export default Logout
