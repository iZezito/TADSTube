import {toast} from "react-toastify";

export const toastSucesso = (mensagem, time = 3000) => {
    toast.success(mensagem, {
        position: "top-center",
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
    })
}

export const toastErro = (mensagem, time= 3000) => {
    toast.error(mensagem, {
        position: "top-center",
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
    })
}