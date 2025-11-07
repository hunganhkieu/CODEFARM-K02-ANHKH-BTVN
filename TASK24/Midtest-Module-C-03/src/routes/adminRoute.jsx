import AdminLayout from "../layouts/AdminLayout";
import FormProject from "../pages/admin/FormProject";
import FormTask from "../pages/admin/FormTask";
import ProjectPage from "../pages/admin/ProjectPage";
import TaskPage from "../pages/admin/TaskPage";
import ProtectedRoute from "./components/ProtectedRoute";

const adminRoute = [
  {
    path: "admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "projects", Component: ProjectPage },
      { path: "project/add", Component: FormProject },
      { path: "project/update/:id", Component: FormProject },
      { path: "projectId/:projectId/tasks", Component: TaskPage },
      { path: "projectId/:projectId/task/add", Component: FormTask },
      { path: "projectId/:projectId/task/update/:taskId", Component: FormTask },
    ],
  },
];

export default adminRoute;
