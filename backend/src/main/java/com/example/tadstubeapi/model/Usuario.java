package com.example.tadstubeapi.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "Usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDUsuario")
    private Long idUsuario;

    @Column(name = "NomeDeUsuario", nullable = false)
    private String nomeDeUsuario;

    @Column(name = "Senha", nullable = false)
    private String senha;

    @Column(name = "Email", nullable = false)
    private String email;

    // Getters, setters e construtores
}
