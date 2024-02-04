import { useState } from 'react';
// import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';

function Authentication({ updateUser }) {
  const [signUp, setSignUp] = useState(false);
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false); 
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    firstName: signUp ? yup.string().required("Please enter your first name") : yup.string(),
    lastName: signUp ? yup.string().required("Please enter your last name") : yup.string(),
    email: signUp ? yup.string().email("Invalid email address").required("Email is required") : yup.string(),
    phoneNumber: signUp ? yup.string().matches(/^\d{10}$/, "Phone number must be 10 digits").required("Phone number is required") : yup.string(),
    password: yup.string().required("Password is required"),
    confirmPassword: signUp ? yup.string().required("Please confirm password").oneOf([yup.ref("password"), null], "Passwords must match") : yup.string(),
  });

  const handleClick = () => {
    setSignUp((prevSignUp) => !prevSignUp);
    setSuccess(false);
    setError(false);
  };
  
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      // Handle form submission here
      const endpoint = signUp ? '/api/signup' : '/api/login';
      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error('Invalid credentials');
          }
        })
        .then((user) => {
          updateUser(user);
          setSuccess(true);
          navigate('/');
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  })

  const renderSignUpFields = () => {
    if (signUp) {
      return (
        <>
          <div className="form-field">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="form-error">{formik.errors.firstName}</div>
            )}
          </div>

          <div className="form-field">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="form-error">{formik.errors.lastName}</div>
            )}
          </div>

          <div className="form-field">
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <div className="form-error">{formik.errors.phoneNumber}</div>
            )}
          </div>
        </>
      );
    }

    return null;
  };

  return (
    <>
      <h2 className="form-error"> {formik.errors.email}</h2>
      {error && <h2  className="form-error">{error}</h2>}
      {success && <h2 style={{ color: 'green' }}>Signup successful! You can now log in.</h2>}
      <h2>Register </h2>
      <h2>{signUp ? 'Already a member?' : 'Not a member'}</h2>
      <button type="button" onClick={handleClick}>
        {signUp ? 'Log In' : 'Sign Up'}
      </button>
      <form onSubmit={formik.handleSubmit}>
        <div  className="form-field">
          <label> Email </label>
          <input
            type="text"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </div>
        <div  className="form-field">
          <label> Password </label>
          <input 
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        {formik.touched.password && formik.errors.password && (
          <div style={{ color: 'red' }}>{formik.errors.password}</div>
        )}
        </div>
        {renderSignUpFields()}
        {signUp && (
          <>
          </>
        )}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Authentication;
