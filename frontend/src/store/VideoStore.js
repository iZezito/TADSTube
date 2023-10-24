import api from "../service/Configuration";
import {makeAutoObservable} from "mobx";
import AuthStore from "./AuthStore";
import store from "./Store";

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
        videoEdit = { id: undefined, titulo: '', descricao: '', usuario: { id: undefined }, dataUpload: new Date()}
        constructor() {
            makeAutoObservable(this);
            this.idUser = localStorage.getItem('idUser');
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

        handleUpload = async () => {
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
                    console.log('Arquivo enviado com sucesso.');
                } else {
                    console.error('Erro ao enviar o arquivo.');
                }
            } catch (error) {
                console.error('Erro durante o upload:', error);
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
            }).catch((erro) => {
                if (erro.response.status === 403) {
                    AuthStore.logout();
                }
            })
        }


}

const videoStore = new VideoStore();

export default videoStore;