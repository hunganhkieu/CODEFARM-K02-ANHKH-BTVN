import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteCourse } from "../../api/apiCourse";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  const nav = useNavigate();
  const fetchCourses = async (inputSearch, sortPrice) => {
    const data = await fetch(
      `http://localhost:3000/courses?${inputSearch ? `q=${inputSearch}` : ""}${
        sortPrice ? `&_sort=price&_order=${sortPrice}` : ""
      }`
    ).then((res) => res.json());
    setCourses(data);
  };

  useEffect(() => {
    fetchCourses(inputSearch, sortPrice);
  }, [inputSearch, sortPrice]);

  const handleDelete = async (id) => {
    try {
      if (!confirm("Bạn có muốn xóa không?")) return;
      //   console.log(id);
      await deleteCourse(id);
      alert("Xóa thành công");
      fetchCourses();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setInputSearch("");
    setSortPrice("");
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    nav("/auth/login");
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Tìm kiếm"
        onChange={(e) => setInputSearch(e.target.value)}
      />

      <select
        name=""
        id=""
        value={sortPrice}
        onChange={(e) => setSortPrice(e.target.value)}
      >
        <option value="">Sắp xếp mặc định theo giá</option>
        <option value="asc">Sắp xếp theo giá tăng dần</option>
        <option value="desc">Sắp xếp theo giá giảm dần</option>
      </select>

      <button onClick={handleReset}>Reset</button>

      <button onClick={handleLogout}>Đăng xuất</button>
      <br />
      <Link to={"/admin/course/add"}>
        <button>Thêm mới</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Tên khóa học</th>
            <th>Mô tả</th>
            <th>giá tiền</th>
          </tr>
        </thead>

        <tbody>
          {courses &&
            courses.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <Link to={`/admin/courseId/${item.id}/lessons`}>
                    {item.title}
                  </Link>
                </td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>
                  <Link to={`/admin/course/update/${item.id}`}>
                    <button>update</button>
                  </Link>
                  <button onClick={() => handleDelete(item.id)}>Xóa</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoursesPage;
