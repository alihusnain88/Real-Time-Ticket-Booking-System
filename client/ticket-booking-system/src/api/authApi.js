import axios from "axios";

export const signupUser = async (name, email, password) => {
  const userInfo = await axios.post(
    "http://localhost:3000/api/auth/signup",
    {
      name,
      email,
      password,
    },
    {
      withCredentials: true,
    },
  );
  const user = userInfo.data.user;
  return user;
};

export const loginUser = async (email, password) => {
  const userInfo = await axios.post(
    "http://localhost:3000/api/auth/login",
    {
      email,
      password,
    },
    {
      withCredentials: true,
    },
  );
  const user = userInfo.data.user;
  return user;
};

export const getCurrentUser = async () => {
  const response = await axios.get(
    "http://localhost:3000/api/auth/me",
    {
      withCredentials: true,
    }
  );

  return response.data.user;
};

export const logoutUser = async () => {
  const response = await axios.post(
    "http://localhost:3000/api/auth/logout",
    {},
    {
      withCredentials: true,
    }
  );

  return response.data.message;
};