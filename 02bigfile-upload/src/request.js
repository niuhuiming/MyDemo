import axios from 'axios';

const baseURL = 'http://localhost:3000';

export const uploadFile = (url, formData, onUploadProgress) => {
  return axios({
    method: 'post',
    url,
    baseURL,
    data: formData,
    onUploadProgress,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const mergeChunks = (url, data) => {
  return axios({
    method: 'post',
    url,
    baseURL,
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}