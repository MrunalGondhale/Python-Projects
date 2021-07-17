import React, { useState } from "react";
import './style.css'
import { useDispatch , useSelector} from 'react-redux'
import {login } from "../../actions/userActions";
import { Button } from "react-bootstrap";
import loginImg from '../../images/login2.jpg'


function About() {

    
    const dispatch = useDispatch();
  
    const userLogin = useSelector((state) => state.userLogin);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");




    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
        setEmail("");
        setPassword("");
      };
    return (
        <div>



<div className="container-fluid myContainer">
		<div className="row main-content bg-info text-center">
			<div className="col-md-5 text-center company__info">
				{/* <h4 className="company_title">Your Company Logo</h4>  */}
                <img src={loginImg}></img>
			</div>
			<div className="col-md-7 col-xs-12 col-sm-12 login_form ">
				<div className="container-fluid">
					<div className="row">
						<h2 className="mt-5 text-center">Sign In</h2>
					</div>
					<div className="row">
						<form className="form-group" onSubmit={loginHandler}>
							<div className="row">
								<input type="email"
                                 name="email" 
                                 id="email" 
                                 className="form__input" 
                                 placeholder="Username"
                    
                            
                                 value={email}
                                 placeholder="Enter email"
                                 onChange={(e) => setEmail(e.target.value)}

                                
                                />
							</div>
							<div className="row">
								 <span className="fa fa-lock"></span> 
								<input type="password" 
                                name="password"
                                 id="password" 
                                className="form__input"
                                  placeholder="Password"
                                  value={password}
                                
                                onChange={(e) => setPassword(e.target.value)}

                                />
							</div>
							{/* <div className="row">
								<input type="checkbox" name="remember_me" id="remember_me" className=""/>
								<label for="remember_me">Remember Me!</label>
							</div> */}
							<div className="row justify-content-center">
                                <div className="col-md-6 ml-auto d-md-flex justify-content-end ">
                                <Button  type="submit" value="Submit" >SignIn</Button>

                                </div>
                                <h6 className="col-md-6 d-md-flex justify-content-start my-md-auto pl-2 mt-3">New ? <a href="/contact">Register Here</a></h6>

							</div>
						</form>
					</div>
					
				</div>
			</div>
		</div>
	</div>
       




        

    

        </div>
    )
}

export default About



/* <div className="container-fluid">
      <div className="row">
        <div className="col-sm-6 login-section-wrapper">
          <div className="brand-wrapper">
            <img src="assets/images/logo.svg" alt="logo" className="logo"/>
          </div>
          <div className="login-wrapper my-auto">
            <h1 className="login-title">Log in</h1>
            <form action="#!">
              <div className="form-group">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" className="form-control" placeholder="email@example.com"/>
              </div>
              <div className="form-group mb-4">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" className="form-control" placeholder="enter your passsword"/>
              </div>
              <input name="login" id="login" className="btn btn-block login-btn" type="button" value="Login"/>
            </form>
            <a href="#!" className="forgot-password-link">Forgot password?</a>
            <p className="login-wrapper-footer-text">Don't have an account? <a href="#!" className="text-reset">Register here</a></p>
          </div>
        </div>
        <div className="col-sm-6 px-0 d-none d-sm-block">
          <img src="https://source.unsplash.com/1600x900/?social" alt="login image" className="login-img"/>
          <p className="text-white font-weight-medium text-center flex-grow align-self-end footer-link">
            Free <a href="https://www.bootstrapdash.com/" target="_blank" className="text-white">Bootstrap dashboard templates</a> from Bootstrapdash
          </p>
        </div>
      </div>
    </div>

*/