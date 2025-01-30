import React from "react";
import * as formik from "formik";
import * as yup from "yup";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { API } from "../../AXIOS";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { changeLogReg } from "../../REDUX/userAuthenticationSlice";

const Register = () => {
  const { Formik } = formik;
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    fullName: yup.string().required("enter full name"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup.string().required("enter password"),
  });

  const handleForm = async (data) => {
    try {
      const res = await API.post(
        "/reg",
        {
          fullName: data.fullName,
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(changeLogReg("Login"));
      } else {
        toast.error(res.data.message || "Registration failed");
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
    <Container>
      <Row>
        <Col md={4} className="mx-auto">
          <Formik
            validationSchema={schema}
            onSubmit={handleForm}
            initialValues={{
              fullName: "",
              email: "",
              password: "",
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3 position-relative">
                  <Form.Label>full name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    placeholder="Full name"
                    value={values.fullName}
                    onChange={handleChange}
                    isValid={touched.fullName && !errors.fullName}
                    isInvalid={!!errors.fullName}
                  />
                  <Form.Control.Feedback tooltip>
                    Looks good!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.fullName}
                  </Form.Control.Feedback>
                </Form.Group>

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

                <Form.Group className="mb-3 position-relative">
                  <Form.Label>Enter a Password</Form.Label>
                  <Form.Control
                    type="text"
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    isValid={touched.password && !errors.password}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback tooltip>
                    Looks good!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button type="submit">Submit</Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
