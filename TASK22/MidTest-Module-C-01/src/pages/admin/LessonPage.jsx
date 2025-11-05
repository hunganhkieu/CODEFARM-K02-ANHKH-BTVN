import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteLesson } from "../../api/apiLesson";

const LessonPage = () => {
  const [lesson, setLesson] = useState([]);
  const [courseName, setCourseName] = useState([]);
  const { courseId } = useParams();
  const nav = useNavigate();
  const fetchLesson = async (courseId) => {
    const data = await fetch(
      `http://localhost:3000/lessons?courseId=${courseId}`
    ).then((res) => res.json());
    setLesson(data);
  };

  const fetchCourseName = async (courseId) => {
    const data = await fetch(`http://localhost:3000/courses/${courseId}`).then(
      (res) => res.json()
    );
    setCourseName(data.title);
  };

  useEffect(() => {
    fetchLesson(courseId);
    fetchCourseName(courseId);
  }, [courseId]);

  const handleDelete = async (id) => {
    try {
      if (!confirm("Bạn có muốn xóa không?")) return;
      await deleteLesson(id);
      alert("Xóa thành công");
      fetchLesson(courseId);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Trang bài học</h1>
      <Link to={`/admin/courseId/${courseId}/lesson/add`}>
        <button>Thêm mới</button>
      </Link>
      <h3>Khóa học: {courseName}</h3>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Tên bài học</th>
            <th>Nội dung</th>
          </tr>
        </thead>

        <tbody>
          {lesson.length > 0 ? (
            lesson.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.content}</td>
                <td>
                  <Link
                    to={`/admin/courseId/${courseId}/lesson/update/${item.id}`}
                  >
                    <button>Cập nhật</button>
                  </Link>
                  <button onClick={() => handleDelete(item.id)}>Xóa</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>không có bài học nào</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={() => nav(-1)}>Quay lại</button>
    </div>
  );
};

export default LessonPage;
