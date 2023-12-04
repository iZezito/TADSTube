package com.example.tadstubeapi.service;

import com.example.tadstubeapi.generics.GenericService;
import com.example.tadstubeapi.model.Inscricao;
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

    @Autowired
    private EmailService emailService;

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

    public void sendEmails(List<Inscricao> inscricoes, Video video) {
        for (var inscrito : inscricoes) {
            System.out.println("Enviando email para " + inscrito.getInscrito().getLogin() + "..." + "Email: " + inscrito.getInscrito().getEmail());
            System.out.println("Id do vídeo: " + video.getIdVideo());
            String email = inscrito.getInscrito().getEmail();
            String titulo = "Novo vídeo no canal " + inscrito.getUsuario().getLogin();
            String path = "thumbnail-dir/" + video.getThumbnail();
            String videoUrl = "http://localhost:3000/view/" + video.getIdVideo(); // Substitua com a URL real do seu vídeo

            // Corpo do e-mail com link para o vídeo e algumas classes do Bootstrap
            String mensagem = "<html><head><link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css\"></head>"+
                    "<div class=\"container\">" +
                    "    <a href=\"" + videoUrl + "\">" +
                    "        <div class=\"card bg-dark text-white\">" +
                    "            <img src='cid:image' alt=\"thumbnail\" class=\"card-img-top\" style=\"max-width: 480px; max-height: 360px;\"/>" +
                    "            <div class=\"card-body\">" +
                    "                <div class=\"row\">" +
                    "                    <div class=\"col-auto\">" +
                    "                        <h5 class=\"card-title\"><!-- Ícone de pessoa --></h5>" +
                    "                    </div>" +
                    "                    <div class=\"col\">" +
                    "                        <h5 class=\"card-title\">" + "Título: " + video.getTitulo() + "</h5>" +
                    "                        <p class=\"card-text\">" + "Canal: " + inscrito.getUsuario().getLogin() + "</p>" +
                    "                    </div>" +
                    "                </div>" +
                    "            </div>" +
                    "        </div>" +
                    "    </a>" +
                    "</div>"+
                    "<html>";

            emailService.sendEmailWithInlineImage(email, titulo, mensagem, path);
        }
    }
}
