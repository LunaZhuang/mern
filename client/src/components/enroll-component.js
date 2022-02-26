import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import courseService from "../sevices/course.service";

const EnrollComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  const navigate = useNavigate();
  let [searchInput, setSearchInput] = useState("");
  let [searchResult, setSearchResult] = useState(null);
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  const handleChangInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearch = () => {
    courseService
      .getCourseByName(searchInput)
      .then((data) => {
        console.log(data);
        setSearchResult(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleEnroll = (e) => {
    courseService
      .enroll(e.target.id, currentUser.user._id)
      .then(() => {
        window.alert("購買成功");
        navigate("/course");
      })
      .catch((err) => {
        console.log(err);
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
      {currentUser && currentUser.user.role == "instructor" && (
        <div>
          <h1>只有學生才能購買課程</h1>
        </div>
      )}
      {currentUser && currentUser.user.role == "student" && (
        <div className="search input-group mb-3">
          <input name="search" type="text" onChange={handleChangInput} />
          <button onClick={handleSearch} className="btn btn-primary">
            Search
          </button>
        </div>
      )}
      {currentUser && searchResult && searchResult.length != 0 && (
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {searchResult.map((course) => (
            <div
              key={course._id}
              className="card"
              style={{ width: "20rem", margin: "0.5rem" }}
            >
              <div className="card-body">
                <div style={{ width: "18rem", margin: "0.5rem" }}>
                  <h5 style={{ margin: "0.5rem" }} className="cart-title">
                    {course.title}
                  </h5>
                  <p className="card-text">{course.description}</p>
                </div>
                <div style={{ width: "15rem", height: "3rem" }}>
                  <p>學生人數:{course.students.length}</p>
                </div>
                <div>
                  <a
                    onClick={handleEnroll}
                    href="#"
                    className="card-text"
                    className="btn btn-primary"
                    id={course._id}
                  >
                    購買課程
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrollComponent;
