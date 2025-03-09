import { createSlice } from '@reduxjs/toolkit';
import { ACTION_TYPES } from './actions'; // Import the action types from your actions file
import { STATE_REDUCER_KEY } from './constants';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  buttonLoading: [], // Track button loading states (if needed)
};

const slice = createSlice({
  name: STATE_REDUCER_KEY, // Dynamic name from constants
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },

    // Reducer to set the loading state
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },

    // Reducer to set the error state
    setError: (state, { payload }) => {
      state.error = payload;
    },

    // Reducer to manage button loading states (e.g., for buttons in forms)
    setButtonLoading: (state, { payload }) => {
      const updatedLoadingState = state.buttonLoading.includes(payload)
        ? state.buttonLoading.filter((id) => id !== payload)
        : [...state.buttonLoading, payload];
      state.buttonLoading = updatedLoadingState;
    },
  },
  extraReducers: (builder) => {
    // Handle Fetch User Actions
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

      .addCase(ACTION_TYPES.UPDATE_USER_EMAIL_REQUEST, (state) => {
        state.isLoading = true;
      })
      .addCase(ACTION_TYPES.UPDATE_USER_EMAIL_SUCCESS, (state, { payload }) => {
        state.isLoading = false;
        state.user.email = payload;
        state.error = null;
      })
      .addCase(ACTION_TYPES.UPDATE_USER_EMAIL_FAILURE, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});


export const {  actions,reducer } = slice; // Export reducer
