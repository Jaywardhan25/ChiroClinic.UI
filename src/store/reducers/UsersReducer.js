import {
  ADD_USERS_BEGIN,
  ADD_USERS_FAILED,
  ADD_USERS_SUCCESS,
  FETCH_USERS_BEGIN,
  FETCH_USERS_FAILED,
  FETCH_USERS_SUCCESS,
  UPDATE_USERS_BEGIN,
  UPDATE_USERS_FAILED,
  UPDATE_USERS_SUCCESS,
} from "../types/Users";

const initialState = {
  users: [],
  errorMessage: "",
  successMessage: "",
  showLoading: false,
};

export function UsersReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_USERS_BEGIN:
      return {
        ...state,
        users: [],
        showLoading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: payload,
        showLoading: false,
      };
    case FETCH_USERS_FAILED:
      return {
        ...state,
        users: [],
        showLoading: false,
      };

    case ADD_USERS_BEGIN:
      return {
        ...state,
        showLoading: true,
      };
    case ADD_USERS_SUCCESS:
      return {
        ...state,
        showLoading: false,
      };
    case ADD_USERS_FAILED:
      return {
        ...state,
        showLoading: false,
      };

    case UPDATE_USERS_BEGIN:
      return {
        ...state,
        showLoading: true,
      };
    case UPDATE_USERS_SUCCESS:
      return {
        ...state,
        showLoading: false,
      };
    case UPDATE_USERS_FAILED:
      return {
        ...state,
        showLoading: false,
      };

    default:
      return state;
  }
}
