package com.example.tadstubeapi.model;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "Comentario")
public class Comentario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDComentario")
    private Long idComentario;

    @Column(name = "Texto", nullable = false)
    private String texto;

    @Column(name = "DataComentario")
    private Timestamp dataComentario;

    @ManyToOne
    @JoinColumn(name = "IDUsuario")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "IDVideo")
    private Video video;

    // Getters, setters e construtores
}

