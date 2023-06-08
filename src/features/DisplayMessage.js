import { toast} from 'react-toastify';

const ToastSucess =(message)=>{
    toast.success(message,{
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme:'colored'
  });
}

const ToastError =(error)=>{
    toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme:'colored'
      });
}

export {ToastSucess,ToastError}