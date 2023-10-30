package com.example.tadstubeapi.usuario;

public class UsuarioDTO {
    private String login;
    private Long id;

    public Long getId() {
        return id;
    }

    public String getLogin() {
        return login;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setLogin(String login) {
        this.login = login;
    }
}
