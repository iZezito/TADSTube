package com.example.tadstubeapi.controllers;

import com.example.tadstubeapi.model.Video;
import com.example.tadstubeapi.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;

import java.io.File;
import java.io.IOException;

@RestController
@CrossOrigin(origins = "*")
public class FileUploadController {

    @Autowired
    public VideoService service;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("videoData")Video video) {
        System.out.println("Recebendo arquivo: " + file.getOriginalFilename());
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Arquivo vazio");
        }

        try {
            video.setUrl(service.armazenarVideo(file));
            return ResponseEntity.ok("Arquivo enviado com sucesso.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Falha ao enviar o arquivo.");
        }
    }

    @GetMapping("/download/{filename:.+}")
    public ResponseEntity<Resource> downloadVideo(@PathVariable String filename) {
        File file = new File("upload-dir/" + filename);
        if (file.exists()) {
            Resource resource = new FileSystemResource(file);

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                    .body(resource);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
