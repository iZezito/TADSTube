package com.example.tadstubeapi.service;

import com.example.tadstubeapi.generics.GenericService;
import com.example.tadstubeapi.model.Video;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class VideoService extends GenericService<Video> {

    public String armazenarVideo(MultipartFile file, Long idUser) throws IOException {
        File uploadDir = new File("upload-dir");
        if (!uploadDir.exists()) {
            uploadDir.mkdir();
        }

        // retirar caracteres especiais do nome do arquivo
        String filename = file.getOriginalFilename().replaceAll("[^a-zA-Z0-9\\.\\-]", "_").concat("-").concat(idUser.toString());

        // Salve o arquivo no diretório temporário
        File dest = new File(uploadDir.getAbsolutePath() + File.separator + filename);
        file.transferTo(dest);
        return filename;
    }

    public File getVideo(String url) throws IOException {
        File file = new File("upload-dir/" + url);
        return file;
    }

    public String armazenarThumbnail(MultipartFile thumbnail) {
        File uploadDir = new File("thumbnail-dir");
        if (!uploadDir.exists()) {
            uploadDir.mkdir();
        }
        String filename = thumbnail.getOriginalFilename().replaceAll("[^a-zA-Z0-9\\.\\-]", "_");
        File dest = new File(uploadDir.getAbsolutePath() + File.separator + filename);
        try {
            thumbnail.transferTo(dest);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return filename;
    }
}
