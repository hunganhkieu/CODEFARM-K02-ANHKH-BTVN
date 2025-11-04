import api from ".";

export const createLesson = async (formData) => {
  const { data } = await api.post("/lessons", formData);
  return data;
};
export const updateLesson = async (id, formData) => {
  const { data } = await api.patch(`/lessons/${id}`, formData);
  return data;
};
export const getLessonId = async (id) => {
  const { data } = await api.get(`/lessons/${id}`);
  return data;
};
export const deleteLesson = async (id) => {
  const { data } = await api.delete(`/lessons/${id}`);
  return data;
};
