import React, { useState } from 'react';
import {BsWhatsapp, BsClipboard2Check, BsShareFill} from "react-icons/bs";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function VideoShareButton() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShareClick = () => setShow(true);

  const shareViaWhatsApp = () => {
    const videoLink = window.location.href;
    const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(videoLink)}`;
    window.open(whatsappLink, '_blank');
  };

  const copyToClipboard = () => {
    const videoLink = window.location.href;

    // Verifique se o navegador suporta a API clipboard
    if (navigator.clipboard) {
      navigator.clipboard.writeText(videoLink)
        .then(() => {
          alert('Link copiado para a área de transferência');
        })
        .catch(error => {
          console.error('Erro ao copiar para a área de transferência:', error);
        });
    } else {
      alert('Seu navegador não suporta a funcionalidade de cópia para a área de transferência.');
    }
  };

  return (
    <>
      <Button style={{ borderRadius: 100 }} variant="outline-light" onClick={handleShareClick}>
        <BsShareFill /> Compartilhar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Compartilhar em:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Button style={{ borderRadius: 100 }} className='m-2 btn-success' onClick={shareViaWhatsApp}><BsWhatsapp/></Button>
            <Button style={{ borderRadius: 100 }} onClick={copyToClipboard}><BsClipboard2Check/></Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default VideoShareButton;
