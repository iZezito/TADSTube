import React, { useEffect, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';
import { BsPersonCircle } from 'react-icons/bs';

const VideoPlayer = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        const filename = 'Alugamos_um_CARRO_de_TR_S_RODAS___.mp4'; // Substitua pelo nome do vídeo que você deseja reproduzir

        fetch(`http://localhost:8080/stream/${filename}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.blob();
            })
            .then(videoBlob => {
                const videoUrl = URL.createObjectURL(videoBlob);
                videoRef.current.src = videoUrl;
            })
            .catch(error => {
                console.error('Error fetching video:', error);
            });
    }, []);

    return (
        <>
        <Container className={'overflow-auto'}>
            <Row xs={1} md={3} className="g-3">
            {Array.from({ length: 9 }).map((_, idx) => (
                <Col key={idx}>
                    <Card bg='dark' style={{color: 'white'}}>
                        <img src={'https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg'} alt={'thumbnail'}/>
                        <Card.Body>
                        <div class="row">
                            <div class="col-auto">
                                <Card.Title><BsPersonCircle style={{width: 35, height: 35}}/></Card.Title>
                            </div>
                            <div class="col">
                                <Card.Title>Comer muito? ou comer pouco?</Card.Title>
                                <Card.Text>
                                    Canal X
                                    <Card.Text>
                                    119 mil visualizações há 2 dias
                                    </Card.Text>
                                </Card.Text>
                            </div>
                        </div>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
            </Row>
        </Container>
        </>
    );
};

export default VideoPlayer;







// import React, { useRef, useEffect, useState } from 'react';
//
// function VideoPlayer() {
//     const videoRef = useRef(null);
//     const [currentPosition, setCurrentPosition] = useState(0);
//
//     useEffect(() => {
//         const video = videoRef.current;
//
//         const handleTimeUpdate = () => {
//             if (video.currentTime >= video.duration - 10) { // Buscar próxima parte quando estiver a 10 segundos do fim
//                 const headers = new Headers();
//                 headers.append('Range', `bytes=${currentPosition}-`);
//
//                 fetch('http://10.77.115.210:8080/stream/Alugamos_um_CARRO_de_TR_S_RODAS___.mp4', { headers })
//                     .then((response) => response.blob())
//                     .then((blob) => {
//                         video.src = URL.createObjectURL(blob);
//                         setCurrentPosition(currentPosition + blob.size);
//                     })
//                     .catch((error) => {
//                         console.error('Erro ao reproduzir o vídeo:', error);
//                     });
//             }
//         };
//
//         video.addEventListener('timeupdate', handleTimeUpdate);
//
//         return () => {
//             video.removeEventListener('timeupdate', handleTimeUpdate);
//         };
//     }, [currentPosition]);
//
//     useEffect(() => {
//         const headers = new Headers();
//         headers.append('Range', `bytes=${currentPosition}-`);
//
//         fetch('http://10.77.115.210:8080/stream/Alugamos_um_CARRO_de_TR_S_RODAS___.mp4', { headers })
//             .then((response) => response.blob())
//             .then((blob) => {
//                 videoRef.current.src = URL.createObjectURL(blob);
//                 setCurrentPosition(currentPosition + blob.size);
//             })
//             .catch((error) => {
//                 console.error('Erro ao reproduzir o vídeo:', error);
//             });
//     }, []);
//
//     return (
//         <div>
//             <h2>Player de Vídeo</h2>
//             <video ref={videoRef} controls={true} width="640" height="360" autoPlay={true} />
//         </div>
//     );
// }
//
// export default VideoPlayer;
