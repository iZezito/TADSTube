import api from "../service/Configuration";
import {makeAutoObservable, toJS} from "mobx";
import AuthStore from "./AuthStore";

class NoticiaStore {
    comentarioEdit = {autor: '', texto: ''}
    respostaEdit = {autor: '', texto: ''}
    loading = true
    noticias = []
    user = null
    comentarioDeleteId = null
    respostaDeleteId = null
    noticiaAtualId = {}
    comentario = {texto: '', autor: ''}
    respostaComentario = {texto: '', autor: ''}
    noticia = {titulo: '', descricao: '', comentarios:[]}
    noticiaEdit = {titulo: '', descricao: ''}

    constructor() {
        makeAutoObservable(this);
        this.user = localStorage.getItem('user');

    }

    getNoticias() {
        api.get('noticias', {
            headers: {
                'Authorization': 'Bearer ' + AuthStore.getToken
            }
        }).then((response) => {
            this.loading = false
            console.log(response.data)
            this.noticias = response.data
        }).catch((erro) => {
            if (erro.response.status === 401) {
                AuthStore.logout();
            }
        })

    }

    setNoticiaId(noticiaId) {
        this.noticiaAtualId = noticiaId;
    }

    setComentarioEdit(comentario) {
        console.log(comentario);
        this.comentarioEdit.texto = comentario;
        console.log(typeof (this.comentarioEdit))
    }

    setRespostaEdit(respostaComentario) {
        console.log(respostaComentario);
        this.respostaEdit.texto = respostaComentario;
        console.log(typeof (this.respostaComentarioEdit))
    }

    setComentarioDeleteId(comentarioId) {
        this.comentarioDeleteId = comentarioId;
    }

    setRespostaDeleteId(respostaId) {
        this.respostaDeleteId = respostaId;
    }

    deleteRespostaComentario() {
        api.delete(`${this.respostaDeleteId ? 'respostas' : 'comentarios'}/${this.respostaDeleteId ? this.respostaDeleteId : this.comentarioDeleteId}/${ this.respostaDeleteId && this.comentarioDeleteId ? this.comentarioDeleteId : this.noticiaAtualId }`, {
            headers: {
                'Authorization': 'Bearer ' + AuthStore.getToken
            }
        }).then((response) => {
            if (this.respostaDeleteId && this.comentarioDeleteId) {
                this.noticias.forEach((noticia) => {
                    if (noticia.id === this.noticiaAtualId) {
                        noticia.comentarios.forEach((comentario) => {
                            if (comentario.id === this.comentarioDeleteId) {
                                comentario.respostas = comentario.respostas.filter((resposta) => {
                                    return resposta.id !== this.respostaDeleteId
                                })
                            }
                        })
                    }
                })

            } else if (this.comentarioDeleteId) {
                this.noticias.forEach((noticia) => {
                    if (noticia.id === this.noticiaAtualId) {
                        noticia.comentarios = noticia.comentarios.filter((comentario) => {
                            return comentario.id !== this.comentarioDeleteId
                        })
                    }
                })
            }
            console.log(response.data);
            this.respostaDeleteId = null;
            this.comentarioDeleteId = null;
        }).catch((erro) => {
            console.log(erro);
            if (erro.response.status === 401) {
                AuthStore.logout();
            }
        })
    }

    updateResposta(respostaComentarioId) {
        api.patch(`respostas/${respostaComentarioId}`, this.respostaEdit, {
            headers: {
                'Authorization': 'Bearer ' + AuthStore.getToken
            }
        }).then((response) => {
            console.log(response.data);
            this.respostaComentarioEdit.texto = '';
        }).catch((erro) => {
            console.log(erro);
            if (erro.response.status === 401) {
                AuthStore.logout();
            }
        })
    }
    updateComentario(comentarioId) {
        api.patch(`comentarios/${comentarioId}`, this.comentarioEdit, {
            headers: {
                'Authorization': 'Bearer ' + AuthStore.getToken
            }
        }).then((response) => {
            console.log(response.data);
            this.comentarioEdit.texto = '';
        }).catch((erro) => {
            console.log(erro);
            if (erro.response.status === 401) {
                AuthStore.logout();
            }
        })
    }

    setComentario(comentario) {
        console.log(comentario);
        this.comentario.texto = comentario;
        this.comentario.autor = this.user;
        console.log(this.comentario.texto);
        console.log(this.comentario.user);
    }
    setRespostaComentario(respostaComentario) {
        console.log(respostaComentario);
        this.respostaComentario.texto = respostaComentario;
        this.respostaComentario.autor = this.user;
        console.log(this.respostaComentario.texto);
        console.log(this.respostaComentario.user);
    }

    setTituloNoticia(noticia) {
        this.noticia.titulo = noticia;
        console.log(this.noticia.titulo);
    }
    setTextoNoticia(noticia) {
        this.noticia.descricao = noticia;
        console.log(this.noticia.descricao);
        console.log(this.noticia);
    }


    enviarComentario() {
        api.post(`comentarios/${this.noticiaAtualId}`, this.comentario, {
            headers: {
                'Authorization': 'Bearer ' + AuthStore.getToken
            }
        }).then((response) => {
            console.log(response.data);
            this.noticias[this.noticias.findIndex(noticia => noticia.id === this.noticiaAtualId)].comentarios.push(response.data);
            this.comentario.texto = '';
        }).catch((erro) => {
            if (erro.response.status === 401) {
                AuthStore.logout();
            }
        }).finally(() => {
            this.comentario.texto = '';
        })
    }

    enviarRespostaComentario(comentarioId) {
        api.post(`respostas/${comentarioId}`, this.respostaComentario, {
            headers: {
                'Authorization': 'Bearer ' + AuthStore.getToken
            }
        }).then((response) => {
            console.log(response.data);
            this.noticias[this.noticias.findIndex(noticia => noticia.id === this.noticiaAtualId)].comentarios[this.noticias[this.noticias.findIndex(noticia => noticia.id === this.noticiaAtualId)].comentarios.findIndex(comentario => comentario.id === comentarioId)].respostas.push(response.data);
            this.respostaComentario.texto = '';
        }).catch((erro) => {
            console.log('Consolezada:', erro);
            if (erro.response.status === 401) {
                AuthStore.logout();
            }
            console.log(erro);
        })
    }
    enviarNoticia() {
        api.post('noticias',this.noticia, {
            headers: {
                'Authorization': 'Bearer ' + AuthStore.getToken
            }
        }).then((response) => {
            console.log(response.data);
            this.noticias.push(response.data);
            this.noticia.titulo = '';
            this.noticia.texto = '';
        }).catch((erro) => {
            console.log(erro);
            if (erro.response.status === 401) {
                AuthStore.logout();
            }
        })
    }

    getUserName() {
        return this.user;
    }

}

const store = new NoticiaStore();

export default store;
