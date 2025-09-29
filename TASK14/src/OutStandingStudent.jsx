import React from "react";
import students from "../data";
import "bootstrap/dist/css/bootstrap.min.css";
const OutStandingStudent = () => {
  const titleClassification = (score) => {
    if (score <= 3) {
      return { title: "Yếu", color: "red" };
    } else if (score > 3 && score <= 6) {
      return { title: "Trung bình", color: "orange" };
    } else if (score > 6 && score <= 8) {
      return { title: "Khá", color: "blue" };
    } else if (score > 8 && score < 9.5) {
      return { title: "Giỏi", color: "green" };
    } else {
      return { title: "Xuất sắc", color: "violet" };
    }
  };

  const maxScore = Math.max(...students.map((item) => item.score));
  const findMaxScore = students.find((item) => item.score === maxScore);
  const { title, color } = titleClassification(findMaxScore.score);

  return (
    <div className="container mt-4">
      <hr />
      <h2 className="text-center mb-4">Sinh viên có điểm cao nhất</h2>
      <table className="table table-bordered table-hover table-striped text-center align-middle">
        <thead className="table-dark">
          <tr>
            <th>Mã sinh viên</th>
            <th>Họ và tên</th>
            <th>Giới tính</th>
            <th>Tuổi</th>
            <th>Chuyên ngành</th>
            <th>Điểm trung bình</th>
            <th>Danh hiệu</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{findMaxScore.id}</td>
            <td>{findMaxScore.fullName}</td>
            <td>{findMaxScore.gender}</td>
            <td>{findMaxScore.age}</td>
            <td>{findMaxScore.major}</td>
            <td>{findMaxScore.score}</td>
            <td style={{ color }}>{title}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OutStandingStudent;
