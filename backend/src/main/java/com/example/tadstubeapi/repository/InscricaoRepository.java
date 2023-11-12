package com.example.tadstubeapi.repository;

import com.example.tadstubeapi.generics.GenericRepository;
import com.example.tadstubeapi.model.Inscricao;

import java.util.List;
import java.util.Optional;

public interface InscricaoRepository extends GenericRepository<Inscricao> {
    int countInscricaoByUsuarioId(Long idCanal);
    Optional<Inscricao> findByInscritoIdAndUsuarioId(Long idInscrito, Long idUsuario);
    List<Inscricao> findAllByUsuarioId(Long idCanal);
    List<Inscricao> findAllByInscritoId(Long idInscrito);
}
