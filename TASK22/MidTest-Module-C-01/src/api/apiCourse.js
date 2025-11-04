import api from ".";

export const createCourse = async (formData) => {
  const { data } = await api.post("/courses", formData);
  return data;
};
export const deleteCourse = async (id) => {
  const { data } = await api.delete(`/courses/${id}`);
  return data;
};
export const getCourseId = async (id) => {
  const { data } = await api.get(`/courses/${id}`);
  return data;
};
export const updateCourse = async (id, formData) => {
  const { data } = await api.patch(`/courses/${id}`, formData);
  return data;
};
