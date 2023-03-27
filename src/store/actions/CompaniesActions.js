import {
  ADD_COMPANIES_BEGIN,
  ADD_COMPANIES_FAILED,
  ADD_COMPANIES_SUCCESS,
  DELETE_COMPANIES_BEGIN,
  DELETE_COMPANIES_FAILED,
  DELETE_COMPANIES_SUCCESS,
  FETCH_COMPANIES_BEGIN,
  FETCH_COMPANIES_FAILED,
  FETCH_COMPANIES_SUCCESS,
} from "../types/Companies";
import * as service from "../../services/CompaniesService";

export const fetchCompanies = () => async (dispatch) => {
  dispatch({ type: FETCH_COMPANIES_BEGIN });
  service
    .fetchCompanies()
    .then((res) => {
      const companies = res.data;
      dispatch({ type: FETCH_COMPANIES_SUCCESS, payload: companies });
    })
    .catch((error) => {
      dispatch({ type: FETCH_COMPANIES_FAILED, payload: error.message });
    });
};

export const addCompany = (data) => async (dispatch) => {
  dispatch({ type: ADD_COMPANIES_BEGIN });
  service
    .addCompany(data)
    .then((res) => {
      dispatch({ type: ADD_COMPANIES_SUCCESS });
      dispatch(fetchCompanies());
    })
    .catch((error) => {
      dispatch({ type: ADD_COMPANIES_FAILED, payload: error.message });
    });
};

export const deleteCompany = (id) => async (dispatch) => {
  dispatch({ type: DELETE_COMPANIES_BEGIN });
  service
    .deleteCompany(id)
    .then((res) => {
      dispatch({ type: DELETE_COMPANIES_SUCCESS });
      dispatch(fetchCompanies());
    })
    .catch((error) => {
      dispatch({ type: DELETE_COMPANIES_FAILED, payload: error.message });
    });
};
  