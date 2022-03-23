import Header from './Header.js';
import { Button } from 'react-bootstrap'
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  useEffect(() => { // to redirect if already register
    if (localStorage.getItem('user-info')) {
      navigate("/add");
    }
  }, []);

  const initUser = {email:"", password:""};
  const [formData, setFormData] = useState(initUser)
  const [formErrors, setFormErrors] = useState({})

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]:value});
  }

  const login = (e) => {
    e.preventDefault();
    const user = {
       email : formData.email.toString().trim(),
       password : formData.password.toString().trim()
    }
    loginApi(user);
  }

  const loginApi = async (user) =>  {
    var response = await fetch("http://localhost:8000/api/login", {
      method:'POST',
      body:JSON.stringify(user),
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      }
    });
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
          <div className="login-form">
            <h2>Log In</h2>
            <form className="py-2">
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
              <Button onClick={login} type="submit" variant="primary" size="lg">Login</Button>
            </form>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default Login
