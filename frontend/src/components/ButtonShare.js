import React, { useState } from 'react';
import {BsWhatsapp, BsClipboard2Check, BsShareFill} from "react-icons/bs";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toastSucesso, toastErro} from "../utils/Toaster";

function VideoShareButton() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShareClick = () => setShow(true);

  const shareViaWhatsApp = () => {
    const videoLink = window.location.href;
    const whatsappLink = `https://web.whatsapp.com/send?text=${encodeURIComponent(videoLink)}`;
    window.open(whatsappLink, '_blank');
  };

  const copyToClipboard = () => {
    const videoLink = window.location.href;

    // Verifique se o navegador suporta a API clipboard
    if (navigator.clipboard) {
      navigator.clipboard.writeText(videoLink)
        .then(() => {
            toastSucesso('Link copiado para a área de transferência!', 1000);
            setShow(false)
        })
        .catch(error => {
            toastErro(`Erro ao copiar para a área de transferência: ${error}`, 1000);
        });
    } else {
      toastErro('Seu navegador não suporta a funcionalidade de cópia para a área de transferência.', 1000);
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
