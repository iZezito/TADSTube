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
@Table(name = "Resposta")
public class Resposta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDResposta")
    private Long idResposta;

    @Column(name = "Texto", nullable = false)
    private String texto;

    @Column(name = "DataResposta")
    private Timestamp dataResposta;

    @ManyToOne
    @JoinColumn(name = "IDUsuario")
    private Usuario usuario;
    // Referência ao comentário ao qual esta resposta pertence

    // Getters, setters e construtores
}
