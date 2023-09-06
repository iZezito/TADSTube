package com.example.tadstubeapi.model;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "Visualizacao")
public class Visualizacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDVisualizacao")
    private Long idVisualizacao;

    @Column(name = "DataVisualizacao")
    private Timestamp dataVisualizacao;

    @ManyToOne
    @JoinColumn(name = "IDUsuario")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "IDVideo")
    private Video video;

    // Getters, setters e construtores
}

