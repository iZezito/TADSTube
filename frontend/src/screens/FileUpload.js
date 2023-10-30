//import React, { useRef, useState } from 'react';
//import axios from "axios";

// function VideoPlayer() {
//   const videoRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//
//   const handlePlay = async () => {
//     setIsPlaying(true);
//
//       axios.get('http://10.77.115.210:8080/stream/Alugamos_um_CARRO_de_TR_S_RODAS___.mp4', {
//           responseType: 'blob',  // Define o tipo de resposta como blob
//       })
//           .then(response => {
//               const videoUrl = URL.createObjectURL(response.data);
//               videoRef.current.src = videoUrl;
//               videoRef.current.play();
//           })
//           .catch(error => {
//               console.error('Erro ao reproduzir o vídeo:', error);
//           });
//
//     // try {
//     //   const response = await fetch('http://localhost:8080/stream/SnapInsta.io-PACOTE CHAMPIONS 2023 💢 _ VALE A PENA OU NÃO.mp4');
//     //   if (!response.ok) {
//     //     throw new Error('Falha ao obter o vídeo.');
//     //   }
//     //
//     //   const blob = await response.blob();
//     //   const videoUrl = URL.createObjectURL(blob);
//     //   videoRef.current.src = videoUrl;
//     //   videoRef.current.play();
//     // } catch (error) {
//     //   console.error('Erro ao reproduzir o vídeo:', error);
//     // }
//   };
//
//   return (
//       <div>
//         <h2>Player de Vídeo</h2>
//         <video ref={videoRef} controls={true} width="640" height="360" />
//         <button onClick={handlePlay} disabled={isPlaying}>
//           Reproduzir Vídeo
//         </button>
//       </div>
//   );
// }
//
// export default VideoPlayer;



//
import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import videoStore from "../store/VideoStore";
import {observer} from "mobx-react";
import { ToastContainer, toast } from 'react-toastify';

const FileUpload = observer(() => {

    const handleFileVideo = (e) => {
        videoStore.setFile(e.target.files[0]);
    };

    const handleFileThumbnail = (e) => {
        if (e.target.files[0]) {
            videoStore.setThumbnail(e.target.files[0]);
        }

    }

    return (
        <Card className="text-light bg-dark" style={{width: 500, marginLeft: 'auto', marginRight: 'auto', marginTop: 200}}>
            <Card.Header style={{marginLeft: 'auto', marginRight: 'auto'}}>Enviar vídeo</Card.Header>
            <Card.Body>
                {videoStore?.editing ? (
                    <>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Título</Form.Label>
                            <Form.Control value={videoStore.videoEdit.titulo} onChange={(e) => videoStore.setTituloEdit(e.target.value)} as="textarea" rows={1} />
                        </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control value={videoStore.videoEdit.descricao} onChange={(e) => videoStore.setDescricaoEdit(e.target.value)} as="textarea" rows={3} />
                    </Form.Group>


                    <Button variant="primary" onClick={videoStore.handleEdit}>Editar</Button>
                    </>
                ) : (
                    <>
                    <Form.Group  onChange={handleFileVideo} controlId="formFile" className="mb-3 bg-dark" style={{width: 465}}>
                <Form.Label>Vídeo</Form.Label>
                <Form.Control type="file" />
            </Form.Group>
            <Form.Group  onChange={handleFileThumbnail} controlId="formFile" className="mb-3 bg-dark" style={{width: 465}}>
                <Form.Label>Thumbnail</Form.Label>
                <Form.Control type="file" />
            </Form.Group>
            {videoStore.thumbURL && (
                <>
                    <Form.Label>Prévia</Form.Label>
                    <img className={'img-thumbnail'} src={videoStore.thumbURL} alt={'thumbnail'} />
                </>
            )}
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Título</Form.Label>
                <Form.Control value={videoStore.videoData.titulo} onChange={(e) => videoStore.setTitulo(e.target.value)} as="textarea" rows={1} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Descrição</Form.Label>
                <Form.Control value={videoStore.videoData.descricao} onChange={(e) => videoStore.setDescricao(e.target.value)} as="textarea" rows={3} />
            </Form.Group>

            <Button variant="primary" onClick={videoStore.handleUpload}>Enviar</Button>
            {videoStore.uploadProgress > 0 && <p>Progresso: {videoStore.uploadProgress}%</p>}

                    </>
                    )}

            </Card.Body>
            <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            
        
        />
        </Card>
    );
});

export default FileUpload;
