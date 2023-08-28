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

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://10.77.115.210:8080/upload', formData, {
        headers: {
          // Adicione quaisquer cabeçalhos necessários aqui
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        },
      });

      if (response.status === 200) {
        console.log('Arquivo enviado com sucesso.');
      } else {
        console.error('Erro ao enviar o arquivo.');
      }
    } catch (error) {
      console.error('Erro durante o upload:', error);
    }
  };

  return (
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Enviar</button>
        {uploadProgress > 0 && <p>Progresso: {uploadProgress}%</p>}
      </div>
  );
}

export default FileUpload;
