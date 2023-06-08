import { authFetch } from "../Middleware/axios/intance";

export const GetProfileDatas = async (url)=>{
    try {
      const resp = await authFetch.get(url);
      return resp.data.data
    } catch (error) {
      console.log(error)
    }
}