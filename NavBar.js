import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout, login, register } from "../actions/userActions";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, NavDropdown, Nav, Navbar, Form, Modal ,FormControl  } from 'react-bootstrap'
import './Screen.css'
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';


function NavBar({setSearch}) {

    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error,} = userRegister;
    const logoutHandler = () => {
        dispatch(logout());
    };

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [pic, setPic] = useState(
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    );
    const [role, setRole] = useState("");
    const roles = ["User", "Mentor",];

    const roleOptions = roles.map((role, key) => (
        <option value={role} key={key}>
            {role}
        </option>
    ));

    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [picMessage, setPicMessage] = useState(null);
    const [modalState, setModalState] = useState( "close")

    const handleShowModalOne = () => {
        setModalState("modal-one")
    }

    

    const  handleShowModalTwo = () => {
        setModalState("modal-two")
    }

    const  handleClose = () => {
        setModalState("close")
    }


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
        console.log("abcd")
        if (password !== confirmpassword) {
            setMessage("Passwords do not match");
        } else dispatch(register(name, email, password, pic, role));

        setEmail("")
        setPassword("")
        setPicMessage("")
        setPic("")
        setConfirmPassword("")
        setName("")
        setRole("")

    };

    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
        setEmail("")
        setPassword("")

    };


    return (
        
            <Navbar bg="light"  sticky="top" expand="lg">
              <div className='container'>
                <Navbar.Brand href="/">Mentor On Demand</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                    
                        {userLogin.userInfo && (
                        <Form inline>
                            <FormControl
                            type="text"
                            placeholder="Search"
                            className="mr-sm-2"
                            onChange={(e) => setSearch(e.target.value)}
                            />
                        </Form>
                        )}
                    
                        <Link className='m-3' to="/"><strong>Home</strong></Link>
                        {userLogin.userInfo && userLogin.userInfo.role === "Mentor" && (
              <Link className="links m-3" to="/viewcourses">
                View Your Courses
              </Link>
            )}
            {userLogin.userInfo && userLogin.userInfo.role === "User" && (
          
           <div className='mt-3'> <Link className="links m-3" to="/enrolled">
                Enrolled Courses
              </Link>
              <Link className="links m-3" to="/mentorlist">
                Mentor List
              </Link>
              <Link className="links m-3" to="/viewcourse">
              View Course
              </Link></div>
            )}
            {userLogin.userInfo && userLogin.userInfo.role === "Admin" && (
             <div className='mt-3'> <Link className="links m-3" to="/allcourses">
                all courses
              </Link>
               <Link className="links m-3" to="/allusers">
               all users
             </Link></div>
            )}
                        <Link className='m-3' to="/about"><strong>About Us</strong></Link>
                        <Link className='m-3' to="/contact"><strong>Contact Us</strong></Link>
                       
                        {!userInfo && 
                        <div> 
                            <Link className=' m-3' onClick={handleShowModalOne} type="button"><strong>Register</strong></Link>
                            <Link className='m-3' onClick={handleShowModalTwo} type="button"><strong>Login</strong></Link>
                                                 
                        </div>}
                        {userInfo &&
                            <NavDropdown
                                className='m-2 text-primary'
                                title={`${userInfo.name}`}
                                id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/profile"> My Profile                                  
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logoutHandler}> Logout                              
                                </NavDropdown.Item>
                            </NavDropdown>
                        }
                   
          
                {/* register */}
                <Modal show={modalState === "modal-one"} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Register Here</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {message && (
                  <ErrorMessage variant="danger">{message}</ErrorMessage>
                )}

                {loading && <Loading />}
                        <Form onSubmit={registerHandler}>
                            <Form.Group controlId="formBasicName">
                                <Form.Control type="text" value={name}
                                    placeholder="Enter name"
                                    onChange={(e) => setName(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" value={email}
                                    placeholder="Enter email"
                                    onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" value={password}
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password"
                                    value={confirmpassword}
                                    placeholder="Confirm Password"
                                    onChange={(e) => setConfirmPassword(e.target.value)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.File id="exampleFormControlFile1" label="Upload Profile picture"
                                    onChange={(e) => postDetails(e.target.files[0])}
                                   
                                    type="file" />
                            </Form.Group>
                            <Form.Group controlId="role">
                                <div className="field">
                                    <div className="control">
                                        <Form.Control
                                            name="role" as="select" value={role} className="select is-fullwidth" onChange={(event) => setRole(event.target.value)} >
                                            <option value={""} >
                                                Select a role</option>
                                            {roleOptions}
                                        </Form.Control>
                                    </div>
                                </div>
                            </Form.Group>
                            <Button type="submit" variant="primary" onClick={handleClose}>
                                Register
                            </Button>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>

                {/* Login popup */}
                <Modal show={modalState === "modal-two"} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login Here</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    {userLogin && userLogin.error && (
                  <ErrorMessage variant="danger">
                    {userLogin.error}
                  </ErrorMessage>
                )}
                {userLogin && userLogin.loading && <Loading />}

                        <Form onSubmit={loginHandler}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" value={email}
                                    placeholder="Enter email"
                                    onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" value={password}
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>
                            <Button type="submit" variant="primary" onClick={handleClose}>
                                Login
                            </Button>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>
                </Nav>
                </Navbar.Collapse>
              </div>

            </Navbar>
    )
}

export default NavBar
