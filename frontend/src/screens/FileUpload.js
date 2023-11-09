import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import videoStore from "../store/VideoStore";
import {observer} from "mobx-react";
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const FileUpload = observer(() => {
    const navigate = useNavigate();

    const handleFileVideo = (e) => {
        videoStore.setFile(e.target.files[0]);
    };

    const handleFileThumbnail = (e) => {
        if (e.target.files[0]) {
            videoStore.setThumbnail(e.target.files[0]);
        }

    }

    const handleUpload = async () => {
        await videoStore.handleUpload(navigate);
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
                        {videoStore.loading ? (
                            <Button variant="primary" disabled>Enviando...</Button>
                        ) : (
                            <Button variant="primary" onClick={handleUpload}>Enviar</Button>
                        )}

            {videoStore.uploadProgress > 0 && <p>Enviando arquivos: {videoStore.uploadProgress}%</p>}

                    </>
                    )}

            </Card.Body>
            <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            theme="dark"
            
        
        />
        </Card>
    );
});

export default FileUpload;
