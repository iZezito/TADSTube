package com.example.tadstubeapi.service;

import com.example.tadstubeapi.generics.GenericService;
import com.example.tadstubeapi.model.Inscricao;
import com.example.tadstubeapi.repository.InscricaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InscricaoService extends GenericService<Inscricao> {

    @Autowired
    private InscricaoRepository repository;

    public Integer countInscricoesByCanalId(Long id) {
        return repository.countInscricaoByUsuarioId(id);
    }

    public Inscricao findByInscritoIdAndUsuarioId(Long id, Long id1) {
        return repository.findByInscritoIdAndUsuarioId(id, id1).orElse(null);
    }
}

