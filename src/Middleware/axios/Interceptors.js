import { authFetch } from './intance';
import { errorhandler } from '../../ErrorHandler/ErrorHandler';

authFetch.interceptors.request.use((request) => {
  switch (true) {
    case request.url.includes("/admin/"):
      const token = localStorage.getItem('admin-token');
      request.headers.Authorization = token ? `Bearer ${token}` : '';
      break;
    case request.url.includes('/company'):
      const companyToken = localStorage.getItem('company-token');
      request.headers.Authorization = companyToken ? `Bearer ${companyToken}` : '';
      break;
    case request.url.includes('/mentor'):
        const mentorToken = localStorage.getItem('mentor-token');
        request.headers.Authorization = mentorToken ? `Bearer ${mentorToken}` : '';
        break;
    case request.url.includes("/student"):
      const studentToken = localStorage.getItem('token');
      request.headers.Authorization = studentToken ? `Bearer ${studentToken}` : '';
      break;  
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

