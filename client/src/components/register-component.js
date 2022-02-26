import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../sevices/auth-service";

const RegisterComponent = () => {
  const navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");
  let [message, setMessage] = useState("");

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeRole = (e) => {
    setRole(e.target.value);
  };
  const handleRegister = () => {
    AuthService.register(username, email, password, role)
      .then(() => {
        window.alert("註冊成功，請稍候。");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        {message && (
          <div className="alert alert-danger"> {"資料請填寫完整及正確"} </div>
        )}
        <div>
          <label htmlFor="username">用戶名</label>
          <input
            onChange={handleChangeUsername}
            type="text"
            className="form-control"
            name="username"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">信箱</label>
          <input
            onChange={handleChangeEmail}
            type="text"
            className="form-control"
            name="email"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">密碼</label>
          <input
            onChange={handleChangePassword}
            type="password"
            className="form-control"
            name="password"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">身份</label>
          <input
            type="text"
            list="roleList"
            className="form-control"
            name="role"
            onChange={handleChangeRole}
          ></input>
          <datalist id="roleList">
            <option value="instructor">講師</option>
            <option value="student">學生</option>
          </datalist>
        </div>
        <br />
        <button onClick={handleRegister} className="btn btn-primary">
          <span>註冊</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterComponent;
