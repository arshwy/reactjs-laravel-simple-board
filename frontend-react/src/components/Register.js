import { Button } from 'react-bootstrap'
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header.js';

const Register = () => {
  const navigate = useNavigate()
  useEffect(() => { // to redirect if already register
    if (localStorage.getItem('user-info')) {
      navigate("/add");
    }
  }, []);

  const initUser = {name:"", email:"", password:""};
  const [formData, setFormData] = useState(initUser)
  const [formErrors, setFormErrors] = useState({})
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]:value});
  }

  const validate = (user) => {
    const errors = {}
    const regex = /^[^\s@]+@[^\s@]+[^\s@]{2,}$/i;
    if (!user.name) {
      errors.name = "Name is required!";
    }
    if (!user.email) {
      errors.email = "Email is required!";
    }
    else if (!regex.test(user.email)) {
      errors.email =  "Invalid email format!";
    }
    if (!user.password) {
      errors.password =  "Password is required!";
    }
    setFormErrors(errors)
    return errors; // will be assigned to the formErrors
  }

   function signUp(e){ // on submit click
    e.preventDefault();
    const user = {
       name  : formData.name.toString().trim(),
       email : formData.email.toString().trim(),
       password : formData.password.toString().trim()
    }
    var errors = validate(user);
    // console.log(Object.keys(errors).length);
    if (Object.keys(errors).length === 0) {
      registerApi(user);
    }
  }

  async function registerApi(user){
    var response = await fetch("http://localhost:8000/api/register", {
      method:'POST',
      body:JSON.stringify(user),
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      }
    });
    // console.log(response); // Promise
    switch (response.status) {
      case 422:
        response = await response.json(); // Object contains the errors
        setFormErrors(response.errors);
        break;
      case 200:
        response = await response.json();
        localStorage.setItem("user-info", JSON.stringify(response));
        navigate("/add"); // redirect to add product page
        break;
      default:
        break;
    }
  }

  return (
    <>
      <Header />
      <div className="container-fluid py-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-12">
            <div className="register-form">
              <h2>Register</h2>
              <form>
                <div className="form-group">
                  <label className="d-block text-left">Name</label>
                  <input name="name" value={formData.name} onChange={handleChange}
                         className="form-control form-control-lg"
                         type="text" placeholder="Enter your name"/>
                  { formErrors.name  && <div className="text text-danger text-left">{ formErrors.name }</div> }
                </div>
                <div className="form-group">
                  <label className="d-block text-left">Email</label>
                  <input name="email" value={formData.email} onChange={handleChange}
                         className="form-control form-control-lg"
                         type="email" placeholder="Enter your email"/>
                  { formErrors.email && <div className="text text-danger text-left">{ formErrors.email }</div> }
                </div>
                <div  className="form-group">
                  <label className="d-block text-left">Password</label>
                  <input name="password" value={formData.password} onChange={handleChange}
                         className="form-control form-control-lg"
                         type="password" placeholder="Enter your password"/>
                  { formErrors.password && <div className="text text-danger text-left">{ formErrors.password }</div> }
                </div>
                <Button onClick={signUp} type="submit" variant="primary" size="lg">Submit</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default Register
