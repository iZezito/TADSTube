package com.example.tadstubeapi.controllers;

import com.example.tadstubeapi.generics.GenericRestController;
import com.example.tadstubeapi.model.Video;
import com.example.tadstubeapi.service.VideoService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.buffer.DefaultDataBufferFactory;
import org.springframework.http.HttpHeaders;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.DataInput;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/videos")
@CrossOrigin(origins = "*")
public class VideoController extends GenericRestController<Video> {

        @Autowired
        public VideoService service;

        @PostMapping("/upload")
        public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("videoData") String video, @RequestParam("thumbnail") MultipartFile thumbnail) {
            // Converter a string JSON de videoData que é o objeto 'video' para o objeto do tipo Video
            ObjectMapper mapper = new ObjectMapper();
            Video novoVideo = null;
            try {
                novoVideo = mapper.readValue(video, Video.class);
            } catch (IOException e) {
                e.printStackTrace();
            }


            System.out.println("Recebendo arquivo: " + file.getOriginalFilename());
            System.out.println("Recebendo arquivo: " + thumbnail.getOriginalFilename());
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Arquivo vazio");
            }

            try {
                novoVideo.setUrl(service.armazenarVideo(file, novoVideo.getUsuario().getId()));
                novoVideo.setThumbnail(service.armazenarThumbnail(thumbnail));
                service.save(novoVideo);
                return ResponseEntity.ok("Vídeo enviado com sucesso!");
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Falha ao enviar o vídeo.");
            }
        }

        @GetMapping("/canal/{id}")
        public ResponseEntity<List<Video>> getVideosByUser(@PathVariable Long id) {
            List<Video> videos = service.getVideosByUser(id);
            if(videos.isEmpty())
                return ResponseEntity.notFound().build();
            return ResponseEntity.ok(videos);
        }

        @GetMapping("/search/{search}")
        public ResponseEntity<List<Video>> getVideosBySearch(@PathVariable String search) {
            System.out.println("Buscando por: " + search);
            List<Video> videos = service.getVideosBySearch(search);
            if(videos.isEmpty())
                return ResponseEntity.notFound().build();
            return ResponseEntity.ok(videos);
        }


//        @GetMapping("/download/{id:.+}")
//        public ResponseEntity<Resource> downloadVideo(@PathVariable Long id) {
//            Video video = service.getById(id);
//            File file = new File("upload-dir/" + video.getUrl());
//            if (file.exists()) {
//                Resource resource = new FileSystemResource(file);
//
//                return ResponseEntity.ok()
//                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + video.getUrl() + "\"")
//                        .body(resource);
//            } else {
//                return ResponseEntity.notFound().build();
//            }
//        }
//
//    // GetMapping que retorna uma parte do vídeo
//
//        @GetMapping("/stream/{filename:.+}")
//        public ResponseEntity<Resource> streamVideo(
//                @PathVariable String filename,
//                HttpServletRequest request) throws IOException {
//
//            File videoFile = new File("upload-dir/" + filename);
//            if (!videoFile.exists()) {
//                return ResponseEntity.notFound().build();
//            }
//
//            long videoLength = videoFile.length();
//            String rangeHeader = request.getHeader(HttpHeaders.RANGE);
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentLength(videoLength);
//
//            if (rangeHeader != null && rangeHeader.startsWith("bytes=")) {
//                String[] rangeValues = rangeHeader.substring(6).split("-");
//                long start = Long.parseLong(rangeValues[0]);
//                long end = videoLength - 1;
//                if (rangeValues.length > 1) {
//                    end = Long.parseLong(rangeValues[1]);
//                }
//
//                InputStream inputStream = Files.newInputStream(videoFile.toPath());
//                inputStream.skip(start);
//
//                long contentLength = end - start + 1;
//
//                headers.add(HttpHeaders.ACCEPT_RANGES, "bytes");
//                headers.add(HttpHeaders.CONTENT_RANGE, "bytes " + start + "-" + end + "/" + videoLength);
//                headers.add(HttpHeaders.CONTENT_LENGTH, String.valueOf(contentLength));
//                headers.add(HttpHeaders.CONTENT_TYPE, "video/mp4");
//
//                InputStreamResource inputStreamResource = new InputStreamResource(inputStream);
//
//                return new ResponseEntity<>(inputStreamResource, headers, HttpStatus.PARTIAL_CONTENT);
//            } else {
//                InputStream inputStream = Files.newInputStream(videoFile.toPath());
//
//                InputStreamResource inputStreamResource = new InputStreamResource(inputStream);
//                headers.add(HttpHeaders.CONTENT_TYPE, "video/mp4");
//                return new ResponseEntity<>(inputStreamResource, headers, HttpStatus.OK);
//            }
//        }


