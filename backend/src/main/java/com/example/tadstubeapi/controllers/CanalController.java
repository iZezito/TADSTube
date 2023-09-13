package com.example.tadstubeapi.controllers;

import com.example.tadstubeapi.generics.GenericRestController;
import com.example.tadstubeapi.model.Canal;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/canais")
public class CanalController extends GenericRestController<Canal> {

}
