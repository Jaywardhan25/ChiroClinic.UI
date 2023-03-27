import {
  ADD_COMPANIES_BEGIN,
  ADD_COMPANIES_FAILED,
  ADD_COMPANIES_SUCCESS,
  FETCH_COMPANIES_BEGIN,
  FETCH_COMPANIES_FAILED,
  FETCH_COMPANIES_SUCCESS,
} from "../types/Companies";

const initialState = {
  companies: [],
  errorMessage: "",
  successMessage: "",
  showLoading: false,
};

export function CompaniesReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_COMPANIES_BEGIN:
      return {
        ...state,
        companies: [],
        showLoading: true,
      };
    case FETCH_COMPANIES_SUCCESS:
      return {
        ...state,
        companies: payload,
        showLoading: false,
      };
    case FETCH_COMPANIES_FAILED:
      return {
        ...state,
        companies: [],
        showLoading: false,
      };

    case ADD_COMPANIES_BEGIN:
      return {
        ...state,
        showLoading: true,
      };
    case ADD_COMPANIES_SUCCESS:
      return {
        ...state,
        showLoading: false,
      };
    case ADD_COMPANIES_FAILED:
      return {
        ...state,
        showLoading: false,
      };

    default:
      return state;
  }
}
