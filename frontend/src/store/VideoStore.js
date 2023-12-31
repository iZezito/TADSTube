import api from "../service/Configuration";
import {makeAutoObservable} from "mobx";
import AuthStore from "./AuthStore";
import {toastErro, toastSucesso} from "../utils/Toaster";


class VideoStore {

        videos = []
        editing = false
        videosOfCanal = []
        idUser = null
        videoData = { titulo: '', descricao: '', usuario: { id: undefined }, dataUpload: new Date()}
        file = undefined
        thumbnail = undefined
        uploadProgress = 0
        thumbURL = undefined
        videoEdit = { idVideo: undefined, titulo: '', descricao: '', usuario: { id: undefined }, dataUpload: new Date()}
        videoView = { idVideo: undefined, titulo: '', descricao: '', usuario: { id: undefined }, dataUpload: new Date(), url:''}
        comentarios = []
        comentario = {texto: '', usuario: { id: undefined }, video: { id: undefined }, dataComentario: new Date()}
        resposta = {texto: '', usuario: { id: undefined }, dataResposta: new Date()}
        comentarioEdit = { idComentario: undefined, texto: '', usuario: { id: undefined }, video: { id: undefined }}
        respostaEdit = { idResposta: undefined, texto: '', usuario: { id: undefined }}
        comentarioDeleteId = null
        respostaDeleteId = null
        query = '';
        loading = false;
        videosSearch = []

    

        constructor() {
            makeAutoObservable(this);
            this.idUser = localStorage.getItem('idUser');
        }

        setQuery(query) {
            this.query = query;
        }

        searchVideos() {
            this.loading = true;
            api.get(`videos/search/${this.query}`, {
                headers: {
                    'Authorization': 'Bearer ' + AuthStore.getToken
                }
            }).then((response) => {
                this.videosSearch = response.data;
                console.log('vídeos retornados na pesquisa', this.videosSearch);
            }).catch((erro) => {
                console.log(erro);
            }).finally(() => {
                this.loading = false;
            });
        }

        editarResposta(idResposta, novoTexto) {
            // Iterar sobre cada comentário na lista
            for (let i = 0; i < this.comentarios.length; i++) {
                const comentario = this.comentarios[i];

                // Iterar sobre cada resposta no comentário
                for (let j = 0; j < comentario.respostas.length; j++) {
                    const resposta = comentario.respostas[j];

                    // Verificar se o ID da resposta coincide
                    if (resposta.idResposta === idResposta) {
                        // Atualizar o texto da resposta
                        resposta.texto = novoTexto;

                        // Agora você sabe a qual comentário a resposta pertence
                        console.log('Resposta editada no comentário:', comentario);

                        // Aqui você pode retornar ou fazer outras operações necessárias
                        return;
                    }
                }
            }

            // Se você chegou até aqui, a resposta não foi encontrada
            console.error('Resposta não encontrada');
        }


            getVideos() {
                api.get('videos', {
                    headers: {
                        'Authorization': 'Bearer ' + AuthStore.getToken
                    }
                }).then((response) => {
                    console.log(response.data)
                    this.videos = response.data
                }).catch((erro) => {
                    if (erro.response.status === 403) {
                        AuthStore.logout();
                    }
                })

            }

        setTitulo(titulo) {
            this.videoData.titulo = titulo;
            console.log('valor atual', this.videoData.titulo);
            console.log('valor do front', titulo);
        }

        setDescricao(descricao) {
            this.videoData.descricao = descricao;

        }

        setFile(file) {
            this.file = file;
        }

        setThumbnail(thumbnail) {
            this.thumbnail = thumbnail;
            this.thumbURL = URL.createObjectURL(thumbnail);
            console.log('thumbnail', this.thumbnail);
            console.log('thumbnail front', thumbnail);
        }

        setUploadProgress(uploadProgress) {
            this.uploadProgress = uploadProgress;
        }

