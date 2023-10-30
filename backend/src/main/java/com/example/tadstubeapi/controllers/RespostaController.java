package com.example.tadstubeapi.controllers;

import com.example.tadstubeapi.generics.GenericRestController;
import com.example.tadstubeapi.model.Resposta;
import com.example.tadstubeapi.service.RespostaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/respostas")
public class RespostaController extends GenericRestController<Resposta>{

    @Autowired
    private RespostaService respostaService;

    @PostMapping("/{id}")
    public ResponseEntity<Resposta> inserirResposta(@PathVariable Long id, @RequestBody Resposta resposta){
        Resposta respostaInserida =  respostaService.insertResposta(id, resposta);
        return ResponseEntity.ok(respostaInserida);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<String> updateResposta(@PathVariable Long id, @RequestBody Resposta resposta){
        respostaService.updateResposta(id, resposta.getTexto());
        return ResponseEntity.ok(resposta.getTexto());
    }

    @DeleteMapping("/{id}/{idComentario}")
    public ResponseEntity<?> deleteResposta(@PathVariable Long id, @PathVariable Long idComentario) {
        Resposta resposta = respostaService.getById(id);
        if (resposta == null) {
            return ResponseEntity.notFound().build();
        }
        respostaService.delete(id, idComentario);
        return ResponseEntity.ok().build();
    }
}
