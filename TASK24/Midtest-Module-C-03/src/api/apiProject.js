import api from ".";

export const getProjectId = async (id) => {
  const { data } = await api.get(`/projects/${id}`);
  return data;
};
export const createProject = async (formData) => {
  const { data } = await api.post("/projects", formData);
  return data;
};
export const updateProject = async (id, formData) => {
  const { data } = await api.put(`/projects/${id}`, formData);
  return data;
};
export const deleteProject = async (id) => {
  const { data } = await api.delete(`/projects/${id}`);
  return data;
};
