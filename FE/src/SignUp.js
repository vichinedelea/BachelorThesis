import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEmail } from './EmailContext';

const SignUp = () => {
  const [userName, setName] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, setIsPending] = useState(false);
  const { setEmail } = useEmail();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { userName, email: emailInput, password };

    setIsPending(true);

    fetch("https://localhost:7277/addUser", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    }).then(() => {
      console.log('new user added');
      setEmail(emailInput); // Set the email in context
      setIsPending(false);
      navigate('/reservation'); // Redirect to the reservation page on successful sign-up
    }).catch((error) => {
      console.error('Error adding user:', error);
      setIsPending(false);
    });
  }

  return (
    <div className="d-flex justify-content-center align-items-center bg-image vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nameInput"><strong>Name</strong></label>
            <input
              type="text"
              id="nameInput"
              name="name"
              value={userName}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="emailInput"><strong>Email</strong></label>
            <input
              type="email"
              id="emailInput"
              name="email"
              value={emailInput}
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
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="form-control rounded-0"
            />
          </div>
          {!isPending && <button type="submit" className="btn btn-success w-100 rounded-0">
            Sign up
          </button>}
          {isPending && <button disabled type="button" className="btn btn-success w-100 rounded-0">
            Adding...
          </button>}
          <p>You agree to our terms and policies</p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
