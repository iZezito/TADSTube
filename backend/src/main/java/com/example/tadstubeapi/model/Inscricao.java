package com.example.tadstubeapi.model;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "Inscricao")
public class Inscricao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDInscricao")
    private Long idInscricao;

    @ManyToOne
    @JoinColumn(name = "IDInscrito")
    private Usuario inscrito;

    @ManyToOne
    @JoinColumn(name = "IDCanal")
    private Canal canal;

    @Column(name = "DataInscricao")
    private Timestamp dataInscricao;

    // Getters, setters e construtores
}

