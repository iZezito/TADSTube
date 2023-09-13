package com.example.tadstubeapi.model;

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

    @Column(name = "Descricao")
    private String descricao;

    @Column(name = "Tags")
    private String[] tags;

    @Column(name = "DataUpload")
    private Timestamp dataUpload;

    @ManyToOne
    @JoinColumn(name = "IDCanal")
    private Canal canal;

    @Column(name = "Likes")
    private Integer likes;

    private String url;


    // Getters, setters e construtores
}

