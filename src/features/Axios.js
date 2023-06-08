import axios from "axios";
import BaseUrl from "../Config/BaseUrl";

export const PostRequset =(urls,values)=> {
    return axios ({
    method: 'Post',
    url: `${BaseUrl.url}/${urls}`,
    headers: { 
        'Authorization':`Bearer`,
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data :values
    })
};

export const GetRequset =(urls)=>{
    return axios ({
        method: 'Get',
        url: `${BaseUrl.url}/${urls}`,
        headers: { 
            'Authorization':`Bearer`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
      });
}

export const PatchRequset =(urls,values)=> {
    return axios ({
    method: 'Patch',
    url: `${BaseUrl.url}/${urls}`,
    headers: { 
        'Authorization':`Bearer`,
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data :values
    })
};

