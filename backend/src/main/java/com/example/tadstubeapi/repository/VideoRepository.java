package com.example.tadstubeapi.repository;

import com.example.tadstubeapi.generics.GenericRepository;
import com.example.tadstubeapi.model.Video;

import java.util.List;

public interface VideoRepository extends GenericRepository<Video> {
    List<Video> findAllByTituloContainingIgnoreCase(String titulo);
}
