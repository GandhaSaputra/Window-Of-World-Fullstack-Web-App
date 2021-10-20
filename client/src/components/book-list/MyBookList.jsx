import React, {useContext, useState} from 'react';
import { Card } from 'react-bootstrap';
import { UserContext } from '../../config/UserContext/UserContext';

import ModalSubsDanger from '../modal/ModalSubsDanger';

import { Link } from 'react-router-dom';

export default function MyBookList({ data }) {

  const [showModalSubsDanger, setShow] = useState(false);
  const handleCloseModalSubsDanger = () => setShow(false);
  const handleShowModalSubsDanger = () => setShow(true);

  const [state] = useContext(UserContext)

  const statusSubs = state.user.transaction.userStatus;

  return (
    <>
      <Card className="card-book mb-3">
        {statusSubs === 'Active' ? <Link to={`/detail-book/${data.idBook}`}><Card.Img variant="top" src={data.books.bookCover}/></Link> :<Card.Img variant="top" src={data.books.bookCover} onClick={handleShowModalSubsDanger} style={{cursor: "pointer"}}/>}
        <Card.Body>
          <Card.Title className="book-title">{data.books.title}</Card.Title>
          <Card.Text className="book-penulis">{data.books.author}</Card.Text>
        </Card.Body>
      </Card>

      <ModalSubsDanger show={showModalSubsDanger} onHide={handleCloseModalSubsDanger}/>
    </>
  );
}