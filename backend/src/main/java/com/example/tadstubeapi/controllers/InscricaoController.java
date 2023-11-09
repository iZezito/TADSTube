package com.example.tadstubeapi.controllers;

import com.example.tadstubeapi.generics.GenericRestController;
import com.example.tadstubeapi.model.Inscricao;
import com.example.tadstubeapi.service.InscricaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/inscricoes")
public class InscricaoController extends GenericRestController<Inscricao>{

    @Autowired
    private InscricaoService service;

    @GetMapping("/canal/{id}")
    public Integer countInscricoesByCanalId(@PathVariable Long id) {
        return service.countInscricoesByCanalId(id);
    }

    @PostMapping("/canal")
    public ResponseEntity<?> saveInscricao(@RequestBody Inscricao inscricao) {
        Inscricao inscricaoExistente = service.findByInscritoIdAndUsuarioId(inscricao.getInscrito().getId(), inscricao.getUsuario().getId());
        if(inscricaoExistente != null){
            return ResponseEntity.badRequest().build();
        } else {
            return ResponseEntity.ok(service.save(inscricao));
        }
    }

    @GetMapping("/inscrito/{id}/canal/{id1}")
    public ResponseEntity<?> getInscricaoByInscritoIdAndUsuarioId(@PathVariable Long id, @PathVariable Long id1) {
        Inscricao inscricao = service.findByInscritoIdAndUsuarioId(id, id1);
        if(inscricao != null){
            return ResponseEntity.ok(inscricao);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
