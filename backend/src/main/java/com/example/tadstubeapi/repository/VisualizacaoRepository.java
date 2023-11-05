package com.example.tadstubeapi.repository;

import com.example.tadstubeapi.generics.GenericRepository;
import com.example.tadstubeapi.model.Visualizacao;

import java.util.List;
import java.util.Optional;

public interface VisualizacaoRepository extends GenericRepository<Visualizacao> {
    int countVisualizacaoByVideoIdVideo(Long idVideo);
    // instrucao para saber se já existe um objeto com esse usuarioid e videoid
    Optional<Visualizacao> findByUsuarioIdAndVideoIdVideo(Long idUsuario, Long idVideo);
}
