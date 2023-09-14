import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { BsPlayBtnFill, BsSearch, BsHouseDoor, BsCollectionPlay, BsBoxArrowInRight } from 'react-icons/bs';
import './App.css'; 

function Menu() {
  return (
    <>
      {[false].map((expand) => (
          <>
        <Navbar key={expand} expand={expand} className="bg-dark mb-2 nav-grid"  bg="dark" data-bs-theme="dark">
          <Container fluid>
            <Navbar.Brand href="#" style={{color: 'white'}}><BsPlayBtnFill style={{width: 30, height: 30, color: 'red'}}/> TADStube</Navbar.Brand>
            <Form className="d-none d-md-block d-lg-block mx-auto text-center min-width-form" id={`offcanvasNavbar-expand-${expand}`}>
              <div className="d-flex" style={{}}>
                <Form.Control
                  type="search"
                  placeholder="Pesquisar"
                  className="me-2 flex-grow-1"
                  aria-label="Search"
                />
                <Button variant="outline-secondary"><BsSearch /></Button>
              </div>
            </Form>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} className={'toggle'} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton className='bg-dark text-light'>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} >
                  <BsPlayBtnFill style={{width: 30, height: 30, color: 'red'}}/> TADStube
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className='bg-dark text-light'>
                <Form className="d-block d-md-none d-lg-none mt-3" id={`offcanvasNavbar-expand-${expand}`}>
                  <div className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Pesquisar"
                        className="me-1 flex-grow-1"
                        aria-label="Search"
                    />
                    <Button variant="outline-secondary"><BsSearch /></Button>
                  </div>
                </Form>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/"><BsHouseDoor style={{width: 20, height: 20}}/> Início</Nav.Link>
                  <Nav.Link href="#action2"><BsCollectionPlay style={{width: 20, height: 20}}/> Inscrições</Nav.Link>
                  <Nav.Link href="/cadastrar"><BsBoxArrowInRight style={{width: 20, height: 20}}/> Sair</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
          </>
      ))}
    </>
  );
}

export default Menu;
