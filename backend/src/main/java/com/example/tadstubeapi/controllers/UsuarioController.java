package com.example.tadstubeapi.controllers;

import com.example.tadstubeapi.usuario.Usuario;
import com.example.tadstubeapi.usuario.UsuarioService;
import jakarta.validation.Valid;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {


    @Autowired
    private UsuarioService service;

    @PostMapping
    public void insert(@RequestBody @Valid Usuario usuario){
        service.save(usuario);
    }

//    @PostMapping("/matricula")
//    public String insertMatricula(@RequestParam("file") MultipartFile file){
//        try {
//            PDDocument document = PDDocument.load(file.getInputStream());
//            PDFTextStripper textStripper = new PDFTextStripper();
//            String text = textStripper.getText(document);
//            document.close();
//            String regex = "sob o número\\s*(\\d+)";
//
//            Pattern pattern = Pattern.compile(regex);
//            Matcher matcher = pattern.matcher(text);
//            System.out.println(text);
//
//            if (matcher.find()) {
//                String matricula = matcher.group(1);
//                System.out.println("Número: " + matricula);
//                Usuario usuario = service.findByMatricula(matricula);
//                if(usuario != null){
//                    return "Usuário já cadastrado";
//                }else{
//                    return "Matrícula válida/"+matricula;
//                }
//            } else {
//                System.out.println("Número não encontrado.");
//                return "Matrícula inválida, informe o comprovante de matrícula.";
//            }
//
//        } catch (IOException e) {
//            e.printStackTrace();
//            return "Por favor, selecione um arquivo válido.";
//        }
//    }

    @GetMapping("/login/{login}")
    public String login(@PathVariable String login){
        Usuario usuarioBanco = service.findByLogin(login);
        if(usuarioBanco != null){
            return "Login já existente";
        }else{
            return "Login válido";
        }
    }

    @GetMapping("/{id}")
    public Usuario findById(@PathVariable Long id){
        return service.getById(id);
    }



}
