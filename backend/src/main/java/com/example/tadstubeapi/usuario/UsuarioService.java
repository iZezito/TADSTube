package com.example.tadstubeapi.usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository repository;
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public void save(Usuario usuario){
        usuario.setSenha(encoder.encode(usuario.getSenha()));
        repository.save(usuario);

    }

    public Usuario findByLogin(String login){
        return (Usuario) repository.findByLogin(login);
    }

}
