import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { getLoginInfo } from "../../REDUX/userAuthenticationSlice";
import { useNavigate } from "react-router-dom";
import { API } from "../../AXIOS";
import toast from "react-hot-toast";
import "./LoginForm.css";

function LoginForm() {
  const { Formik } = formik;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const schema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
  });

  const handleForm = async (logData) => {
    try {
      const res = await API.post(
        "/log",
        {
          email: logData.email,
          password: logData.password,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.setItem("token", res.data.token);
        dispatch(
          getLoginInfo({
            user: res.data.user,
            athetication: true,
            token: res.data.token,
          })
        );

        navigate("/userProfile");
      } else {
        toast.error(res.data.message);
        console.log(res.data.message);
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
    <Container fluid className="registration-container">
      <Row>
        <Col xs={8} sm={6} md={6} lg={4} className="mx-auto my-3">
          <Formik
            validationSchema={schema}
            onSubmit={handleForm}
            initialValues={{
              email: "",
              password: "",
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isValid={touched.email && !errors.email}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Your Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isValid={touched.password && !errors.password}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button type="submit">login</Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