        handleUpload = async (navigate) => {
            if (!this.file) {
                return;
            }
            this.videoData.usuario.id = Number(this.idUser);
            console.log('videoData', this.videoData);

            const formData = new FormData();
            formData.append('videoData', JSON.stringify(this.videoData));
            formData.append('file', this.file);
            formData.append('thumbnail', this.thumbnail);
            

            try {
                const response = await api.post('/videos/upload', formData, {
                    headers: {
                        // Adicione quaisquer cabeçalhos necessários aqui
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + AuthStore.getToken
                    },
                    onUploadProgress: (progressEvent) => {
                        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        this.setUploadProgress(progress);
                    },
                });

                if (response.status === 200) {
                    this.videoData = { titulo: '', descricao: '', usuario: { id: undefined }, dataUpload: new Date()}

                    console.log('Arquivo enviado com sucesso.');
                    toastSucesso("video enviado com sucesso!")
                    setTimeout(() => {
                        // Suas regras de navegação aqui
                        // Exemplo: navegar para '/outra-pagina'
                        navigate('/');
                    }, 3000);



                } else {
                    console.error('Erro ao enviar o arquivo.');
                }
            } catch (error) {
                console.error('Erro durante o upload:', error);
                toastErro("Erro ao enviar o vídeo!")
            }
        };

        setVideos(videos){
            this.videos = videos
        }

        getVideosOfCanal() {
            api.get('videos/canal/' + this.idUser, {
                headers: {
                    'Authorization': 'Bearer ' + AuthStore.getToken
                }
            }).then((response) => {
                this.videosOfCanal = response.data
            }).catch((erro) => {
                if (erro.response.status === 403) {
                    AuthStore.logout();
                }
            })
        }

        setVideoEdit(videoEdit) {
            this.videoEdit = videoEdit;
            this.editing = true;
        }

        setTituloEdit(titulo) {
            this.videoEdit.titulo = titulo;
        }

        setDescricaoEdit(descricao) {
            this.videoEdit.descricao = descricao;
        }

        handleEdit = async () => {
            this.videoEdit.usuario = { id: Number(this.idUser)}
            api.put('/videos', this.videoEdit, {
                headers: {
                    'Authorization': 'Bearer ' + AuthStore.getToken
                }
            }).then((response) => {
                this.editing = false;
                toastSucesso("vídeo editado com sucesso!")
            }).catch((erro) => {
                if (erro.status === 403) {
                    AuthStore.logout();
                }
            })
        }

        async loadVideo(id) {
            try {
                const response = await api.get('/videos/' + id, {
                    headers: {
                        'Authorization': 'Bearer ' + AuthStore.getToken
                    }
                });

                this.videoView = response.data;
                return this.downloadVideo()
            } catch (error) {
                if (error.status === 403) {
                    AuthStore.logout();
                }
            }
        }


    // async loadVideoFile() {
    //     try {
    //         const response = await api.get(`/resources/videos/${this.videoView.filename}`, {
    //             headers: {
    //                 'Authorization': 'Bearer ' + AuthStore.getToken
    //             }
    //         });
    //
    //         this.videoViewFile = response.data;
    //     } catch (error) {
    //         if (error.response && error.response.status === 403) {
    //             AuthStore.logout();
    //         }
    //     }
    // }

    async downloadVideo() {
            try {
                const response = await api.get(`/resources/video/${this.videoView.url}`, {
                    responseType: 'arraybuffer',
                    headers: {
                        'Authorization': 'Bearer ' + AuthStore.getToken
                    }
                });

                const blob = new Blob([response.data], { type: response.headers['content-type'] });
                const videoUrl = URL.createObjectURL(blob);

                // Define o URL do vídeo na tag <video>
                return videoUrl;
        } catch (error) {
            console.error('Erro ao carregar o vídeo:', error);
        }
    }


    setComentario(comentario) {
        this.comentario.texto = comentario;
    }

