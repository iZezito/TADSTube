package com.example.tadstubeapi.controllers;

import com.example.tadstubeapi.generics.GenericRestController;
import com.example.tadstubeapi.model.Inscricao;
import com.example.tadstubeapi.model.Video;
import com.example.tadstubeapi.service.ComentarioService;
import com.example.tadstubeapi.service.InscricaoService;
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
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/videos")
@CrossOrigin(origins = "*")
public class VideoController extends GenericRestController<Video> {

        @Autowired
        public VideoService service;

        @Autowired
        public ComentarioService comentarioService;

        @Autowired
        public InscricaoService inscricaoService;

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
                Video videoSalvado = service.save(novoVideo);
                List<Inscricao> inscricoes = inscricaoService.findAllByUsuarioId(novoVideo.getUsuario().getId());

                ExecutorService executorService = Executors.newSingleThreadExecutor();
                executorService.execute(() -> {
                    if (!inscricoes.isEmpty()) {
                        service.sendEmails(inscricoes, videoSalvado);
                    }
                });
                executorService.shutdown();

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

        @DeleteMapping(path = {"/{id}"})
        public ResponseEntity<Video> delete(@PathVariable Long id) {
            Video video = service.getById(id);
            if(video == null){
                return ResponseEntity.notFound().build();
            }
            comentarioService.deleteAllComentariosByVideo(id);
            service.delete(video);
            return ResponseEntity.ok().build();
        }

}