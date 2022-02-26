import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../sevices/course.service";

const PostCourseComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState(0);
  let [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  const handleChangTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeSesciption = (e) => {
    setDescription(e.target.value);
  };
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const postCourse = () => {
    CourseService.post(title, description, price)
      .then(() => {
        window.alert("開課成功");
        navigate("/course");
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>請先登入</p>
          <button
            onClick={handleTakeToLogin}
            className="btn btn-primary btnplg"
          >
            前往登入
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role !== "instructor" && (
        <div>
          <h1>只有講師才可開新課程</h1>
        </div>
      )}
      {currentUser && currentUser.user.role == "instructor" && (
        <div className="form-group">
          <label for="exampleforTitle">名稱</label>
          <input
            name="title"
            type="text"
            className="form-control"
            id="exampleforTitle"
            onChange={handleChangTitle}
          />
          <br />
          <label for="exampleforContent">描述</label>
          <textarea
            className="form-control"
            id="exampleforContent"
            aria-describedby="emailHelp"
            name="content"
            onChange={handleChangeSesciption}
          />
          <br />
          <label for="exampleforPrice">價格</label>
          <input
            name="price"
            type="number"
            className="form-control"
            id="exampleforPrice"
            onChange={handleChangePrice}
          />
          <br />
          <button className="btn btn-primary" onClick={postCourse}>
            提交
          </button>
          <br />
          <br />
          {message && (
            <div className="alert alert-warning" role="alert">
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCourseComponent;
