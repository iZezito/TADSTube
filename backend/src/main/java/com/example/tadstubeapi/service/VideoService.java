package com.example.tadstubeapi.service;

import com.example.tadstubeapi.generics.GenericService;
import com.example.tadstubeapi.model.Video;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class VideoService extends GenericService<Video> {

    public String armazenarVideo(MultipartFile file) throws IOException {
        File uploadDir = new File("upload-dir");
        if (!uploadDir.exists()) {
            uploadDir.mkdir();
        }

        // retirar caracteres especiais do nome do arquivo
        String filename = file.getOriginalFilename().replaceAll("[^a-zA-Z0-9\\.\\-]", "_");

        // Salve o arquivo no diretório temporário
        File dest = new File(uploadDir.getAbsolutePath() + File.separator + filename);
        file.transferTo(dest);
        return dest.getAbsolutePath();
    }

}
