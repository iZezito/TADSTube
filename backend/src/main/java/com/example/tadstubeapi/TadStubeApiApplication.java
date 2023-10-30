package com.example.tadstubeapi;

import com.example.tadstubeapi.model.Inscricao;
import com.example.tadstubeapi.model.Video;
import com.example.tadstubeapi.usuario.Usuario;
import com.example.tadstubeapi.usuario.UsuarioRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@SpringBootApplication
public class TadStubeApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(TadStubeApiApplication.class, args);
    }

    @Autowired
    private UsuarioRepository repository;

    @PostConstruct
    public void initAlmocos() {

        List<Usuario> users = Stream.of(
                new Usuario(1L, "erick", encoder().encode("1234567")),
                new Usuario(2L, "emerson", encoder().encode("1234567")),
                new Usuario(3L, "maia", encoder().encode("1234567"))

        ).collect(Collectors.toList());

        repository.saveAll(users);
    }

    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

}
