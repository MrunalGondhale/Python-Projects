import React, { useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";
import { Button , Form} from "react-bootstrap";

function Contact() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

//   const logoutHandler = () => {
//     dispatch(logout());
//   };

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [role, setRole] = useState("");
  const roles = ["User", "Mentor"];

  const roleOptions = roles.map((role, key) => (
    <option value={role} key={key}>
      {role}
    </option>
  ));

  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const postDetails = (pics) => {
    if (
      pics ===
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    ) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  const registerHandler = (e) => {
    e.preventDefault();
    setMessage("");
    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    } else dispatch(register(name, email, password, pic, role));

    setEmail("");
    setPassword("");
    setPicMessage("");
    setPic("");
    setConfirmPassword("");
    setName("");
    setRole("");
  };
  return (
    <div>
      <div className="container-fluid myContainer">
        <div className="row main-content bg-success text-center">
          <div className="col-md-6 text-center company__info">
            <span className="company__logo">
              <h2>
                <span className="fa fa-android"></span>
              </h2>
            </span>
            <h4 className="company_title">Your Company Logo</h4>
            <img src="../../images/login.jpg"></img>
          </div>
          <div className="col-md-6 col-xs-12 col-sm-12 login_form ">
            <div className="container-fluid">
              <div className="row">
                <h2>Sign Up</h2>
              </div>
              <div className="row">
                <form control="" className="form-group" onSubmit={registerHandler}>
                <div className="row">
								<input type="text"
                                 name="name" 
                                 id="email" 
                                 className="form__input" 
                                 placeholder="Name"
                                 value={name}
                                 placeholder="Name"
                                 onChange={(e) => setName(e.target.value)}/>
							</div>
                            <div className="row">
								<input type="email"
                                 name="email" 
                                 id="email" 
                                 className="form__input" 
                                 placeholder="Username"
                                 value={email}
                                 placeholder="Enter email"
                                 onChange={(e) => setEmail(e.target.value)}/>
							</div>

                            <div className="row">
								<input type="password"
                                 name="password" 
                                 id="email" 
                                 className="form__input" 
                                 placeholder="Password"
                                 value={password}
                                 placeholder="Password"
                                 onChange={(e) => setPassword(e.target.value)}/>
							</div>

                            <div className="row">
								<input type="password"
                                 name="password" 
                                 id="email" 
                                 className="form__input" 
                                 placeholder="Password"
                                 value={confirmpassword}
                                 placeholder="Confirm Password"
                                 onChange={(e) => setConfirmPassword(e.target.value)}/>
							</div>

                  
            

                  <div className="row">
                    <label for="exampleInputPassword1">Profile Picture</label>
                    <input
                       className="form_input"

                      onChange={(e) => postDetails(e.target.files[0])}
                      id="custom-file"
                      type="file"
                      label="Upload Profile Picture"
                      custom
                    />
                  </div>

                  <Form.Group controlId="role">
                    <div className="field">
                      <div className="control">
                        <Form.Control
                          name="role"
                          as="select"
                          value={role}
                          className="form_input"

                          onChange={(event) => setRole(event.target.value)}
                        >
                          <option value={""}>Select a role</option>
                          {roleOptions}
                        </Form.Control>
                      </div>
                    </div>
                  </Form.Group>
                  {/* <div className="row">
								<input type="checkbox" name="remember_me" id="remember_me" className=""/>
								<label for="remember_me">Remember Me!</label>
							</div> */}
                  <div className="row">
                    <Button type="submit" value="Submit" className="btn">
                      Register
                    </Button>
                  </div>
                </form>
              </div>
              <div className="row">
                <p>
                  I have an account? <a href="/About">Login Here</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
