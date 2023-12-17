import api from "../service/Configuration";
import {makeAutoObservable} from "mobx";
import { toastSucesso, toastErro } from "../utils/Toaster";

class CadastroStore {

        avisoMatricula = '';
        avisoLogin = '';
        usuario = {login: '', senha: '', matricula: '', email: ''};
        arquivo = null;
        avisoEmail = '';
        regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

        verificarEmail() {

            api.get(`usuarios/email/${this.usuario.email}`)
                .then(response => {

                    this.avisoEmail = response.data;
                    // verificar se o email é válido
                })
                .catch(error => {
                    console.error(error);
                });
        }

        cadastrarUsuario(navigate) {
            api.post('usuarios', this.usuario).then((response) => {
                console.log(response.data)
                toastSucesso('Usuário cadastrado com sucesso!');
                setTimeout(() => {
                    // Suas regras de navegação aqui
                    // Exemplo: navegar para '/outra-pagina'
                    navigate('/login');
                }, 3000);

            }).catch((erro) => {
                toastErro('Erro ao cadastrar usuário!')
                console.log(erro)
            })
        }

        setEmail(email) {
            this.usuario.email = email;
        }
}

const store = new CadastroStore();

export default store;

