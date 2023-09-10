package com.example.tadstubeapi.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.example.tadstubeapi.usuario.Usuario;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Value("${spotted.security.token.secret}")
    private String secret;

    public String gerarToken(Usuario usuario) {
        try {
            var algoritmo = Algorithm.HMAC256(secret);
            return JWT.create()
                    .withIssuer("API spotted")
                    .withSubject(usuario.getLogin())
                    .withExpiresAt(dataExpiracao())
                    .sign(algoritmo);
        } catch (JWTCreationException exception){
            // throw new RuntimeException("erro ao gerar token jwt", exception);
            System.out.println("erro ao gerar token jwt");
            return null;
        }
    }

    public String getSubject(String token) {
        try {
         var algoritmo = Algorithm.HMAC256(secret);
            return JWT.require(algoritmo)
                    .withIssuer("API spotted").build()
                    .verify(token)
                    .getSubject();
        } catch (Exception exception) {
            //throw new RuntimeException("erro ao obter subject do token jwt", exception);
            System.out.println("erro ao obter subject do token jwt");
            return null;

        }

    }

    private Instant dataExpiracao() {
        return LocalDateTime.now().plusDays(4).toInstant(ZoneOffset.of("-03:00"));
    }

}
