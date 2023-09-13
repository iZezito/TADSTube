package com.example.spotted.controllers;

import com.example.spotted.domain.Comentario;
import com.example.spotted.domain.Noticia;
import com.example.spotted.service.GenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;


public abstract class GenericRestController<T> {
    @Autowired
    public GenericService<T> service;

    @PostMapping
    public T insert(@RequestBody T t) {
        service.save(t);
        return t;
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<T> findById(@PathVariable Long id) {
        T t = service.getById(id);
        if(t == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(t);
    }

    @GetMapping
    public ResponseEntity<List<T>> findAll() {
        List<T> t = service.findAll();
        if(t == null){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(t);
    }

    @PutMapping()
    public ResponseEntity<T> update(@RequestBody T t) {
        service.update(t);
        return ResponseEntity.ok().body(t);
    }

    @DeleteMapping(path = {"/{id}"})
    public ResponseEntity<?> delete(@PathVariable Long id) {
        T t = service.getById(id);
        if(t == null){
            return ResponseEntity.notFound().build();
        }
        service.delete(t);
        return ResponseEntity.ok().build();
    }
}
