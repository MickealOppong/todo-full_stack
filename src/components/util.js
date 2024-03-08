import axios from "axios";


export const api = axios.create({
  baseURL: 'http://localhost:3000'

})


api.interceptors.request.use(
  (config) => {
    const token = retrieveToken('tk')
    //console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/*

appFetch.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('rtk');
        const response = await axios.post('/api/auth/refreshToken', { refreshToken });
        const { token } = response.data;

        saveTk(token)

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (error) {
        // Handle refresh token error or redirect to login
      }
    }

    return Promise.reject(error);
  }
);
*/

export const retrieveToken = (name) => {
  return localStorage.getItem(name);
}

export const saveTk = (name, token) => {
  localStorage.setItem(name, token);
}
