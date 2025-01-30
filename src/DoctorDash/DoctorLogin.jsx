import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./DoctorLogin.module.css"; // Import the CSS module

function DoctorLogin() {
  const { Formik } = formik;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const schema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
  });

  const handleForm = async () => {
    // handle form submission logic here
  };

  return (
    <Container fluid className={styles.registrationContainer}>
      <Row>
        <Col className="mx-auto my-3">
          <Formik
            validationSchema={schema}
            onSubmit={handleForm}
            initialValues={{
              email: "",
              password: "",
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form
                noValidate
                onSubmit={handleSubmit}
                className={styles.formContainer}
              >
                <h1 className={styles.loginHeading}>Doctor Login</h1>
                <Form.Group className="mb-3">
                  <Form.Label className={styles.formLabel}>
                    Email address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isValid={touched.email && !errors.email}
                    isInvalid={!!errors.email}
                    className={styles.formControl}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className={styles.formLabel}>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Your Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isValid={touched.password && !errors.password}
                    isInvalid={!!errors.password}
                    className={styles.formControl}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" className={styles.submitButton}>
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

export default DoctorLogin;
