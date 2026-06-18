export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  const data = localStorage.getItem("user");
  return data ? JSON.parse(data) : null;
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token") || null;
};

export const setPosts = (posts) => {
  localStorage.setItem("posts", JSON.stringify(posts));
};

export const getPosts = () => {
  const data = localStorage.getItem("posts");
  return data ? JSON.parse(data) : [];
};

export const clearStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("posts");
};
