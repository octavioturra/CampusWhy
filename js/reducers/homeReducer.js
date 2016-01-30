/*
 * The reducer takes care of our data
 * Using actions, we can change our application state
 * To add a new action, add it to the switch statement in the homeReducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return assign({}, state, {
 *       stateVariable: action.var
 *   });
 *
 * To add a new reducer, add a file like this to the reducers folder, and
 * add it in the rootReducer.js.
 */

import {
  LOGOUT,
  LOGIN_REQUEST,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  ANONIMOUS_LOGIN_REQUEST,
  ANONIMOUS_LOGIN_ERROR,
  ANONIMOUS_LOGIN_SUCCESS,
  TOKEN_LOGIN_REQUEST,
  TOKEN_LOGIN_ERROR,
  TOKEN_LOGIN_SUCCESS,
  GET_REASONS_REQUEST,
  GET_REASONS_ERROR,
  GET_REASONS_BIND,
  GET_PROFESSIONS_REQUEST,
  GET_PROFESSIONS_ERROR,
  GET_PROFESSIONS_BIND,
  SET_REASONS_REQUEST,
  SET_REASONS_ERROR,
  SET_REASONS_SUCCESS,
  SET_PROFESSIONS_REQUEST,
  SET_PROFESSIONS_ERROR,
  SET_PROFESSIONS_SUCCESS,
  ADD_ANSWER_REQUEST,
  ADD_ANSWER_ERROR,
  ADD_ANSWER_SUCCESS,
} from '../constants/AppConstants';
import assignToEmpty from '../utils/assign';

const initialState = {
  isFetching: false,
  error: null,
  loginData: null,
  authToken: null,
  reasons: [],
  professions: [],
  sent: 0,
  form: {
    reason: null,
    nps: null,
    npsReason: null,
    genre: null,
    profission: null,
    contactType: null,
    contact: null,
    photoUrl: null,
    free: null
  },
  added: []
};

function homeReducer(state = initialState, action) {
  // Object.freeze(state); // Don't mutate state directly, always use assign()!
  switch (action.type) {
    case LOGIN_REQUEST:
    case ANONIMOUS_LOGIN_REQUEST:
    case TOKEN_LOGIN_REQUEST:
    case GET_REASONS_REQUEST:
    case GET_PROFESSIONS_REQUEST:
    case SET_REASONS_REQUEST:
    case SET_REASONS_REQUEST:
    case ADD_ANSWER_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case LOGIN_ERROR:
    case ANONIMOUS_LOGIN_ERROR:
    case TOKEN_LOGIN_ERROR:
    case GET_REASONS_ERROR:
    case GET_PROFESSIONS_ERROR:
    case SET_REASONS_ERROR:
    case SET_REASONS_ERROR:
    case ADD_ANSWER_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        loginData: null,
        authToken: null
      };
    case LOGIN_SUCCESS:
    case ANONIMOUS_LOGIN_SUCCESS:
    case TOKEN_LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        loginData: action.payload.email,
        authToken: action.payload.token
      };
      case GET_REASONS_BIND:
      return {
        ...state,
        isFetching: false,
        error: null,
        reasons: [...new Set([...state.reasons, ...action.payload])]
      };
      case GET_PROFESSIONS_BIND:
      return {
        ...state,
        isFetching: false,
        error: null,
        professions: [...new Set([...state.professions, ...action.payload])]
      };
      case SET_REASONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
      }
      case SET_REASONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
      }
      case ADD_ANSWER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        sent: state.sent + 1
      }
    default:
      return state;
  }
}

export default homeReducer;
