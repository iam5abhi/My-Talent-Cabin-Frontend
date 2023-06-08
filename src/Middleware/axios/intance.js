import axios from 'axios';
import BaseUrl from '../../Config/BaseUrl';

  
export const authFetch = axios.create({
  baseURL: BaseUrl.url,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
});
