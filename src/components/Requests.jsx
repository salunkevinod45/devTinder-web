import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const storedRequests = useSelector((state) => state.requests);
  const fetchRequests = async () => {
    try {
      const requestsReceived = await axios.get(
        `${BASE_URL}user/requests/received`,
        { withCredentials: true },
      );
      dispatch(addRequests(requestsReceived.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const reviewRequest = async (status, reqId) => {
    try {
      const reviewReq = await axios.post(
        `${BASE_URL}connection/review/${status}/${reqId}`,
        {},
        { withCredentials: true },
      );

      if (reviewReq) {
        dispatch(removeRequest(reqId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if(!storedRequests.requests || storedRequests.requests.length ===0){
    return <div>No request found</div>
  }
  return (
    <>
      {storedRequests.requests && (
        <div className="grid grid-cols-4 gap-5 mb-20">
          {storedRequests.requests.map((req, index) => {
            const {
              firstName,
              lastName,
              gender,
              email,
              about,
              skills,
              photoUrl,
              age,
              _id,
            } = req.fromUserId;

            const { _id: requestId } = req;
            return (
              <div key={_id} className="card bg-base-100 w-96 shadow-sm">
                <figure>
                  <img src={photoUrl} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{firstName + " " + lastName}</h2>
                  <div className="italic">{gender + "," + age}</div>
                  <p>{about}</p>

                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-error"
                      onClick={() => reviewRequest("rejected", requestId)}
                    >
                      Reject{" "}
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={() => reviewRequest("accepted", requestId)}
                    >
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Requests;
