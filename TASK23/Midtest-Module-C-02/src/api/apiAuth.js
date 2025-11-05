import api from ".";

export const postRegister = async (formData) => {
  const { data } = await api.post("/auth/register", formData);
  return data;
};
export const postLogin = async (formData) => {
  const { data } = await api.post("/login", formData);
  return data;
};
