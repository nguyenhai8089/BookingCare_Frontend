/** @format */

import axios from "../axios";
// const handleLoginApi = (userEmail, userPassword) => {
//     return axios.post('/api/login',{email:userEmail, password:userPassword})
// }

const handleLoginApi = (email, password) => {
      return axios.post("/api/login", { email, password });
};

const getAllUsers = (inputId) => {
      // template string
      return axios.get(`/api/get-all-users?id=${inputId}`);
};
const createNewUserService = (data) => {
      // console.log("check data from service: ", data);
      return axios.post("/api/create-new-user", data);
};
const deleteUserService = (userId) => {
      // console.log("check delete data from service: ", userId);
      return axios.delete("/api/delete-user", { data: { id: userId } });
};
const editUserService = (inputData) => {
      return axios.put("/api/edit-user", inputData);
};
const getAllCodeService = (inputType) => {
      return axios.get(`/api/allcode?type=${inputType}`);
};
export { handleLoginApi, getAllUsers, createNewUserService, deleteUserService, editUserService, getAllCodeService };
