import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, } from 'react-bootstrap';
import MyBookList from '../book-list/MyBookList';
import { API } from '../../config/api/api';
import AddBooks from '../../assets/icon/undraw_save_to_bookmarks_re_8ajf.svg'

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
        {userBookLists.length > 0 ? (
          userBookLists.map((data, index) => (
            <Col md={3} key={index}>
              <MyBookList data={data} />
            </Col>
          ))
        ) : (
          <div style={{ width: "auto", height: "auto", marginLeft: "auto", marginRight: "auto" }} className="container-image-add-some-books">
            <img src={AddBooks} alt="Add Book" style={{ width: "400px", height: "auto", marginLeft: "auto", marginRight: "auto" }} className="icon-add-some-book" />
            <div className="middle-image">
              <div className="text-image-add-some-books">Add Some Books !</div>
            </div>
          </div>
        )}

      </Row>
      <div style={{ height: "100px" }}>

      </div>
    </Container>
  );
}