    enviarComentario() {
        this.comentario.usuario.id = Number(this.idUser);
        this.comentario.video.idVideo = Number(this.videoView.idVideo);
        api.post('/comentarios', this.comentario, {
            headers: {
                'Authorization': 'Bearer ' + AuthStore.getToken
            }
        }).then((response) => {
            //adicione como o primeiro elemento do array
            this.comentario.texto = '';
            this.comentarios.unshift(response.data);
        }).catch((erro) => {
            if (erro.status === 403) {
                AuthStore.logout();
            }
        })
    }
    loadComentarios(id) {
            api.get('/comentarios/video/' + id, {
                headers: {
                    'Authorization': 'Bearer ' + AuthStore.getToken
                }
            }).then((response) => {
                this.comentarios = response.data;
                console.log(this.comentarios);
            }).catch((erro) => {
                if (erro.status === 403) {
                    AuthStore.logout();
                }
            })
    }

    setComentarioEdit(value) {
        this.comentarioEdit.texto = value;

    }

    setRespostaEdit(value) {
        this.respostaEdit.texto = value;
        
    }

    setResposta(value) {
        this.resposta.texto = value;

    }

    enviarRespostaComentario(comentarioId) {
        this.resposta.usuario.id = Number(this.idUser);
        api.post(`respostas/${comentarioId}`, this.resposta, {
            headers: {
                'Authorization': 'Bearer ' + AuthStore.getToken
            }
        }).then((response) => {
            console.log(response.data);
            this.comentarios[this.comentarios.findIndex((comentario) => comentario.idComentario === comentarioId)].respostas.push(response.data);
            this.resposta.texto = '';
        }).catch((erro) => {
            console.log('Consolezada:', erro);
            if (erro.status === 401) {
                AuthStore.logout();
            }
            console.log(erro);
        })
    }


    deletarVideo(id){
        api.delete(`/videos/${id}`, {
            headers:{
                'Authorization': 'Bearer ' + AuthStore.getToken
            }
        }).then((response) => {
            this.videosOfCanal = this.videosOfCanal.filter((item) => item.idVideo !== id)
            toastSucesso("Vídeo deletado com sucesso!")

        }).catch((erro) => console.log(erro))

    }

    setComentarioDeleteId(idComentario) {
        this.comentarioDeleteId = idComentario;
    }

    setRespostaDeleteId(idResposta) {
        this.respostaDeleteId = idResposta;

    }

    handleDeleteComentario() {
            api.delete(`/comentarios/${this.comentarioDeleteId}`, {
                headers: {
                    'Authorization': 'Bearer ' + AuthStore.getToken
                }
            }).then((response) => {
                this.comentarios = this.comentarios.filter((item) => item.idComentario !== this.comentarioDeleteId)
            }).catch((erro) => {
                toastErro("Erro ao deletar o comentário!")
                if (erro.status === 403) {
                    AuthStore.logout();
                }
            })
        }

    deleteResposta() {
            api.delete(`/respostas/${this.respostaDeleteId}/${this.comentarioDeleteId}`, {
                headers: {
                    'Authorization': 'Bearer ' + AuthStore.getToken
                }
            }).then((response) => {
                this.comentarios[this.comentarios.findIndex((comentario) => comentario.idComentario === this.comentarioDeleteId)].respostas = this.comentarios[this.comentarios.findIndex((comentario) => comentario.idComentario === this.comentarioDeleteId)].respostas.filter((item) => item.idResposta !== this.respostaDeleteId)
            }).catch((erro) => {
                toastErro("Erro ao deletar a resposta!")
                if (erro.status === 403) {
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
            this.comentarios[this.comentarios.findIndex((comentario) => comentario.idComentario === comentarioId)].texto = response.data;
            this.comentarioEdit.texto = '';
        }).catch((erro) => {
            toastErro("Erro ao editar o comentário!")
            console.log(erro)
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
            this.editarResposta(respostaComentarioId, response.data)
            console.log(this.comentarioDeleteId);
            this.respostaEdit.texto = '';
        }).catch((erro) => {
            toastErro("Erro ao editar a resposta!")
            console.log(erro);
            if (erro.status === 401) {
                AuthStore.logout();
            }
        })
    }
}

const videoStore = new VideoStore();

export default videoStore;