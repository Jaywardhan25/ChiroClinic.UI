import ax from "../services/AxiosInstance";

export const fetchCompanies = async () => {
  return await ax.get(`/api/Company/GetAllCompany`);
};

export const addCompany = async (data) => {
  return await ax.post("/api/Company/AddCompany", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteCompany = async (id) => {
  return await ax.delete(`/api/Company/DeleteCompany?id=${id}`);
};

