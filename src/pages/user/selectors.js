import { flow } from 'lodash';
import { STATE_REDUCER_KEY } from './constants';

const getUser = (state) => state['user'];


const user = (state) => state?.user;
export const getUserDetails = flow(getUser, user);

const isLoading = (state) => state?.isLoading;
export const getUserLoadingState = flow(getUser, isLoading);

const error = (state) => state?.error;
export const getUserError = flow(getUser, error);


