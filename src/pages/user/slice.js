import { createSlice } from '@reduxjs/toolkit';
import { ACTION_TYPES } from './actions'; 
import { STATE_REDUCER_KEY } from './constants';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  buttonLoading: [],
};

const slice = createSlice({
  name: STATE_REDUCER_KEY,
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },

  
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },

  
    setError: (state, { payload }) => {
      state.error = payload;
    },

  
    setButtonLoading: (state, { payload }) => {
      const updatedLoadingState = state.buttonLoading.includes(payload)
        ? state.buttonLoading.filter((id) => id !== payload)
        : [...state.buttonLoading, payload];
      state.buttonLoading = updatedLoadingState;
    },
  },
  extraReducers: (builder) => {
  
    builder
      .addCase(ACTION_TYPES.FETCH_USERS_REQUEST, (state) => {
        state.isLoading = true;
      })
      .addCase(ACTION_TYPES.FETCH_USERS_SUCCESS, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.data;
        state.error = null;
      })
      .addCase(ACTION_TYPES.FETCH_USERS_FAILURE, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(ACTION_TYPES.FETCH_USER_REQUEST, (state) => {
        state.isLoading = true;
      })
      .addCase(ACTION_TYPES.FETCH_USER_SUCCESS, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.data;
        state.error = null;
      })
      .addCase(ACTION_TYPES.FETCH_USER_FAILURE, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(ACTION_TYPES.CREATE_USER_REQUEST, (state) => {
        state.isLoading = true;
      })
      .addCase(ACTION_TYPES.CREATE_USER_SUCCESS, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
        state.error = null;
      })
      .addCase(ACTION_TYPES.CREATE_USER_FAILURE, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(ACTION_TYPES.UPDATE_USER_REQUEST, (state) => {
        state.isLoading = true;
      })
      .addCase(ACTION_TYPES.UPDATE_USER_SUCCESS, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
        state.error = null;
      })
      .addCase(ACTION_TYPES.UPDATE_USER_FAILURE, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});


export const { actions, reducer } = slice;
