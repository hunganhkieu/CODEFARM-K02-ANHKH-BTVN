import AdminLayout from "../layouts/AdminLayout";
import CoursesPage from "../pages/admin/CoursesPage";
import FormCourse from "../pages/admin/FormCourse";
import FormLesson from "../pages/admin/FormLesson";
import LessonPage from "../pages/admin/LessonPage";
import ProtectedRoute from "./components/ProtectedRoute";

const adminRoute = [
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "courses", Component: CoursesPage },
      { path: "course/add", Component: FormCourse },
      { path: "course/update/:id", Component: FormCourse },
      { path: "courseId/:courseId/lessons", Component: LessonPage },
      { path: "courseId/:courseId/lesson/add", Component: FormLesson },
      {
        path: "courseId/:courseId/lesson/update/:lessonId",
        Component: FormLesson,
      },
    ],
  },
];

export default adminRoute;
