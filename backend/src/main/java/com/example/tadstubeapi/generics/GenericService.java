package com.example.tadstubeapi.generics;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


public abstract class GenericService<T>{
    @Autowired
    private GenericRepository<T> repository;

    public T save(T t){
        return repository.save(t);
    }

    public void delete(T t){
        repository.delete(t);
    }

    public List<T> findAll(){
        return repository.findAll();
    }

    public void update(T t){
        repository.saveAndFlush(t);
    }

    public T getById(Long id){
        Optional<T> objeto = repository.findById(id);
        return objeto.orElse(null);

    }


}
