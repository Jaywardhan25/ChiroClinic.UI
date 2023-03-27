import ax from "./AxiosInstance";

export const fetchUsers = async () => {
  return await ax.get(`/api/User/GetUsers`);
};

export const addUser = async (data) => {
  return await ax.post("/api/User/AddUser", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateUser = async (data) => {
  return await ax.put("/api/User/UpdateUser", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteUser = async (id) => {
  return await ax.delete(`/api/User/DeleteUser?guid=${id}`);
};
