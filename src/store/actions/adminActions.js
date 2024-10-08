/** @format */

import actionTypes from "./actionTypes";
import { getAllCodeService, createNewUserService, getAllUsers, deleteUserService, editUserService } from "../../services/userService";
// export const fetchGenderStart = () => ({
//       type: actionTypes.FETCH_GENDER_START,
// });
import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
export const fetchGenderStart = () => {
      return async (dispatch, getState) => {
            try {
                  dispatch({ type: actionTypes.FETCH_GENDER_START });
                  let res = await getAllCodeService("GENDER");

                  if (res && res.errCode === 0) {
                        dispatch(fetchGenderSuccess(res.data));
                  } else {
                        dispatch(fetchGenderFailed());
                  }
            } catch (e) {
                  dispatch(fetchGenderFailed());
                  // console.log("fetchGenderStart error", e);
            }
      };
};

export const fetchGenderSuccess = (genderData) => ({
      type: actionTypes.FETCH_GENDER_SUCCESS,
      data: genderData,
});

export const fetchGenderFailed = () => ({
      type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionStart = () => {
      return async (dispatch, getState) => {
            try {
                  let res = await getAllCodeService("POSITION");

                  if (res && res.errCode === 0) {
                        dispatch(fetchPositionSuccess(res.data));
                  } else {
                        dispatch(fetchPositionFailed());
                  }
            } catch (e) {
                  dispatch(fetchPositionFailed());
                  // console.log("fetchPositionStart error", e);
            }
      };
};

export const fetchPositionSuccess = (positionData) => ({
      type: actionTypes.FETCH_POSITION_SUCCESS,
      data: positionData,
});

export const fetchPositionFailed = () => ({
      type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleStart = () => {
      return async (dispatch, getState) => {
            try {
                  let res = await getAllCodeService("ROLE");

                  if (res && res.errCode === 0) {
                        dispatch(fetchRoleSuccess(res.data));
                  } else {
                        dispatch(fetchRoleFailed());
                  }
            } catch (e) {
                  dispatch(fetchRoleFailed());
                  console.log("fetchRoleStart error", e);
            }
      };
};
export const fetchRoleSuccess = (roleData) => ({
      type: actionTypes.FETCH_ROLE_SUCCESS,
      data: roleData,
});

export const fetchRoleFailed = () => ({
      type: actionTypes.FETCH_ROLE_FAILED,
});
export const createNewUser = (data) => {
      return async (dispatch, getState) => {
            try {
                  let res = await createNewUserService(data);
                  console.log("hoidanit check create user redux: ", res);
                  if (res && res.errCode === 0) {
                        dispatch(saveUserSuccess());
                        dispatch(fetchAllUserStart());
                        toast.success("Tạo mới thành công!");
                  } else {
                        dispatch(saveUserFailed());
                  }
            } catch (e) {
                  dispatch(saveUserFailed());
                  console.log("saveUserFailed error", e);
            }
      };
};

export const saveUserSuccess = () => ({
      type: actionTypes.CREATE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
      type: actionTypes.CREATE_USER_FAILED,
});
export const fetchAllUserStart = () => {
      return async (dispatch, getState) => {
            try {
                  let res = await getAllUsers("ALL");

                  if (res && res.errCode === 0) {
                        dispatch(fetchAllUserSuccess(res.users.reverse()));
                  } else {
                        dispatch(fetchAllUserFailed());
                  }
            } catch (e) {
                  dispatch(fetchAllUserFailed());
                  // console.log("fetchAllUserFailed error", e);
            }
      };
};
export const fetchAllUserSuccess = (data) => ({
      type: actionTypes.FETCH_ALL_USERS_SUCCESS,
      users: data,
});

export const fetchAllUserFailed = () => ({
      type: actionTypes.FETCH_ALL_USERS_FAILED,
});

export const deleteAUser = (userId) => {
      return async (dispatch, getState) => {
            try {
                  let res = await deleteUserService(userId);
                  // console.log("hoidanit check create user redux: ", res);
                  if (res && res.errCode === 0) {
                        dispatch(deleteUserSuccess());
                        dispatch(fetchAllUserStart());
                        toast.success("xóa người dùng thành công!");
                  } else {
                        dispatch(deleteUserFailed());
                        toast.error("xóa người dùng không thành công!");
                  }
            } catch (e) {
                  dispatch(deleteUserFailed());
                  // console.log("deleteUserFailed error", e);
            }
      };
};
export const deleteUserSuccess = () => ({
      type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
      type: actionTypes.DELETE_USER_FAILED,
});

export const editAUser = (userId) => {
      return async (dispatch, getState) => {
            try {
                  let res = await editUserService(userId);
                  // console.log("hoidanit check create user redux: ", res);
                  if (res && res.errCode === 0) {
                        dispatch(editAUserSuccess());
                        dispatch(fetchAllUserStart());
                        toast.success("Update người dùng thành công!");
                  } else {
                        dispatch(editAUserFailed());
                        toast.error("Update người dùng không thành công!");
                  }
            } catch (e) {
                  dispatch(deleteUserFailed());
                  // console.log("deleteUserFailed error", e);
            }
      };
};
export const editAUserSuccess = () => ({
      type: actionTypes.EDIT_USER_SUCCESS,
});

export const editAUserFailed = () => ({
      type: actionTypes.EDIT_USER_FAILED,
});
