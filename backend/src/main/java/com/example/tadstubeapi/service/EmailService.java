package com.example.tadstubeapi.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);

        javaMailSender.send(message);
    }

    public void sendEmailWithInlineImage(String to, String subject, String htmlBody, String imagePath) {
        MimeMessage message = javaMailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(to);
            helper.setSubject(subject);

            // Processar o corpo HTML, incluindo a imagem
            String processedHtmlBody = htmlBody.replace("{image_cid}", "cid:image");

            helper.setText(processedHtmlBody, true);

            // Anexar a imagem como recurso embutido
            Path path = Paths.get(imagePath);
            byte[] imageBytes = Files.readAllBytes(path);
            ByteArrayResource imageResource = new ByteArrayResource(imageBytes);
            helper.addInline("image", imageResource, "image/png");

            javaMailSender.send(message);
        } catch (MessagingException | IOException e) {
            e.printStackTrace(); // Tratar exceções apropriadamente na sua aplicação
        }
    }
}