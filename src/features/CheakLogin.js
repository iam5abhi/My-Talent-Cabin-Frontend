const fn =(Token,role)=>{
    localStorage.setItem("token",Token,true)
      //  setTimeout(() => {
      //   // window.location.href=`/auth/${role}`
      //   navigate(-1)
      //  },1000);  
}

export const CheakLogin = (data) => {
    switch (data.data.user.role) {
        case "student":
            fn(data.token,data.data.user.role) 
          break;
        case "mentor":
            fn(data.token,data.data.user.role) 
          break;
        case "campus":
            fn(data.token,data.data.user.role) 
          break; 
        case "enterprise":
            fn(data.token,data.data.user.role) 
            break; 
      }

}
