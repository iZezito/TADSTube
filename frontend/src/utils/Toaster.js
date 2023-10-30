import {toast} from "react-toastify";

export const toastSucesso = (mensagem) => {
    toast.success(mensagem, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
    })
}

export const toastErro = (mensagem) => {
    toast.error(mensagem, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
    })
}