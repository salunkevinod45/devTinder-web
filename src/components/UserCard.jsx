import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import Toast from "./Toast";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, gender, age, about, skills, _id } =
    user;
  const [toastConfig, setToastConfig] = useState({
    message: null,
    type: null,
    duration: 3000,
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  const sendRequest = async (status) => {
    setErrorMessage(null);
    try {
      const sendInterest = await axios.post(
        `${BASE_URL}connection/send/${status}/${_id}`,
        {},
        { withCredentials: true },
      );

      setToastConfig({
        message: sendInterest.data,
        type: "success",
        duration: 3000,
      });

      dispatch(removeFeed(_id));
    } catch (error) {
      setToastConfig({
        message: error.response.data,
        type: "error",
        duration: 3000,
      });
    }
  };

  if (!user) {
    return <div>No feed available</div>;
  }

  return (
    <div className="">
      <Toast toastConfig={toastConfig}></Toast>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img src={photoUrl} alt="photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && (
            <p>
              {gender}, {age}
            </p>
          )}
          <p>{about}</p>
          <h4 className="card-xs text-shadow-2xs text-emerald-500">Skills</h4>
          <ul className="list bg-base-100 rounded-box shadow-md">
            {skills?.map((skill, index) => (
              <li key={index} className="list-row">
                {skill}
              </li>
            ))}
          </ul>

          <div className="card-actions justify-end">
            <button
              className="btn btn-error"
              onClick={() => sendRequest("ignored")}
            >
              Ignore
            </button>
            <button
              className="btn btn-success"
              onClick={() => sendRequest("interested")}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
