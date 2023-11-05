package com.example.tadstubeapi.model;

import com.example.tadstubeapi.usuario.Usuario;
import com.example.tadstubeapi.usuario.UsuarioDTO;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "Video")
public class Video {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDVideo")
    private Long idVideo;

    @Column(name = "Titulo", nullable = false)
    private String titulo;

    @Column(name = "Descricao", columnDefinition = "TEXT")
    private String descricao;

    @Column(name = "DataUpload")
    private Timestamp dataUpload;

    @ManyToOne()
    @JoinColumn(name = "IDCanal")
    private Usuario usuario;

    private String url;

    private String thumbnail;


    // Getters, setters e construtores
}

