import api from ".";

export const createCategory = async (formData) => {
  const { data } = await api.post("/categories", formData);
  return data;
};
export const getCategories = async () => {
  const { data } = await api.get("/categories");
  return data;
};
export const getCategoryId = async (id) => {
  const { data } = await api.get(`/categories/${id}`);
  return data;
};
export const updateCategory = async (id, formData) => {
  const { data } = await api.put(`/categories/${id}`, formData);
  return data;
};
export const deleteCategory = async (id) => {
  const { data } = await api.delete(`/categories/${id}`);
  return data;
};
