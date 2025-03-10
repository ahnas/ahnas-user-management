import axios from 'axios';
import queryString from 'query-string';
const baseURL = "http://localhost:5000"


export const getRequest = (URL, payload) => {
  const { data: query = {}, config = {}, } = payload;
  try {

    return axios.get(queryString.stringifyUrl({ url: `${baseURL}/${URL}`, query }), config).then((response) => response).catch((error) => ({ error }));
  }
  catch (err) {
    console.log(err)
  }

};

export const putRequest = (URL, payload) => {
  const { data = {}, config = {}, } = payload;
  try {

    return axios.put(`${baseURL}/${URL}`, data, config).then((response) => response).catch((error) => ({ error }));
  }
  catch (err) {
    return console.log(err)
  }

};

export const postRequest = (URL, payload) => {
  const { data = {}, config = {}, } = payload;
  try {

    return axios.post(`${baseURL}/${URL}`, data, config).then((response) => response).catch((error) => ({ error }));
  }
  catch (err) {
    console.log(err)
  }

};

export const patchRequest = (URL, payload) => {
  const { data = {}, config = {}, } = payload;
  try {

    return axios.patch(`${baseURL}/${URL}`, data, config).then((response) => response).catch((error) => ({ error }));
  }
  catch (err) {
    console.log(err)
  }

};

export const deleteRequest = (URL, payload) => {
  const { data: query = {}, config = {}, } = payload;
  try {

    return axios.delete(queryString.stringifyUrl({ url: `${baseURL}/${URL}`, query }), config).then((response) => response).catch((error) => ({ error }));
  }
  catch (err) {
    console.log(err)
  }

};
