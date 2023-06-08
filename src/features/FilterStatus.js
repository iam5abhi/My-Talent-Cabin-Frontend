export const getfunction =(Doctordata,status)=>{
  console.log(status)
    return Doctordata=Doctordata.filter(data=>data.status===status)
  }