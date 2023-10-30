import React, { useEffect, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';
import { BsPersonCircle } from 'react-icons/bs';
import Painel from '../components/painelcanal';
import VideoCard from '../components/VideoCard';
import store from '../store/VideoStore';
import { observer } from 'mobx-react';

const VideoPlayer = observer(() => {
    const videoRef = useRef(null);

    useEffect(  () => {
        store.getVideos();
        // const filename = 'Alugamos_um_CARRO_de_TR_S_RODAS___.mp4'; // Substitua pelo nome do vídeo que você deseja reproduzir

        // fetch(`http://localhost:8080/stream/${filename}`)
        //     .then(response => {
        //         if (!response.ok) {
        //             throw new Error('Network response was not ok');
        //         }
        //         return response.blob();
        //     })
        //     .then(videoBlob => {
        //         const videoUrl = URL.createObjectURL(videoBlob);
        //         videoRef.current.src = videoUrl;
        //     })
        //     .catch(error => {
        //         console.error('Error fetching video:', error);
        //     });
    }, []);

    return (
        <>
        <Container className={'overflow-auto mt-5'}>

            {store.videos.length === 0 ? (
                <h1 className='text-light'>
                    Ainda não há vídeos cadastrados!
                </h1>
            ) : (
                <>
                <Row xs={1} md={3} className="g-3">
                {store.videos.map((item) => (
                    <VideoCard key={item.id} {...item} />
                ))}
                </Row>
                </>
            )}
        </Container>
        </>
    );
});

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
