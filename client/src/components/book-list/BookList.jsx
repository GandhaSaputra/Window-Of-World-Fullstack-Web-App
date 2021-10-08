import React, { useContext, useState } from 'react';
import { Card } from 'react-bootstrap';

import {Link, Redirect} from 'react-router-dom'
import { UserContext } from '../../config/UserContext/UserContext';
import ModalSubsDanger from '../modal/ModalSubsDanger';

export default function BookList({ data, index }) {

  const [showModalSubsDanger, setShow] = useState(false);
  const handleCloseModalSubsDanger = () => setShow(false);
  const handleShowModalSubsDanger = () => setShow(true);

  const [state] = useContext(UserContext)
  // console.log(state.user.transaction.userStatus);
  const statusSubs = state.user.transaction.userStatus;
  // console.log(data);

  return (
    <>
      <Card className="card-book mb-3">
        {statusSubs === 'Active' ? <Link to={`/detail-book/${data.id}`}>
          <Card.Img variant="top" src={data.bookFile}/></Link> : <Card.Img variant="top" src={data.bookFile} onClick={handleShowModalSubsDanger} style={{cursor: "pointer"}}/>
        }
        <Card.Body>
          <Card.Title className="book-title">{data.title}</Card.Title>
          <Card.Text className="book-penulis">{data.author}</Card.Text>
        </Card.Body>
      </Card>

      <ModalSubsDanger show={showModalSubsDanger} onHide={handleCloseModalSubsDanger}/>
    </>
  );
}