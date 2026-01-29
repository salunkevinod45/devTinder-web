import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    location: "",
    email: "",
    gender: "Male",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError("");
    try {
      const user = await axios.post(`${BASE_URL}signup`, signupForm, {
        withCredentials: true,
      });
      console.log(user);
      if (user) {
        dispatch(addUser(user.data.data));
        navigate("/profile");
      }
    } catch (error) {
      setError(error?.response?.data);
    }
  };
  return (
    <div className="grid justify-items-center mt-2">
      <div className="card card-border bg-base-100 w-96 grid justify-items-center">
        <div className="card-body w-96">
          <h2 className="card-title grid justify-items-center">Sign up</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">First Name</legend>
            <input
              type="text"
              className="input"
              id="fname"
              value={signupForm.firstName}
              onChange={(e) => {
                setSignupForm((prev) => ({
                  ...prev,
                  firstName: e.target.value,
                }));
              }}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Last Name</legend>
            <input
              type="text"
              className="input"
              id="lastname"
              value={signupForm.lastName}
              onChange={(e) => {
                setSignupForm((prev) => ({
                  ...prev,
                  lastName: e.target.value,
                }));
              }}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email ID</legend>
            <input
              type="text"
              className="input"
              id="email"
              value={signupForm.email}
              onChange={(e) => {
                setSignupForm((prev) => ({
                  ...prev,
                  email: e.target.value,
                }));
              }}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="text"
              className="input"
              id="password"
              value={signupForm.password}
              onChange={(e) =>
                setSignupForm((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Age</legend>
            <input
              type="number"
              className="input"
              id="age"
              value={signupForm.age}
              onChange={(e) => {
                setSignupForm((prev) => ({
                  ...prev,
                  age: e.target.value,
                }));
              }}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Location</legend>
            <input
              type="text"
              className="input"
              id="location"
              value={signupForm.location}
              onChange={(e) => {
                setSignupForm((prev) => ({
                  ...prev,
                  location: e.target.value,
                }));
              }}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Gender</legend>
            <select
              type="text"
              className="input"
              id="gender"
              value={signupForm.gender}
              onChange={(e) => {
                setSignupForm((prev) => ({
                  ...prev,
                  gender: e.target.value,
                }));
              }}
            >
              <option value={"Male"} selected>
                Male
              </option>
              <option value={"Female"}>Female</option>
            </select>
          </fieldset>
          {error && <p className="text-error">{error}</p>}
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleSignup}>
              Sign up
            </button>
            <Link to={"/login"}>
              <button className="btn btn-primary">Login</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
