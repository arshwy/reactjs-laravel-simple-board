import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Protected = (props) => {
  const navigate = useNavigate()
  useEffect(() => { // to redirect if already register
    if (!localStorage.getItem('user-info')) {
      navigate("/login");
    }
  }, []);
  var Component = props.component;

  return (
    <><Component user={props.user}/></>
  );
}


export default Protected
