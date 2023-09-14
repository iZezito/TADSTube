package com.example.tadstubeapi.model;

import com.example.tadstubeapi.usuario.Usuario;
import jakarta.persistence.*;
import lombok.*;


import java.sql.Timestamp;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
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

