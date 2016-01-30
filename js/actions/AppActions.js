/*
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your appliction state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 * 3) (optional) Add an async function like this:
 *    export function asyncYourAction(var) {
 *        return (dispatch) => {
 *             // Do async stuff here
 *             return dispatch(yourAction(var));
 *        };
 *    }
 *
 *    If you add an async function, remove the export from the function
 *    created in the second step
 */

// Disable the no-use-before-define eslint rule for this file
// It makes more sense to have the asnyc actions before the non-async ones
/* eslint-disable no-use-before-define */


import Db from '../services';
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

export function logout(){
  return {
    type: LOGOUT
  };
}

function loginRequest(){
  return {
    type: LOGIN_REQUEST
  };
}
function loginSuccess(data){
  return {
    type: LOGIN_SUCCESS,
    payload: data
  };
}
function loginError(err){
  return {
    type: LOGIN_ERROR,
    payload: err
  };
}

export function asyncLogin(user, password){
  return dispatch => {
    dispatch(loginRequest());
    (new Db()).login(user, password)
    .then((authData)=>dispatch(loginSuccess(authData)))
    // .catch((err)=>dispatch(loginError(err)));
    // .catch((err)=>dispatch(loginRequest(err)))
  }
}

function anonimousLoginRequest(){
  return {
    type: ANONIMOUS_LOGIN_REQUEST
  };
}
function anonimousLoginSuccess(data){
  return {
    type: ANONIMOUS_LOGIN_SUCCESS,
    payload: data
  };
}
function anonimousLoginError(err){
  return {
    type: ANONIMOUS_LOGIN_ERROR,
    payload: err
  };
}

export function asyncAnonimousLogin(){
  return dispatch => {
    dispatch(anonimousLoginRequest());
    (new Db()).anonimousLogin()
    .then((authData)=>dispatch(anonimousLoginSuccess(authData)))
    // .catch((err)=>dispatch(loginError(err)));
    // .catch((err)=>dispatch(loginRequest(err)))
  }
}

function tokenLoginRequest(){
  return {
    type: TOKEN_LOGIN_REQUEST
  };
}
function tokenLoginSuccess(data){
  return {
    type: TOKEN_LOGIN_SUCCESS,
    payload: data
  };
}
function tokenLoginError(err){
  return {
    type: TOKEN_LOGIN_ERROR,
    payload: err
  };
}

export function asyncTokenLogin(email, token){
  return dispatch => {
    dispatch(tokenLoginRequest());
    (new Db()).tokenLogin(email, token)
    .then((authData)=>dispatch(tokenLoginSuccess(authData)))
    // .catch((err)=>dispatch(loginError(err)));
    // .catch((err)=>dispatch(loginRequest(err)))
  }
}

function getReasonsRequest(){
  return {
    type: GET_REASONS_REQUEST
  };
}
function getReasonsBind(data){
  return {
    type: GET_REASONS_BIND,
    payload: data
  };
}
function getReasonsError(err){
  return {
    type: GET_REASONS_ERROR,
    payload: err
  };
}

export function asyncGetReasons(){
  return dispatch => {
    dispatch(getReasonsRequest());
    (new Db()).getReasons()
    .then((data)=>dispatch(getReasonsBind(data)))
    // .catch((err)=>dispatch(getReasonsError(err)));
    // .catch((err)=>dispatch(getReasonsRequest(err)))
  }
}

function getProfessionsRequest(){
  return {
    type: GET_PROFESSIONS_REQUEST
  };
}
function getProfessionsBind(data){
  return {
    type: GET_PROFESSIONS_BIND,
    payload: data
  };
}
function getProfessionsError(err){
  return {
    type: GET_PROFESSIONS_ERROR,
    payload: err
  };
}

export function asyncGetProfessions(){
  return dispatch => {
    dispatch(getProfessionsRequest());
    (new Db()).getProfessions()
    .then((data)=>dispatch(getProfessionsBind(data)))
    // .catch((err)=>dispatch(getProfessionsError(err)));
    // .catch((err)=>dispatch(getProfessionsRequest(err)))
  }
}

function setReasonsRequest(){
  return {
    type: SET_REASONS_REQUEST
  };
}
function setReasonsSuccess(data){
  return {
    type: SET_REASONS_SUCCESS,
    payload: data
  };
}
function setReasonsError(err){
  return {
    type: SET_REASONS_ERROR,
    payload: err
  };
}

export function asyncSetReasons(reason){
  return dispatch => {
    dispatch(setReasonsRequest());
    (new Db()).setReasons(reason)
    .then((data)=>{
      dispatch(setReasonsSuccess(data));
      dispatch(asyncGetReasons());
    })
    // .catch((err)=>dispatch(getProfessionsError(err)));
    // .catch((err)=>dispatch(getProfessionsRequest(err)))
  }
}

function setProfessionsRequest(){
  return {
    type: SET_PROFESSIONS_REQUEST
  };
}
function setProfessionsSuccess(data){
  return {
    type: SET_PROFESSIONS_SUCCESS,
    payload: data
  };
}
function setProfessionsError(err){
  return {
    type: GET_PROFESSIONS_ERROR,
    payload: err
  };
}

export function asyncSetProfessions(profession){
  return dispatch => {
    dispatch(setProfessionsRequest());
    (new Db()).setProfessions(profession)
    .then((data)=>{
      dispatch(setProfessionsSuccess(data))
      dispatch(asyncGetProfessions());
    })
    // .catch((err)=>dispatch(getProfessionsError(err)));
    // .catch((err)=>dispatch(getProfessionsRequest(err)))
  }
}

function addAnswerRequest(){
  return {
    type: ADD_ANSWER_REQUEST
  };
}
function addAnswerSuccess(data){
  return {
    type: ADD_ANSWER_SUCCESS,
    payload: data
  };
}
function addAnswerError(err){
  return {
    type: ADD_ANSWER_ERROR,
    payload: err
  };
}

export function asyncAddAnswer(data){
  return dispatch => {
    dispatch(addAnswerRequest());
    (new Db()).addAnswer(data)
    .then(()=>dispatch(addAnswerSuccess()))
    // .catch((err)=>dispatch(getProfessionsError(err)));
    // .catch((err)=>dispatch(getProfessionsRequest(err)))
  }
}
