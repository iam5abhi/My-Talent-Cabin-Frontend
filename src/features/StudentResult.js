import { authFetch } from "../Middleware/axios/intance";
import { StudentToken } from "./Token";


const GetCategoryData = async ()=>{
    try {
      const resp = await authFetch.get(`/api/student/profile`);
      return resp.data.data.result
    } catch (error) {
      console.log(error)
    }
}

export default GetCategoryData;