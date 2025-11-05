import api from ".";

export const createProduct = async (formData) => {
  const { data } = await api.post("/products", formData);
  return data;
};
export const updateProduct = async (id, formData) => {
  const { data } = await api.put(`/products/${id}`, formData);
  // console.log(data);
  return data;
};
export const getProductId = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};
export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};
