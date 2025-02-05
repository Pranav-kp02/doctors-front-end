import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOutUser } from "../../REDUX/userAuthenticationSlice";
import { getDoctorLoginInfo } from "../../REDUX/docAthetication";
import { API } from "../../AXIOS";
import toast from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const athetication = useSelector(
    (state) => state.userAth.athetication ?? false
  );
  const docAthetication = useSelector(
    (state) => state.DoctorAth.athetication ?? false
  );

  const adminDash = useSelector((state) => state.userAth.user ?? []);
  // const token = useSelector((state) => state.userAth.token ?? []);
  // console.log(token);

  const handleLogOut = async () => {
    dispatch(
      getDoctorLoginInfo({
        doctor: [],
        athetication: false,
        token: null,
      })
    );

    try {
      const res = await API.post(
        `/logOut`,
        {},
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(
          LogOutUser({
            user: [],
            athetication: false,
            token: null,
            allUserAppoiments: [],
          })
        );
        navigate("/");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(errorMessage);
      console.log(errorMessage);
    }
  };

  return (
    <Navbar expand="lg" className="navBar">
      <Container>
        <Navbar.Brand as={Link} to={"/"}>
          <img
            src="https://technext.github.io/live-doc/v1.0.0/assets/img/gallery/logo.png"
            alt=""
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="hover-hanburger"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto nav-align">
            <Nav.Link as={Link} to={"/"} className="listStyle">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={"/doctors"} className="listStyle">
              All Doctors
            </Nav.Link>
            <Nav.Link as={Link} to={"/about-us"} className="listStyle">
              About Us
            </Nav.Link>
            {docAthetication ? (
              <Nav.Link
                as={Link}
                to={"/doctor/dashboard"}
                className="listStyle"
              >
                DashBoard
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to={"/userAppoiments"} className="listStyle">
                Appoiments
              </Nav.Link>
            )}
            {athetication || docAthetication ? (
              <div className="dropdown">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  height="2em"
                  width="1.7em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4m9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"></path>
                </svg>

                <div className="drop">
                  <div className="drop-list">
                    {!docAthetication && (
                      <p
                        onClick={() => navigate("userProfile")}
                        className="lists-drop-down "
                      >
                        My Profile
                      </p>
                    )}
                    {adminDash.role === "admin" && (
                      <p
                        onClick={() => navigate("admin/dashboard")}
                        className="lists-drop-down "
                      >
                        Admin Dashboard
                      </p>
                    )}
                    <p
                      onClick={() => navigate("contactUs")}
                      className="lists-drop-down "
                    >
                      Contact us
                    </p>
                    <p
                      onClick={() => handleLogOut()}
                      className="lists-drop-down m-0"
                    >
                      Log Out
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <Button className="signBtn" onClick={() => navigate("login")}>
                Sign In
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
