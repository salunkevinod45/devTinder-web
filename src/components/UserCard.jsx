import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, gender, age, about, skills, _id } =
    user;
  const [responseMessage, setResponseMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  const sendRequest = async (status) => {
   setErrorMessage(null)
    try {
      const sendInterest = await axios.post(
        `${BASE_URL}connection/send/${status}/${_id}`,
        {},
        { withCredentials: true },
      );
      setResponseMessage(sendInterest.data);
      setTimeout(() => {
        setResponseMessage(null);
      }, 3000);

      dispatch(removeFeed(_id));
    } catch (error) {
      setErrorMessage(error.response.data)
    }
  };

  if(!user) {
    return <div>No feed available</div>
  }
  return (
    <div className="">
      {responseMessage && (
        <div className="toast toast-center toast-middle z-50 mx-auto mb-50">
          <div className="alert alert-success">
            <span>{responseMessage}</span>
          </div>
        </div>
      )}
            {errorMessage && (
        <div className="toast toast-center toast-bottom z-50 mx-auto mb-50">
          <div className="alert alert-error">
            <span>{errorMessage}</span>
          </div>
        </div>
      )}
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
          <h4 className="card-xs">Skills</h4>
          <ol className="list-decimal list-inside">
            {skills?.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ol>
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
