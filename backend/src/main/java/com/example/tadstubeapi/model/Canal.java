package com.example.tadstubeapi.model;

import jakarta.persistence.*;
import com.example.tadstubeapi.usuario.Usuario;
import lombok.*;

import java.sql.Timestamp;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Canal")
public class Canal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDCanal")
    private Long idCanal;

    @Column(name = "Nome", nullable = false)
    private String nome;

    @Column(name = "DataCriacao")
    private Timestamp dataCriacao;

    @ManyToOne
    @JoinColumn(name = "IDUsuario")
    private Usuario usuario;

    // Getters, setters e construtores
}

