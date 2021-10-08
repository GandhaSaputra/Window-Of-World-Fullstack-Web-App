import React, { useEffect, useState } from 'react';

import { Container, Row, Col,} from 'react-bootstrap';

// import bookData from '../../data/dataBookHome';

import BookList from '../book-list/BookList';

import { API } from '../../config/api/api'

export default function List() {

  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    try {
      const response = await API.get('/books');
      setBooks(response.data.data.books)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getBooks();
  }, [])

  return (
    <Container className="my-5">
      <Row>
        {books.map((data, index) => (
          <Col md={3} key={index}>
            <BookList data={data} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}