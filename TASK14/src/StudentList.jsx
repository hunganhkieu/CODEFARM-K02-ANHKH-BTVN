import React from "react";
import students from "../data";
import "bootstrap/dist/css/bootstrap.min.css";
const Student = () => {
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

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Danh sách sinh viên</h2>

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
          {students.map((item) => {
            const { title, color } = titleClassification(item.score);

            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.fullName}</td>
                <td>{item.gender}</td>
                <td>{item.age}</td>
                <td>{item.major}</td>
                <td>{item.score}</td>
                <td style={{ color, fontWeight: "bold" }}>{title}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Student;
