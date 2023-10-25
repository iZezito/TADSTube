package com.example.tadstubeapi.generics;

import com.example.tadstubeapi.model.Comentario;
import com.example.tadstubeapi.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.List;

@NoRepositoryBean
public interface GenericRepository<T> extends JpaRepository<T, Long> {
    List<T> findAllByUsuarioId(Long idUsuario);

}
