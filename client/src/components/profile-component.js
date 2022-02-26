import React, { useState, useEffect } from "react";
import AuthService from "../sevices/auth-service";

const ProfileComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  return (
    <div style={{ pading: "3rem" }}>
      {!currentUser && <div>請先登入</div>}
      {currentUser && (
        <div>
          <h1>個人頁面</h1>
          <header className="jumbotron">
            <h3>
              <strong>{currentUser.user.username}</strong>
            </h3>
          </header>
          <p>
            <strong>Token:{currentUser.token}</strong>
          </p>
          <p>
            <strong>ID:{currentUser.user._id}</strong>
          </p>
          <p>
            <strong>Email:{currentUser.user.email}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
