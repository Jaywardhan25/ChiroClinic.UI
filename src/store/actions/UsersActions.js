import {
  ADD_USERS_BEGIN,
  ADD_USERS_FAILED,
  ADD_USERS_SUCCESS,
  DELETE_USERS_BEGIN,
  DELETE_USERS_FAILED,
  DELETE_USERS_SUCCESS,
  FETCH_USERS_BEGIN,
  FETCH_USERS_FAILED,
  FETCH_USERS_SUCCESS,
  UPDATE_USERS_BEGIN,
  UPDATE_USERS_FAILED,
  UPDATE_USERS_SUCCESS,
} from "../types/Users";
import * as service from "../../services/UsersService";

export const fetchUsers = () => async (dispatch) => {
  dispatch({ type: FETCH_USERS_BEGIN });
  return service
    .fetchUsers()
    .then((res) => {
      const { data } = res;
      dispatch({ type: FETCH_USERS_SUCCESS, payload: data });
      return res;
    })
    .catch((error) => {
      dispatch({ type: FETCH_USERS_FAILED, payload: error.message });
      throw error;
    });
};

export const addUser = (data) => async (dispatch) => {
  dispatch({ type: ADD_USERS_BEGIN });
  return service
    .addUser(data)
    .then((res) => {
      dispatch({ type: ADD_USERS_SUCCESS });
      dispatch(fetchUsers());
      return res;
    })
    .catch((error) => {
      dispatch({ type: ADD_USERS_FAILED, payload: error.message });
      throw error;
    });
};

export const updateUser = (data) => async (dispatch) => {
  dispatch({ type: UPDATE_USERS_BEGIN });
  return service
    .updateUser(data)
    .then((res) => {
      dispatch({ type: UPDATE_USERS_SUCCESS });
      dispatch(fetchUsers());
      return res;
    })
    .catch((error) => {
      dispatch({ type: UPDATE_USERS_FAILED, payload: error.message });
      throw error;
    });
};

export const deleteUser = (id) => async (dispatch) => {
  dispatch({ type: DELETE_USERS_BEGIN });
  return service
    .deleteUser(id)
    .then((res) => {
      dispatch({ type: DELETE_USERS_SUCCESS });
      dispatch(fetchUsers());
      return res;
    })
    .catch((error) => {
      dispatch({ type: DELETE_USERS_FAILED, payload: error.message });
      throw error;
    });
};
