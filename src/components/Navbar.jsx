import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import {removeUser} from "../utils/userSlice"

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async()=>{
    try{
      await axios.post(BASE_URL+"logout",{},{withCredentials:true});
      dispatch(removeUser())
      navigate('/login');
    }catch(err) {
      console.log(err)
    }
  }
  return (
    <div>
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <Link to={user.user ?"/":"/login"} className="btn btn-ghost text-xl" >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            DevTinder 
          </Link>
        </div>
        <div className="flex-none">
          {user.user && (
            <>
            welcome ,{user.user.firstName} 
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar mx-4"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt={user.user.firstName}
                    title={user.user.firstName}
                    src={user.user.photoUrl}
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to={"/profile"} className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
