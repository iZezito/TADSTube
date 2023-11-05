package com.example.tadstubeapi.controllers;

import com.example.tadstubeapi.generics.GenericRestController;
import com.example.tadstubeapi.model.Visualizacao;
import com.example.tadstubeapi.service.VisualizacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/visualizacoes")
public class VisualizacaoController {

    @Autowired
    private VisualizacaoService service;

    @GetMapping("/video/{id}")
    public ResponseEntity<Integer> countVisualizacoesByVideoId(@PathVariable Long id) {
        return ResponseEntity.ok(service.getAllVisualizacoesByVideo(id));
    }

    @PostMapping("/video")
    public ResponseEntity<Visualizacao> saveVisualizacao(@RequestBody Visualizacao visualizacao) {
        Visualizacao visualizacaoExistente = service.findByUsuarioIdAndVideoId(visualizacao.getUsuario().getId(), visualizacao.getVideo().getIdVideo());
        if(visualizacaoExistente != null){
            return ResponseEntity.badRequest().build();
        } else {
            return ResponseEntity.ok(service.save(visualizacao));
        }
    }

}
