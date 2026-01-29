import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const user = useSelector((state)=> state.user);
  console.log(user)
  const dispatch = useDispatch();
  const [email, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const loggedInUser = await axios.post(
        BASE_URL + "login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(loggedInUser.data.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data);
    }
  };
useEffect(() => {
  if (user && user?.user?._id) {
    navigate('/');
  }
}, [user]);

  return (
    <div className="grid justify-items-center mt-2">
      <div className="card card-border bg-base-100 w-96 grid justify-items-center">
        <div className="card-body w-96">
          <h2 className="card-title grid justify-items-center">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email ID</legend>
            <input
              type="text"
              className="input"
              id="email"
              value={email}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="text"
              className="input"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          {error && <p className="text-error">{error}</p>}
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
               <Link to={"/signup"}><button className="btn btn-primary">
              Sign up
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
