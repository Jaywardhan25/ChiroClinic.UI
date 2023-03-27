import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { AuthReducer } from "./reducers/AuthReducer";
import { CompaniesReducer } from "./reducers/CompaniesReducer";
import { UsersReducer } from "./reducers/UsersReducer";

// Create middlewares based on development/production conditions
let middlewares = [thunk];

if (process.env.NODE_ENV === `development`) {
  const logger = createLogger({
    duration: true,
    diff: false,
    collapsed: true
  });
  middlewares.push(logger);
}

const reducers = combineReducers({
  auth: AuthReducer,
  companies: CompaniesReducer,
  users: UsersReducer
});

//const store = createStore(rootReducers);

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middlewares)));
