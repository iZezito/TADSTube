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

    public void updateComentario(Long id, String comentario) {
        Comentario comentarioAtual = getById(id);
        comentarioAtual.setTexto(comentario);
        update(comentarioAtual);
    }

    public void deleteAllComentariosByVideo(Long idVideo) {
        List<Comentario> comentarios = findAllByVideoId(idVideo);
        for (Comentario comentario : comentarios) {
            delete(comentario);
        }
    }
}

