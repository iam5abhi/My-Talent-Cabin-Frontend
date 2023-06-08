import { authFetch } from './intance';
import { errorhandler } from '../../ErrorHandler/ErrorHandler';



authFetch.interceptors.request.use((request) => {
  if (request.url.includes("/admin")) {
    const token = localStorage.getItem('admin-token');
    request.headers.Authorization = token ? `Bearer ${token}` : '';
  } else{
    const token = localStorage.getItem('token');
    request.headers.Authorization = token ? `Bearer ${token}` : '';
  }
  return request;
},
  (error) => {
    let message = errorhandler(error.response)
    return Promise.reject(message);
  }
);

authFetch.interceptors.response.use((response) => {
  return response;
},
  (error) => {
    let message = errorhandler(error.response)
    return Promise.reject(message);
  }
);


export { authFetch }

