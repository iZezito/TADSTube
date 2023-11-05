package com.example.tadstubeapi.model;

import jakarta.persistence.*;
import com.example.tadstubeapi.usuario.Usuario;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "Comentario")
public class Comentario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDComentario")
    private Long idComentario;

    @Column(name = "Texto", nullable = false, columnDefinition = "TEXT")
    private String texto;

    @Column(name = "DataComentario")
    private Timestamp dataComentario;

    @ManyToOne
    @JoinColumn(name = "IDUsuario")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "IDVideo")
    private Video video;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Resposta> respostas = new ArrayList<>();

    // Getters, setters e construtores
}

