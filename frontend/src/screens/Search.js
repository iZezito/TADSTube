import React, {useEffect} from "react";
import {observer} from "mobx-react";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import store from "../store/VideoStore";
import {urlBase} from "../utils/URLBase";
import {Link} from "react-router-dom";

const Search = observer(() => {

    useEffect(() => {
    }, []);


    return (
        <Container >
            {store?.videosSearch.length === 0 ? (
                <h1 className='text-light text-center'>
                    Nenhum vídeo encontrado!
                </h1>
            ) : (
                <>
            {store?.videosSearch.map((video) => (
                <Link to={`/view/${video?.idVideo}`} className='text-decoration-none'>
                <Card bg='dark' style={{color: 'white'}}>
                    <Card.Body>
                        <div class="row">
                            <div class="col-4"><img src={`${urlBase}/resources/image/${video?.thumbnail}`} style={{maxWidth:400, maxHeight:150}} alt={'thumbnail'}/></div>
                            <div class="col-8">
                                <Card.Title>{video?.titulo}</Card.Title>
                                { /* card.text onde é um small text */}
                                <Card.Text className={'small'}>{video?.usuario?.login}</Card.Text>
                                <Card.Text>
                                    2,3 mil visualizações
                                </Card.Text>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
                </Link>
            ))

            }
                </>
                )}

        </Container>
    )
})

export default Search;