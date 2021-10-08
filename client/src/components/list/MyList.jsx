import React from 'react';

import { Container, Row, Col,} from 'react-bootstrap';

import bookData from '../../data/myDataBook';

import MyBookList from '../book-list/MyBookList';

export default function MyList() {
  return (
    <Container className="my-5">
      <Row>
        {bookData.map((data, index) => (
          <Col md={3} key={index}>
            <MyBookList data={data} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}