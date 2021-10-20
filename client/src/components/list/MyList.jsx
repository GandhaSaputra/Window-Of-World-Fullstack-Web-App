import React, {useEffect, useState, useContext} from 'react';

import { Container, Row, Col,} from 'react-bootstrap';

import bookData from '../../data/myDataBook';

import MyBookList from '../book-list/MyBookList';
import { API } from '../../config/api/api';

// import { API } from '../../config/api/api'
import { UserContext } from '../../config/UserContext/UserContext';

export default function MyList() {

  const [userBookLists, setUserBookLists] = useState([]);

  const getUserBookLists = async () => {
    try {
        const response = await API.get('/get-user-book-list');
        setUserBookLists(response.data.data.userBookLists);
    } catch (error) {
        console.log(error)
    }
  };

  useEffect(() => {
    getUserBookLists();
  }, []);

  return (
    <Container className="my-5">
      <Row>
        {userBookLists.map((data, index) => (
          <Col md={3} key={index}>
            <MyBookList data={data} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}