package com.example.tadstubeapi.service;

import com.example.tadstubeapi.generics.GenericService;
import com.example.tadstubeapi.model.Visualizacao;
import com.example.tadstubeapi.repository.VisualizacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class VisualizacaoService extends GenericService<Visualizacao> {

    @Autowired
    private VisualizacaoRepository repository;

    public Integer getAllVisualizacoesByVideo(Long idVideo) {
        return repository.countVisualizacaoByVideoIdVideo(idVideo);
    }

    public Visualizacao findByUsuarioIdAndVideoId(Long idUsuario, Long idVideo) {
        return repository.findByUsuarioIdAndVideoIdVideo(idUsuario, idVideo).orElse(null);
    }
}
