import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const storeConnections = useSelector(
    (state) => state.connections.connections,
  );
  const [removeConnection, setRemoveConnection] = useState(null);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const getConnections = async () => {
    try {
      const connections = await axios.get(BASE_URL + "user/connections", {
        withCredentials: true,
      });
      console.log(connections.data.data);
      dispatch(addConnections(connections.data.data));
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  useEffect(() => {
    getConnections();
  }, []);

  const handleRemoveConnection = async (id) => {
    try {
      const removeConnection = await axios.delete(
        `${BASE_URL}removeConnection/${id}`,
        { withCredentials: true },
      );
      if (removeConnection) {
        const updatedConnections = storeConnections.filter(
          (connection) => connection.connectionId !== id,
        );
        dispatch(addConnections(updatedConnections));
        setRemoveConnection("connection removed successfully");
        setTimeout(() => {
          setRemoveConnection(null);
        }, 3000);
      }
    } catch (error) {
      setError(error?.response?.data);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };
  if (!storeConnections || storeConnections.length === 0) {
    return <div>No connections</div>;
  }
  return (
    <>
      {storeConnections && (
        <>
          {removeConnection && (
            <div className="toast toast-start z-50">
              <div className="alert alert-success">
                <span>{removeConnection}</span>
              </div>
            </div>
          )}

          {error && (
            <div className="toast toast-start z-50">
              <div className="alert alert-error">
                <span>{error}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-4 gap-5 mb-20">
            {storeConnections.map((connection, index) => {
              const {
                firstName,
                lastName,
                gender,
                email,
                about,
                skills,
                photoUrl,
                age,
              } = connection.user;
              const { connectionId } = connection;
              return (
                <div className="card bg-base-100 w-96 shadow-sm">
                  <figure>
                    <img src={photoUrl} alt="Shoes" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{firstName + " " + lastName}</h2>
                    <div className="italic">{gender + "," + age}</div>
                    <p>{about}</p>
                    <div className="card-actions justify-end">
                      <button
                        className="btn btn-primary"
                        onClick={() => handleRemoveConnection(connectionId)}
                      >
                        Remove Connection
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Card Title</h2>
              <p>
                A card component has a figure, a body part, and inside body
                there are title and actions parts
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Card Title</h2>
              <p>
                A card component has a figure, a body part, and inside body
                there are title and actions parts
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Card Title</h2>
              <p>
                A card component has a figure, a body part, and inside body
                there are title and actions parts
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Card Title</h2>
              <p>
                A card component has a figure, a body part, and inside body
                there are title and actions parts
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Card Title</h2>
              <p>
                A card component has a figure, a body part, and inside body
                there are title and actions parts
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div> */}
          </div>
        </>
      )}
    </>
  );
};

export default Connections;
