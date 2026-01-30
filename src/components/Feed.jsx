import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import Loader from "./Loader";

const Feed = () => {
  const feed = useSelector((state) => state.feed);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const getFeed = async () => {
    try {
      const feeds = await axios.get(BASE_URL + "user/feed?page=1&limit=10", {
        withCredentials: true,
      });
      dispatch(addFeed(feeds.data.data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);

  if (loading) {
    return <Loader />;
  }
  if (feed.feed.length === 0) {
    return <div>No feed available</div>;
  }
  return (
    feed.feed[0] && (
      <div className="grid justify-center">
        <div className="grid grid-cols-1 my-10">
          <UserCard user={feed.feed[0]} />
        </div>
      </div>
    )
  );
};

export default Feed;
