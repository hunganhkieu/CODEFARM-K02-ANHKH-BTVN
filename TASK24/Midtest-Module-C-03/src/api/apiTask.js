import api from ".";

export const getTaskId = async (id) => {
  const { data } = await api.get(`/tasks/${id}`);
  return data;
};
export const createTask = async (formData) => {
  const { data } = await api.post("/tasks", formData);
  return data;
};
export const updateTask = async (id, formData) => {
  const { data } = await api.put(`/tasks/${id}`, formData);
  return data;
};
export const deleteTask = async (id) => {
  const { data } = await api.delete(`/tasks/${id}`);
  return data;
};
