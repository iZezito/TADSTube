package com.example.tadstubeapi.controllers;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/resources")
public class ResourcesController {

    // endpoint para retornar a imagem solicitada pelo front
    @GetMapping("/image/{filename:.+}")
    public ResponseEntity<byte[]> getImage(@PathVariable String filename) {
        System.out.println("Recebendo imagem: " + filename);
        try {
            // Construa o caminho completo do arquivo
            String filePath = "thumbnail-dir/" + filename;

            // Leia o arquivo como um array de bytes
            Path path = Paths.get(filePath);
            byte[] imageData = Files.readAllBytes(path);

            // Configure os cabeçalhos da resposta
            HttpHeaders headers = new HttpHeaders();
            // pegar a extensão do arquivo
            String[] split = filename.split("\\.");
            String extension = split[split.length - 1];
            if(extension.equals("png"))
                headers.setContentType(MediaType.IMAGE_PNG);
            else if(extension.equals("jpg") || extension.equals("jpeg"))
                headers.setContentType(MediaType.IMAGE_JPEG);
            else if(extension.equals("gif"))
                headers.setContentType(MediaType.IMAGE_GIF);
            else
                headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            // Retorne a resposta com os dados da imagem
            return new ResponseEntity<>(imageData, headers, HttpStatus.OK);
        } catch (IOException e) {
            // Em caso de erro ao ler o arquivo, retorne uma resposta de erro
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
