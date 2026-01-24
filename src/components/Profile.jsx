import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addUser } from "../utils/userSlice";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    age: "",
    about: "",
    photoUrl: "",
    skills: [],
  });
  const [showToast, setToast] = useState(false);
  const [error, setError] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const dispatch = useDispatch();

  const handleAddSkill = () => {
    if (newSkill) {
      const newSkills = [...profile.skills];
      newSkills.push(newSkill);
      console.log("add skills", profile.skills, newSkills);
      setProfile((prev) => {
        return {
          ...prev,
          skills: newSkills,
        };
      });
      setNewSkill("");
    }
  };

  const handleDeleteSkill = (index) => {
    const newskills = [...profile.skills];
    newskills.splice(index, 1);
    setProfile((prev) => ({ ...prev, skills: newskills }));
  };

  useEffect(() => {
    if (user?.user) {
      const { firstName, lastName, age, about, photoUrl, skills } = user?.user;

      setProfile((prev) => {
        return {
          ...prev,
          firstName,
          lastName,
          age,
          about,
          photoUrl,
          skills,
        };
      });
    }
  }, [user?.user]);

  const handleUpdateProfile = async () => {
    setError("");
    try {
      const updateProfile = await axios.patch(
        BASE_URL + "profile/edit",
        { ...profile },
        { withCredentials: true },
      );

      dispatch(addUser(updateProfile.data.data));
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="grid grid-cols-3 gap-2 mb-20">
      {showToast && (
        <div className="toast toast-center toast-middle z-50 mx-auto">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
      <div className="p-4 justify-end">
        <fieldset className="fieldset bg-base-200 rounded-box border p-4 ">
          <legend className="fieldset-legend">Edit Profile</legend>

          <label className="label">First Name</label>
          <input
            type="text"
            className="input w-full"
            value={profile.firstName}
            onChange={(e) =>
              setProfile((prev) => ({
                ...prev,
                firstName: e.target.value,
              }))
            }
            placeholder="first name"
          />

          <label className="label">Last Name</label>
          <input
            type="text"
            className="input w-full"
            value={profile.lastName}
            onChange={(e) =>
              setProfile((prev) => ({
                ...prev,
                lastName: e.target.value,
              }))
            }
            placeholder="last name"
          />

          <label className="label">Photo URL</label>
          <input
            type="text"
            className="input w-full"
            value={profile.photoUrl}
            onChange={(e) =>
              setProfile((prev) => ({
                ...prev,
                photoUrl: e.target.value,
              }))
            }
            placeholder="photo url"
          />

          <label className="label">Age</label>
          <input
            type="text"
            className="input w-full"
            value={profile.age}
            onChange={(e) =>
              setProfile((prev) => ({
                ...prev,
                age: e.target.value,
              }))
            }
            placeholder="age"
          />
          <label className="label">Skills</label>
          <ol className="list-decimal list-inside">
            {profile.skills?.map((skill, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{skill}</span>
                <button
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                  onClick={() => handleDeleteSkill(index)}
                >
                  ❌
                </button>
              </li>
            ))}
          </ol>

          <input
            type="text"
            className="input"
            value={newSkill}
            placeholder="skill"
            onChange={(e) => setNewSkill(e.target.value)}
          />
          <button
            className="btn btn-circle w-19"
            onClick={() => handleAddSkill()}
          >
            Add Skill
          </button>

          <label className="label">About</label>

          <textarea
            placeholder="about me"
            className="textarea textarea-xl w-full"
            value={profile.about}
            onChange={(e) =>
              setProfile((prev) => ({
                ...prev,
                about: e.target.value,
              }))
            }
          ></textarea>
          {error && <p className="text-error">{error}</p>}

          <button
            className="btn btn-primary"
            onClick={() => handleUpdateProfile()}
          >
            Update Profile
          </button>
        </fieldset>
      </div>
      <div className="p-4 mx-2">{profile && <UserCard user={profile} />}</div>
    </div>
  );
};

export default Profile;
