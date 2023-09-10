import api from "../service/Configuration";
import {makeAutoObservable} from "mobx";

class CadastroStore {

        avisoMatricula = '';
        avisoLogin = '';
        usuario = {login: '', senha: '', matricula: ''};
        arquivo = null;

        constructor() {
            makeAutoObservable(this);
        }


        setLogin(login) {
            this.usuario.login = login;
        }
        setErros(erros) {
            this.erros = erros;
        }

        setSenha(senha) {
            this.usuario.senha = senha;
        }

        verificarMatricula(file) {

            const formData = new FormData();
            formData.append('file', file);

            api.post('usuarios/matricula', formData)
                .then(response => {
                    console.log(response.data);
                    this.avisoMatricula = response.data;
                    this.arquivo = file;
                    if(response.data.includes('Matrícula válida')) {
                        this.usuario.matricula = file.name.split('/')[1];
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }

        verificarLogin() {
            api.get(`usuarios/login/${this.usuario.login}`)
                .then(response => {
                    console.log(response.data);
                    this.avisoLogin = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        }

        cadastrarUsuario() {
            api.post('usuarios', this.usuario).then((response) => {
                console.log(response.data)
            }).catch((erro) => {
                console.log(erro)
            })
        }
}

const store = new CadastroStore();

export default store;

