package com.example.tadstubeapi.controllers;

import com.example.tadstubeapi.generics.GenericRestController;
import com.example.tadstubeapi.model.Comentario;
import com.example.tadstubeapi.service.ComentarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/comentarios")
public class ComentarioController extends GenericRestController<Comentario> {

    @Autowired
    private ComentarioService service;
    @GetMapping("/video/{id}")
    public List<Comentario> findAllByVideoId(@PathVariable Long id) {
        return service.findAllByVideoId(id);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<String> updateComment(@PathVariable Long id, @RequestBody Comentario comentario) {
        System.out.println("Entrou no patch");
        System.out.println(comentario);
        service.updateComentario(id, comentario.getTexto());
        return ResponseEntity.ok(comentario.getTexto());
    }
}
