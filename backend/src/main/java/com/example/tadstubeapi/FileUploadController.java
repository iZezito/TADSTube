package com.example.tadstubeapi;

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

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        System.out.println("Recebendo arquivo: " + file.getOriginalFilename());
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Arquivo vazio");
        }

        try {
            // Crie um diretório temporário para armazenar o arquivo
            File uploadDir = new File("upload-dir");
            if (!uploadDir.exists()) {
                uploadDir.mkdir();
            }

            // retirar caracteres especiais do nome do arquivo
            String filename = file.getOriginalFilename().replaceAll("[^a-zA-Z0-9\\.\\-]", "_");

            // Salve o arquivo no diretório temporário
            File dest = new File(uploadDir.getAbsolutePath() + File.separator + filename);
            file.transferTo(dest);

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
