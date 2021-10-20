import React, {useEffect, useState} from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import NavbarAdmin from '../../components/NavbarAdmin/NavbarAdmin';
import { API } from '../../config/api/api';


const ListBookAdmin = () => {

    const [books, setBooks] = useState([]);

    const getBooks = async () => {
        try {
        const response = await API.get('/books');
        setBooks(response.data.data.books)
        } catch (error) {
        console.log(error)
        }
    };

    const handleDelete = async (id) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            await API.delete(`/book/${id}`, config);
            getBooks();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getBooks();
    }, [])

    return (
        <div>
            <NavbarAdmin/>
            <Container className="my-5">
                <Row>
                    {books.map((data, index) => (
                    <Col md={2} key={index}>
                        <Card className="card-book mb-3">
                            <Card.Img variant="top" src={data.bookCover}/>
                            {/* <Card.Body>
                                <Card.Title className="book-title">{data.title}</Card.Title>
                                <Card.Text className="book-penulis">{data.author}</Card.Text>
                            </Card.Body> */}
                            <div className="btn-group-book-admin">
                                <button className="btn-edit-book">Edit</button>
                                <button className="btn-delete-book" onClick={() => handleDelete(data?.id)}>Delete</button>
                            </div>
                        </Card>
                    </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}

export default ListBookAdmin
