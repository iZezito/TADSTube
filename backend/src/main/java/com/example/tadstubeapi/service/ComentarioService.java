package com.example.tadstubeapi.service;

import com.example.tadstubeapi.generics.GenericService;
import com.example.tadstubeapi.model.Comentario;
import com.example.tadstubeapi.repository.ComentarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComentarioService extends GenericService<Comentario> {

    @Autowired
    private ComentarioRepository repository;
    public List<Comentario> findAllByVideoId(Long idVideo) {
        return repository.findAllByVideoIdVideo(idVideo);
    }
}

