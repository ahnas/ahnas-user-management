import { call, put } from "redux-saga/effects";
import { createAction } from "@reduxjs/toolkit";
import { REQUEST_METHOD } from "../pages/user/constants";
import { getRequest, postRequest, putRequest } from "../app/axios";
const getApiMethod = (method) => {
  switch (method) {
    case REQUEST_METHOD.PUT:
      return putRequest;
    case REQUEST_METHOD.POST:
      return postRequest;
    default:
      return getRequest;
  }
};
export function* handleAPIRequest(apiFn, ...rest) {
  const { method, url, payload } = apiFn(...rest);

  const [requestType, successType, failureType] = payload.types;

  const requestAction = createAction(requestType);
  const successAction = createAction(successType);
  const failureAction = createAction(failureType);

  try {

    yield put(requestAction({ isLoading: true }));
    const res = yield call(getApiMethod(method), url, payload);

    const { data: response, error } = res;

    if (error) {
      yield put(failureAction({ error, isLoading: false }));
      return { response: {}, error };
    }


    yield put(successAction({
      data: response,
      isLoading: false,
    }));

    return { response, error: null };

  } catch (err) {

    yield put(failureAction({
      error: err.message || 'An unexpected error occurred',
      isLoading: false,
    }));
    return { response: {}, error: err };
  }
}
