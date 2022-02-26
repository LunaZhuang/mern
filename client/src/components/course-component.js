import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import courseService from "../sevices/course.service";

const CourseComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  let [courseData, setCourseData] = useState(null);
  useEffect(() => {
    console.log("Using effect.");
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
    } else {
      _id = "";
    }
    if (currentUser.user.role == "instructor") {
      courseService
        .get(_id)
        .then((data) => {
          setCourseData(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (currentUser.user.role == "student") {
      courseService
        .getEnrolledCourses(_id)
        .then((data) => {
          setCourseData(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

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
          <h1>講師授課清單</h1>
        </div>
      )}
      {currentUser && currentUser.user.role == "student" && (
        <div>
          <h1>我的學習</h1>
        </div>
      )}
      {currentUser && courseData && courseData.length != 0 && (
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {courseData.map((course) => (
            <div className="card" style={{ width: "20rem", margin: "0.5rem" }}>
              <div className="card-body">
                <div style={{ width: "18rem", margin: "0.5rem" }}>
                  <h5 style={{ margin: "0.2rem" }} className="cart-title">
                    {course.title}
                  </h5>
                  <p style={{ margin: "0.2rem" }} className="card-text">
                    {course.description}
                  </p>
                </div>
                <div style={{ width: "15rem", height: "3rem" }}>
                  <p>學生人數:{course.students.length}</p>
                </div>
                <div>
                  <button
                    style={{
                      width: "6rem",
                      height: "2rem",
                      margin: "1rem 1.5rem 0rem 0rem",
                    }}
                    className="btn btn-primary"
                  >
                    ＄{course.price}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseComponent;