//        return Flux.just(videoFile)
//                .map(file -> {
//                    try {
//                        return Files.readAllBytes(file.toPath());
//                    } catch (IOException e) {
//                        throw new RuntimeException(e);
//                    }
//                })
//                .map(bytes -> new DefaultDataBufferFactory().wrap(bytes));

//    @GetMapping("/stream/{filename:.+}")
//    public ResponseEntity<InputStreamResource> streamVideo(
//            @PathVariable String filename,
//            HttpServletRequest request) throws IOException {
//
//        File videoFile = new File("upload-dir/" + filename);
//        if (!videoFile.exists()) {
//            return ResponseEntity.notFound().build();
//        }
//
//        long videoLength = videoFile.length();
//        String rangeHeader = request.getHeader(HttpHeaders.RANGE);
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentLength(videoLength);
//
//        if (rangeHeader != null && rangeHeader.startsWith("bytes=")) {
//            String[] rangeValues = rangeHeader.substring(6).split("-");
//            long start = Long.parseLong(rangeValues[0]);
//            long end = videoLength - 1;
//            if (rangeValues.length > 1) {
//                end = Long.parseLong(rangeValues[1]);
//            }
//
//            InputStream inputStream = new FileInputStream(videoFile);
//            inputStream.skip(start);
//            long contentLength = end - start + 1;
//
//
//            headers.add(HttpHeaders.ACCEPT_RANGES, "bytes");
//            headers.add(HttpHeaders.CONTENT_RANGE, "bytes " + start + "-" + end + "/" + videoLength);
//            headers.setContentLength(contentLength);
//            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
//            System.out.println("Retornou pedaços do arquivo");
//
//            return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT)
//                    .headers(headers)
//                    .body(new InputStreamResource(inputStream));
//        }
//
//        // Se não houver solicitação de intervalo, retornar o arquivo completo
//        InputStream inputStream = new FileInputStream(videoFile);
//        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
//
//        return ResponseEntity.status(HttpStatus.OK)
//                .headers(headers)
//                .body(new InputStreamResource(inputStream));
//    }




//    @GetMapping("/stream/{filename:.+}")
//    public ResponseEntity<InputStreamResource> streamVideo(
//            @PathVariable String filename,
//            HttpServletRequest request) throws IOException {
//
//        File videoFile = new File("upload-dir/" + filename);
//        if (!videoFile.exists()) {
//            return ResponseEntity.notFound().build();
//        }
//
//        InputStream inputStream = new FileInputStream(videoFile);
//        FileSystemResource resource = new FileSystemResource(videoFile);
//
//        String rangeHeader = request.getHeader(HttpHeaders.RANGE);
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentLength(videoFile.length());
//
//        if (rangeHeader != null && rangeHeader.startsWith("bytes=")) {
//            String[] rangeValues = rangeHeader.substring(6).split("-");
//            long start = Long.parseLong(rangeValues[0]);
//            long end = videoFile.length() - 1;
//            if (rangeValues.length > 1) {
//                end = Long.parseLong(rangeValues[1]);
//            }
//
//            inputStream = new FileInputStream(videoFile);
//            inputStream.skip(start);
//
//            headers.set(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_OCTET_STREAM_VALUE);
//
//            headers.add(HttpHeaders.CONTENT_RANGE, "bytes " + start + "-" + end + "/" + videoFile.length());
//            headers.setContentLength(end - start + 1);
//        }
//
//        return ResponseEntity.status(206)
//                .headers(headers)
//                .contentType(MediaType.APPLICATION_OCTET_STREAM) // Define o Content-Type como octet-stream
//                .body(new InputStreamResource(inputStream));
//    }

}