import React from "react";

const UserCard = ({user}) => {
  const {firstName,lastName,photoUrl,gender,age,about,skills} = user;
  return (
    <div className="">
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img
            src={photoUrl}
            alt="photo"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName+" "+lastName}</h2>
          {(age && gender)&& <p>{gender}, {age}</p>}
          <p>
            {about}
          </p>
            <h4 className="card-xs">Skills</h4>
            <ol className="list-decimal list-inside">
              {skills?.map((skill,index)=>(
                <li key={index}>{skill}</li>
              ))}
            </ol>
          <div className="card-actions justify-end">
            <button className="btn btn-error">Ignore</button>
            <button className="btn btn-success">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
