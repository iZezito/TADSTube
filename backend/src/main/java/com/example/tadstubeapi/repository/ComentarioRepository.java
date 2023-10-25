package com.example.tadstubeapi.repository;

import com.example.tadstubeapi.generics.GenericRepository;
import com.example.tadstubeapi.model.Comentario;
import com.example.tadstubeapi.model.Video;

import java.util.List;

public interface ComentarioRepository extends GenericRepository<Comentario> {
    List<Comentario> findAllByVideoIdVideo(Long idVideo);
}
