package com.example.tadstubeapi.service;

import com.example.tadstubeapi.generics.GenericService;
import com.example.tadstubeapi.model.Video;
import com.example.tadstubeapi.repository.InscricaoRepository;
import com.example.tadstubeapi.repository.VideoRepository;
import com.example.tadstubeapi.repository.VisualizacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
public class VideoService extends GenericService<Video> {

    @Autowired
    private VideoRepository repositorio;

    @Autowired
    private InscricaoRepository inscricaoRepository;

    @Autowired
    private VisualizacaoRepository visualizacaoRepository;

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

    public List<Video> getVideosByUser(Long id) {
        return repository.findAllByUsuarioId(id);
    }

    public List<Video> getVideosBySearch(String search) {
        return repositorio.findAllByTituloContainingIgnoreCase(search);
    }

    @Override
    public List<Video> findAll(){
        List<Video> videos = repositorio.findAll();
        for (Video video : videos) {
            video.setVisualizacoes(visualizacaoRepository.countVisualizacaoByVideoIdVideo(video.getIdVideo()));
        }
        return videos;
    }

    @Override
    public Video getById(Long id){
        Video video = repositorio.findById(id).orElse(null);
        if(video == null){
            return null;
        } else {
            video.setVisualizacoes(visualizacaoRepository.countVisualizacaoByVideoIdVideo(video.getIdVideo()));
            video.setInscricoes(inscricaoRepository.countInscricaoByUsuarioId(video.getUsuario().getId()));
            return video;
        }


    }
}
