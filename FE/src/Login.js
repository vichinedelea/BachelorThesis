import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEmail } from './EmailContext';

const Login = () => {
  const [email, setEmailInput] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, setIsPending] = useState(false);
  const { setEmail } = useEmail();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };

    setIsPending(true);

    fetch("https://localhost:7277/ckeckUser", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    }).then(() => {
      console.log('user found');
      setEmail(email); // Set the email in context
      setIsPending(false);
      navigate('/reservation'); // Redirect to the reservation page on successful login
    }).catch((error) => {
      console.error('Error checking user:', error);
      setIsPending(false);
    });
  }

  return (
    <div className="d-flex justify-content-center align-items-center bg-image vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="emailInput"><strong>Email</strong></label>
            <input
              type="email"
              id="emailInput"
              value={email}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Enter Email"
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="passwordInput"><strong>Password</strong></label>
            <input
              type="password"
              id="passwordInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="form-control rounded-0"
            />
          </div>
          {!isPending && (
            <button type="submit" className="btn btn-success w-100 rounded-0">
              Log in
            </button>
          )}
          {isPending && (
            <button type="button" className="btn btn-success w-100 rounded-0" disabled>
              Logging in...
            </button>
          )}
          <p>You agree to our terms and policies</p>
          <Link to="/signUp" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
